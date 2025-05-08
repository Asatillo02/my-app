import { useEffect, useState, useRef } from 'react';

export default function useGlobalLogic() {
  const [cart, setCart] = useState(() => parseInt(localStorage.getItem('cartCount')) || 0);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef([]);

  // 🖼 Show specific image in the slideshow
  const showImage = (index) => {
    const images = slideRef.current;
    if (!images.length || index < 0 || index >= images.length) return;
    images.forEach((img, i) => (img.style.display = i === index ? 'block' : 'none'));
  };

  // ⏭ Navigate slideshow
  const move = (direction) => {
    const images = slideRef.current;
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setCurrentIndex(newIndex);
    showImage(newIndex);
  };

  // ➕ Add item to cart
  const addToCart = (item) => {
    if (!item || !item.name || !item.price || !item.image) return;

    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    let updatedItems;

    if (existingItem) {
      updatedItems = cartItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedItems = [...cartItems, { ...item, quantity: 1 }];
    }

    setCartItems(updatedItems);
    setCart(prev => prev + 1);
    showAddedToCartMessage();
  };

  const showAddedToCartMessage = () => {
    const msg = document.createElement('div');
    msg.textContent = 'Added to Cart';
    msg.className = 'added-to-cart-message';
    document.body.appendChild(msg);
    setTimeout(() => document.body.removeChild(msg), 2000);
  };

  const clearCart = () => {
    setCart(0);
    setCartItems([]);
  };

  const updateCartCount = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCart(count);
  };  

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(item => item.quantity > 0); // Remove the item if quantity hits 0
      updateCartCount(updatedItems); 
      return updatedItems;
    });
  };
  
  
  
   

  useEffect(() => {
    localStorage.setItem('cartCount', cart);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cart, cartItems]);

  useEffect(() => {
    const slideImgs = document.querySelectorAll('.slide img');
    if (slideImgs.length) {
      slideRef.current = [...slideImgs];
      showImage(currentIndex);
    }
  }, );

  return {
    move,
    cart,
    cartItems,
    addToCart,
    clearCart,
    removeFromCart,
    currentIndex,
  };
}
