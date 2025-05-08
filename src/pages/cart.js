import React, { useEffect, useState } from 'react';
import useGlobalLogic from './GlobalLogic';

function Cart() {
  const { cart, cartItems, clearCart, removeFromCart } = useGlobalLogic(); 
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    const normalizedCart = cartItems.map(item => ({
      ...item,
      price: Number(item.price),
    }));

    const subtotal = normalizedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = +(subtotal * 0.08875).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);
    setTotals({ subtotal, tax, total });
  }, [cartItems]);

  return (
    <div>
      <header>
        <div className="logo">
          <img src="/images/burger.png" height="100" alt="Restaurant Logo" />
        </div>
        <div className="hamburger">&#9776;</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <div className="cart">
            <a href="/cart">
              <img src="/images/shopping_cart.png" alt="cart" />
            </a>
            <span className="cart-value">{cart}</span>
          </div>
        </nav>
      </header>

      <div className="cart-body">
        <h1>Your Shopping Cart</h1>
        <table id="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4">Your cart is empty.</td> {/* Adjusted colspan */}
              </tr>
            ) : (
              cartItems.map((item, idx) => (
                <tr key={idx}>
                  <td><img src={item.image} alt={item.name} height="50" /></td>
                  <td>{item.name}</td>
                  <td>${Number(item.price).toFixed(2)}</td>
                  <td>{item.quantity}
                      <br />
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="cart-total">
        <button type="button" className="clear-cart" onClick={clearCart}>
          Empty Cart
        </button>

        <div className="subtotal">
          <h4>Subtotal: ${totals.subtotal.toFixed(2)}</h4>
        </div>

        <div className="tax">
          <h4>Tax: ${totals.tax.toFixed(2)}</h4>
        </div>

        <div className="total">
          <h4>Total: ${totals.total.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}

export default Cart;
