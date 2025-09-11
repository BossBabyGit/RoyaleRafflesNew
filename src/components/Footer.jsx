import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3 className="footer-title">Royal Raffles UK</h3>
          <p>UK's most trusted platform for luxury prize raffles.</p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Responsible Gaming</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Stay Connected</h4>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Royal Raffles UK. All rights reserved. Licensed &amp; Regulated | 18+ Only
      </div>
    </footer>
  );
}
