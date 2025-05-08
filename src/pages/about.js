import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalLogic from './GlobalLogic'; 

function About() {
  const [menuActive, setMenuActive] = useState(false);
  const { cart } = useGlobalLogic(); 

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img
            src={`${process.env.PUBLIC_URL}/images/burger.png`}
            height="100"
            alt="Restaurant Logo"
          />
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
            <span className="cart-value">{cart}</span>
          </div>
        </nav>
      </header>

      <section className="about">
        <div className="about-content">
          <h1>About Us:</h1>
          <p>
            Skovorodka Restaurant was founded in 2002. Skovorodka is a lively Russian restaurant in Brighton Beach,
            renowned for its hearty and flavorful dishes. The menu boasts a variety of traditional favorites such as
            beef stroganoff, pelmeni, and herring under a fur coat, each prepared with care and attention to detail.
          </p>

          <h1>Our Mission:</h1>
          <p>
            Our goal is to offer a distinctive dining experience in a warm and inviting atmosphere. Guests are always
            greeted with genuine hospitality and invited to dine in authentic Russian and European dishes, expertly
            prepared to ensure an unforgettable dining experience.
          </p>

          <h1>Hours:</h1>
          <div className="hours">
            <p><strong>Mon-Sun: 11AM to 10PM</strong></p>
          </div>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/outside.jpg`}
          alt="exterior"
        />
      </section>
    </div>
  );
}

export default About;
