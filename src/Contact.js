import React from "react";
import NavbarSecureSense from "./component/Navbar";
import FooterSecureSense from "./component/Footer";

export default function ContactSecureSense() {
  return (
    <div>
      <NavbarSecureSense />

      <section className="contact-section">
        <div className="contact-container">
          <h1 className="contact-title">Kontak Developer</h1>
          <div className="profile-card">
            <img
              src="/img/developer.jpeg"
              alt="Foto Developer"
              className="profile-img"
            />
            <h2 className="profile-name">RAFI ANTARESA</h2>
            <p className="profile-role">Frontend & IoT Developer</p>
            <p className="profile-email">rafiantaresa23@gmail.com</p>
          </div>
        </div>
      </section>

      <FooterSecureSense />

      <style jsx>{`
        .contact-section {
          background: rgb(255, 255, 255);
          padding: 80px 20px;
          text-align: center;
        }

        .contact-title {
          font-size: 2.5rem;
          margin-bottom: 2.5rem;
          font-weight: 800;
          background: linear-gradient(90deg, #1cb5e0, #3b4be6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .contact-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 2px solid #1cb5e0; /* warna biru tepi */
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(28, 181, 224, 0.2); /* bayangan lembut */
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
        }

        .profile-card {
          background: #ffffff;
          color: #333;
          padding: 40px;
          border-radius: 16px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-5px);
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #1cb5e0;
          margin-bottom: 1.2rem;
        }

        .profile-name {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .profile-role {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .profile-email {
          font-size: 1rem;
          font-weight: 500;
          color: #1cb5e0;
          transition: color 0.3s;
        }

        .profile-email:hover {
          color: #3b4be6;
        }

        @media (max-width: 600px) {
          .contact-title {
            font-size: 2rem;
          }

          .profile-card {
            padding: 25px;
          }

          .profile-img {
            width: 100px;
            height: 100px;
          }

          .profile-name {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
