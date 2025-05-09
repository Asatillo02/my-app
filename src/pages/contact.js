import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalLogic from './GlobalLogic'; 

function Contact() {
  const [menuActive, setMenuActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { cart } = useGlobalLogic(); 

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the email body
    const subject = `Contact Request from ${formData.name}`;
    const body = `
      Name: ${formData.name}\n
      Email: ${formData.email}\n
      Message: ${formData.message}
    `;
    
    // Open the default email client with pre-filled values
    window.location.href = `mailto:alutful000@citymail.cuny.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
    alert(`Thanks, ${formData.name}! We will get back to you shortly.`);
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/images/burger.png`} height="100" alt="Restaurant Logo" />
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <nav className={menuActive ? 'open' : ''}>
          <ul>
            <li><Link to="/" onClick={() => setMenuActive(false)}>Home</Link></li>
            <li><Link to="/menu" onClick={() => setMenuActive(false)}>Menu</Link></li>
            <li><Link to="/about" onClick={() => setMenuActive(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuActive(false)}>Contact</Link></li>
          </ul>
          <div className="cart">
            <Link to="/cart">
              <img
                src={`${process.env.PUBLIC_URL}/images/shopping_cart.png`}
                alt="cart"
              />
            </Link>
            <span className="cart-value">{cart}</span> {}
          </div>
        </nav>
      </header>

      <section className="contact">
        <div className="contact-content">
          <h1>Contact Us</h1>

          <div className="Google-map">
            <h2>Store Location:</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1435.5190149121036!2d-73.96353392231005!3d40.57733765757111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24441932f9825%3A0xf1f35c8c5f3b7d0a!2sSkovorodka!5e0!3m2!1sen!2sus!4v1741572061072!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Skovorodka Location"
            ></iframe>
          </div>

          <div className="form">
            <h2>Leave a message:</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <br /><br />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
              />
              <br /><br />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="8"
                cols="40"
                placeholder="Leave a Review"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <br /><br />

              <div className="submit">
                <input type="submit" value="Send Request" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
