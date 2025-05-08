import React, { useState } from 'react';
import useGlobalLogic from './GlobalLogic';

function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { cart } = useGlobalLogic();

  const images = [
    `${process.env.PUBLIC_URL}/images/skovorodka-dining-room.jpg`,
    `${process.env.PUBLIC_URL}/images/entrance.jpg`,
    `${process.env.PUBLIC_URL}/images/caption.jpg`,
    `${process.env.PUBLIC_URL}/images/interior-of-restaurant.jpg`,
    `${process.env.PUBLIC_URL}/images/photo0jpg.jpg`
  ];

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const moveSlide = (direction) => {
    setCurrentIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
  };

  return (
    <div>
      <header className="header">
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
        <nav className={menuActive ? 'active' : ''}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <div className="cart">
            <a href="/cart">
              <img
                src={`${process.env.PUBLIC_URL}/images/shopping_cart.png`}
                alt="cart"
              />
            </a>
            <span className="cart-value">{cart}</span>
          </div>
        </nav>
      </header>

      <section className="title-section">
        <h1>Welcome to Skovorodka Restaurant!</h1>
      </section>

      {/* Hero Section with Dynamic Background */}
      <section
        className="hero"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/images/skovorodka_logo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '350px',
          width: '100%',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/skovorodka_logo.jpg`}
          alt="Restaurant Logo"
          style={{
            display: 'none',
          }}
        />
      </section>

      <section className="gallery">
        <div className="slider-container">
          <div className="slide">
            <h1>Explore Our Space</h1>
            <img src={images[currentIndex]} alt={`img${currentIndex + 1}`} />
            <button type="button" className="prev" onClick={() => moveSlide(-1)}>
              &#10094;
            </button>
            <button type="button" className="next" onClick={() => moveSlide(1)}>
              &#10095;
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="social-media">
            <h3>Follow Us:</h3>
            <ul>
              <li><a href="https://www.facebook.com/SkovorodkaNY" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/skovorodkacafe" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/cafe-skovorodka/about/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div className="hours">
            <h3>Hours:</h3>
            <p><b>Mon-Sun: 11AM to 10PM</b></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
