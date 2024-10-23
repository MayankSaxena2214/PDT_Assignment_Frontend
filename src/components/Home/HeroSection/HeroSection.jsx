import React from 'react';
import "./HeroSection.css";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-container">
        <div className="hero-content">
            <h1>Want to earn Money?</h1>
            <h2>Make your team now and win 1 Lakh+</h2>
            <p>You can participate for just ₹10</p>
            <Link to={"/matches"}><button className="btn">Get Started</button></Link>
        </div>
    </div>
  );
};

export default HeroSection;
