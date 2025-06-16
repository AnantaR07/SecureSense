import React from "react";
import NavbarSecureSense from "./component/Navbar";
import FooterSecureSense from "./component/Footer";

export default function AboutSecureSense() {
  return (
    <div>
      <NavbarSecureSense />

      <section className="hero-securesense">
        <div className="hero-content">
          <h1>SecureSense untuk Industri Modern</h1>
          <p>
            SecureSense adalah solusi pemantauan suhu dan kelembaban berbasis
            IoT yang dirancang khusus untuk memastikan stabilitas dan keamanan
            lingkungan pabrik secara real-time.
          </p>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-box">
            <h3>Monitoring Real-Time</h3>
            <p>
              Data suhu dan kelembaban diperbarui secara langsung untuk
              memastikan kendali penuh setiap saat.
            </p>
          </div>
          <div className="feature-box">
            <h3>Notifikasi Otomatis</h3>
            <p>
              Peringatan dikirim otomatis jika kondisi melebihi ambang batas
              yang ditentukan.
            </p>
          </div>
          <div className="feature-box">
            <h3>Desain Andal & Aman</h3>
            <p>
              Dikembangkan dengan standar industri untuk menjaga kestabilan
              produksi dan keselamatan kerja.
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-container">
          <img
            src="/img/PTFront.jpg"
            alt="Factory environment"
            className="info-image"
          />
          <div className="info-text">
            <h2>Kenapa SecureSense Penting untuk Pabrik Anda?</h2>
            <p>
              Suhu dan kelembaban yang tidak stabil dapat mempengaruhi kualitas
              produk, mempercepat kerusakan mesin, dan menciptakan kondisi kerja
              yang tidak nyaman. Dengan SecureSense, semua itu bisa dicegah
              dengan pemantauan akurat dan otomatis.
            </p>
          </div>
        </div>
      </section>

      <FooterSecureSense />

      <style jsx>{`
        .hero-securesense {
          background: linear-gradient(90deg, #1cb5e0 0%, rgb(57, 75, 230) 100%);
          padding: 80px 20px;
          color: white;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .features-section {
          background: #f4f6f8;
          padding: 60px 20px;
          text-align: center;
        }

        .features-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .feature-box {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          width: 280px;
        }

        .feature-box h3 {
          margin-bottom: 12px;
          color: #003973;
        }

        .info-section {
          padding: 60px 20px;
          background: #ffffff;
        }

        .info-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          gap: 40px;
        }

        .info-image {
          flex: 1;
          min-width: 280px;
          max-width: 500px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .info-text {
          flex: 1;
          text-align: justify;
        }

        .info-text h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #003973;
        }

        .info-text p {
          font-size: 1rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .features-container {
            flex-direction: column;
            align-items: center;
          }

          .info-container {
            flex-direction: column;
            text-align: center;
          }

          .info-text h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
