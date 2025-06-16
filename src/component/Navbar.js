import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarLocksense() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <img
            src="/img/logo.png"
            alt="SecureSense Logo"
            className="logo-img"
          />
          <span className="brand-name">SecureSense</span>
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Beranda
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            Tentang
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Kontak
          </Link>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
          <div className={`bar ${isOpen ? "change" : ""}`}></div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(90deg, #1cb5e0 0%, rgb(57, 75, 230) 100%);
          color: white;
          font-family: "Segoe UI", sans-serif;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .logo-img {
          height: 48px;
          width: 48px;
          border-radius: 50%;
          background: white;
          padding: 5px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-links {
          display: flex;
          gap: 1.2rem;
        }

        .nav-links a {
          text-decoration: none;
          color: white;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 25px;
          transition: background 0.3s ease;
        }

        .nav-links a:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .bar {
          width: 24px;
          height: 3px;
          background: white;
          border-radius: 2px;
          transition: 0.4s;
        }

        .bar.change:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        .bar.change:nth-child(2) {
          opacity: 0;
        }

        .bar.change:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 100%; /* muncul di bawah navbar */
            right: 0;
            background: #000851;
            flex-direction: column;
            padding: 1.5rem;
            width: 200px;
            transform: translateY(100%); /* geser turun (bawah) */
            transition: transform 0.3s ease-in-out;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            border-radius: 0 0 16px 16px;
            visibility: hidden;
            pointer-events: none;
          }

          .nav-links.open {
            transform: translateY(0); /* geser ke posisi normal */
            visibility: visible;
            pointer-events: auto;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
