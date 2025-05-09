import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalLogic from './GlobalLogic';

function Menu() {
  const [menuActive, setMenuActive] = useState(false);
  const { addToCart, cart } = useGlobalLogic();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const items = [
    {
      category: 'MAIN COURSE',
      products: [
        {
          name: 'Smoked Semga',
          image: '/images/Semga.jpg',
          description: "Cold-smoked steelhead trout that's cured with salt.",
          price: 19.99, 
        },
        {
          name: 'Deluxe Charcuterie Platter',
          image: '/images/charcuterie Board.jpg',
          description:
            'Elegant set of dry-cured salami, assorted cheeses, Prosciutto, berries, grapes, crackers, nuts.',
          price: 33.99,
        },
        {
          name: 'Eggplant Caviar',
          image: '/images/eggplant caviar.jpg',
          description:
            'An eggplant-based spread, side, or dip. Made with roasted eggplant with a hint of garlic.',
          price: 14.99, 
        },
        {
          name: 'Basturma',
          image: '/images/Basturma.jpg',
          description: "A cured, air-dried beef that's seasoned with paprika.",
          price: 19.99,
        },
      ],
    },
    {
      category: 'APPETIZERS',
      products: [
        {
          name: 'Blintzes with Meat',
          image: '/images/blintzes.jpg',
          description:
            'Crispy pan-fried pocket-shaped pancakes filled with seasoned ground beef or chicken.',
          price: 13.99,
        },
        {
          name: 'Pan-Fried Potatoes w/ Mushrooms',
          image: '/images/pan fried potatoes.jpg',
          description:
            'Fried and sliced potatoes with mushrooms seasoned with salt, pepper, and spices.',
          price: 22.99, 
        },
        {
          name: 'Mushroom Julien w/ Baked Cheese',
          image: '/images/mushroom julien.jpg',
          description:
            'Sautéed mushrooms cooked in a creamy sauce, typically with onions and garlic, topped with melted cheese.',
          price: 16.50,
        },
      ],
    },
    {
      category: 'BEVERAGES',
      products: [
        {
          name: 'Soda',
          image: '/images/soda.jpg',
          description: 'All varieties of family or kid-sized soda.',
          price: 3.99,
        },
        {
          name: 'Coffee',
          image: '/images/coffee.jpg',
          description: 'Available: A cup of espresso, black, or regular coffee.',
          price: 3.49,
        },
        {
          name: 'Tea',
          image: '/images/Tea.jpg',
          description: 'Available: Green, raspberry, black.',
          price: 2.99,
        },
      ],
    },
  ];

  return (
    <div>
      <header>
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/images/burger.png`} height="100" alt="Restaurant Logo" />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <nav className={menuActive ? 'active' : ''}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div className="cart">
            <Link to="/cart">
              <img src={`${process.env.PUBLIC_URL}/images/shopping_cart.png`} alt="Cart" />
            </Link>
            <span className="cart-value">{cart}</span>
          </div>
        </nav>
      </header>

      <section className="menu">
        <h1>Menu</h1>
        <div className="menu-cards">
          {items.map((section) => (
            <div className="card" key={section.category}>
              <h2>{section.category}</h2>
              {section.products.map((item) => (
                <div key={item.name}>
                  <h3>{item.name}</h3>
                  <img
                    src={`${process.env.PUBLIC_URL}${item.image}`}
                    alt={item.name}
                    onClick={() => addToCart(item)}
                  />
                  <p>{item.description}</p>
                  <p className="price">${item.price.toFixed(2)}</p> {/* Format price */}
                  <div className="cart">
                    <button
                      type="button"
                      className="add-to-cart"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;
