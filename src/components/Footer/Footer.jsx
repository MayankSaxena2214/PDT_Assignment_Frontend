import React from 'react';
import "./Footer.css";
import { RiGithubFill, RiHeart2Fill, RiInstagramFill, RiTwitterFill, RiWhatsappFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>Made with <RiHeart2Fill style={{ color: 'red' }} /> by @mayanksaxena2214</p>
      </div>
      <div className="footer-links">
        <a href="https://www.instagram.com/mayanksaxena2214" target="_blank" rel="noopener noreferrer">
          <RiInstagramFill className='insta-icon' />
        </a>
        <a href="https://wa.me/9259525543" target="_blank" rel="noopener noreferrer">
          <RiWhatsappFill className='whatsapp-icon' />
        </a>
        <a href="https://github.com/MayankSaxena2214" target="_blank" rel="noopener noreferrer">
          <RiGithubFill className='github-icon' />
        </a>
        <a href="https://x.com/MayankSaxe59906" target="_blank" rel="noopener noreferrer">
          <RiTwitterFill className='twitter-icon' />
        </a>
      </div>
      <hr />
      <div className="footer-policy">
        <p>Terms and Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default Footer;
