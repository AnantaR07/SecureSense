import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaInstagram } from "react-icons/fa";

export default function FooterLocksense() {
  return (
    <>
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <img src="/img/logo.png" alt="Logo" className="logo-img-footer" />
            <p className="footer-desc">
              SecureSense adalah alat pemantauan suhu dan kelembaban yang
              dirancang khusus untuk memastikan kondisi lingkungan di dalam
              pabrik tetap stabil, aman, dan sesuai standar operasional.
            </p>
          </div>

          <div className="footer-col">
            <h3>Navigasi</h3>
            <ul>
              <li>
                <Link to="/">
                  <a>Beranda</a>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <a>Tentang</a>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <a>Kontak</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Kontak</h3>
            <p>
              <FaEnvelope style={{ marginRight: "8px" }} />
              Email: rafiantaresa23@gmail.com
            </p>
            <p>
              <FaInstagram style={{ marginRight: "8px" }} />
              Instagram: rfantrs_
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} LockSense. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(
            270deg,
            #1cb5e0 0%,
            rgb(57, 75, 230) 100%
          );
          color: white;
          padding: 2.5rem 1.5rem 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .footer-col h4 {
          font-size: 1rem;
          margin-bottom: 0.8rem;
          font-weight: 600;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
        }

        .footer-col ul li {
          margin-bottom: 0.5rem;
        }

        .footer-col ul li a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-col ul li a:hover {
          color: #ffdd57;
        }

        .footer-col p {
          margin: 0.4rem 0;
          font-size: 0.9rem;
        }

        .logo-img-footer {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          background-color: white;
          padding: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          object-fit: cover;
          margin-bottom: 0.8rem;
        }

        .footer-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 300px;
          margin: 0 auto;
          text-align: justify;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.75rem;
          color: #e0e0e0;
        }

        @media (max-width: 600px) {
          .footer-grid {
            text-align: center;
          }
          .footer-col {
            align-items: center;
          }
          .footer-desc {
            max-width: 100%;
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}
