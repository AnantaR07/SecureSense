import React from "react";
import NavbarSecureSense from "./component/Navbar";
import FooterSecureSense from "./component/Footer";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  // Contoh data isi gudang
  const gudangItems = [
    {
      id: 1,
      namaBarang: "Produk Elektronik",
      kategori: "Elektronik",
      keunggulan: "Teknologi terbaru dengan efisiensi energi tinggi",
    },
    {
      id: 2,
      namaBarang: "Alat Tulis Kantor",
      kategori: "Kebutuhan Kantor",
      keunggulan: "Tahan lama dan desain ergonomis untuk kenyamanan kerja",
    },
    {
      id: 3,
      namaBarang: "Pakaian Jadi",
      kategori: "Garmen",
      keunggulan: "Bahan berkualitas tinggi dan desain trendi",
    },
    {
      id: 4,
      namaBarang: "Peralatan Dapur",
      kategori: "Rumah Tangga",
      keunggulan: "Tahan panas, multifungsi, dan aman digunakan",
    },
    {
      id: 5,
      namaBarang: "Bahan Makanan Kering",
      kategori: "Makanan & Minuman",
      keunggulan:
        "Tahan lama, higienis, dan cocok untuk penyimpanan jangka panjang",
    },
  ];

  return (
    <div>
      <NavbarSecureSense />

      <main className="dashboard-container">
        <section className="header-section">
          <div className="image-container">
            <img
              src="/img/PT.jpg"
              alt="Gudang PT Citra Pratama Distribusiindoraya"
              className="pt-header-image"
            />
          </div>
          <div className="text-container">
            <span className="highlight">
              PT. CITRA PRATAMA DISTRIBUSIINDORAYA
            </span>
            <p className="intro">
              Sebagai pusat distribusi utama, gudang kami mengelola berbagai
              jenis produk dengan standar penyimpanan <strong>terbaik</strong>{" "}
              dan sistem pengawasan <strong>modern</strong> untuk memastikan
              semua barang tetap dalam kondisi optimal dan siap didistribusikan
              tepat waktu.
            </p>
          </div>
        </section>

        <section className="warehouse-content">
          <h2>
            <i className="fas fa-warehouse"></i> Detail Isi Gudang
          </h2>
          <div className="cards-container">
            {gudangItems.map(({ id, namaBarang, kategori, keunggulan }) => (
              <div key={id} className="item-card">
                <h3>{namaBarang}</h3>
                <p>
                  <strong>Kategori:</strong> {kategori}
                </p>
                <p className="keunggulan">
                  <strong>Keunggulan:</strong> {keunggulan}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="monitoring-section">
          <h2>
            <i className="fas fa-thermometer-half"></i> Pemantauan Kualitas
            Udara Gudang
          </h2>
          <div className="monitoring-buttons">
            <Link to="/airmonitoring" className="monitor-btn combined-btn">
              <i className="fas fa-wind"></i> Pantau Suhu & Kelembaban
            </Link>
          </div>
        </section>
      </main>

      <FooterSecureSense />

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          background: #f0f5ff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 50, 150, 0.15);
        }

        .header-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          text-align: left;
          padding: 2rem 1rem 3rem;
          background: linear-gradient(135deg, #0047ab, #0077ff);
          border-radius: 16px 16px 0 0;
          color: white;
          box-shadow: 0 4px 15px rgba(0, 68, 153, 0.4);
          flex-wrap: wrap; /* Agar responsif di layar kecil */
        }

        .image-container {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .text-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 600px;
        }

        .pt-header-image {
          width: 100%;
          max-width: 500px;
          border-radius: 20px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
          object-fit: cover;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 3px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(4px);
        }

        /* Hover effect untuk memberi kesan interaktif */
        .pt-header-image:hover {
          transform: scale(1.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: #ffb347;
        }

        .highlight {
          color: #ffb347;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-left: 5px solid #ffb347;
          border-radius: 8px;
          font-size: 1.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.75rem;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
          display: inline-block;
          transition: background-color 0.3s ease;
        }

        .highlight:hover {
          background-color: rgba(255, 179, 71, 0.2);
        }

        .intro {
          font-size: 1.15rem;
          line-height: 1.8;
          font-weight: 500;
          text-align: justify;
          text-justify: inter-word;
          color: #f1f1f1;
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1rem 1.25rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s ease;
        }

        .intro:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .warehouse-content {
          padding: 4rem 1rem 5rem;
          background: linear-gradient(135deg, #e0f0ff, #ffffff);
          border-radius: 0 0 28px 28px;
          box-shadow: inset 0 0 120px #a6d1ff;
          font-family: "Poppins", sans-serif;
          text-align: center;
        }

        .warehouse-content h2 {
          text-align: center;
          font-size: 2.8rem;
          font-weight: 900;
          color: #0047b3;
          letter-spacing: 3px;
          margin-bottom: 3rem;
          position: relative;
          text-transform: uppercase;
          background: linear-gradient(45deg, #0077ff, #00cfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 5s linear infinite;
          display: inline-block;
          padding: 0 1rem;
        }

        .warehouse-content h2 i {
          margin-right: 12px;
          color: #0077ff;
          filter: drop-shadow(0 0 5px #00cfff);
          animation: iconPulse 2s ease-in-out infinite;
        }

        .warehouse-content h2 {
          text-align: center;
          color: #003f9f;
          font-weight: 900;
          font-size: 2.4rem;
          margin-bottom: 2.5rem;
          letter-spacing: 2px;
          text-shadow: 2px 2px 8px rgba(0, 63, 159, 0.3);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          padding: 0 1.5rem;
        }

        .item-card {
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 2rem 2.2rem;
          box-shadow: 0 8px 20px rgba(0, 119, 255, 0.15),
            0 0 12px rgba(0, 119, 255, 0.2);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
          border: 1.5px solid rgba(0, 119, 255, 0.35);
        }

        .item-card:hover {
          transform: translateY(-10px) scale(1.04);
          box-shadow: 0 18px 38px rgba(255, 140, 0, 0.4),
            0 0 18px rgba(188, 176, 44, 0.5);
          border-color: #ffb347;
        }

        .item-card h3 {
          font-size: 1.75rem;
          margin-bottom: 1.25rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #002974;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .item-card p {
          font-size: 1.1rem;
          margin: 0.5rem 0;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #0047b3;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          line-height: 1.4;
        }

        .item-card p.keunggulan {
          font-style: italic;
          color: #0059ff;
          font-weight: 700;
          margin-top: 1rem;
          text-shadow: 0 0 6px rgba(0, 89, 255, 0.3);
        }

        .monitoring-section {
          margin-top: 3rem;
          padding: 2.5rem 1rem;
          background: linear-gradient(135deg, #0077ff, #00cfff);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 119, 255, 0.4);
          color: white;
          text-align: center;
          font-family: "Poppins", sans-serif;
        }

        .monitoring-section h2 {
          font-size: 2.4rem;
          font-weight: 900;
          margin-bottom: 2rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          color: white; /* Warna putih solid */
          background: none; /* Hilangkan background gradient */
          -webkit-background-clip: unset; /* Nonaktifkan background-clip */
          -webkit-text-fill-color: white; /* Pastikan teks diwarnai putih */
          animation: none; /* Hilangkan animasi jika perlu */
        }

        .monitoring-buttons {
          display: flex;
          justify-content: center;
        }

        .monitor-btn {
          background: white;
          color: #0077ff;
          font-weight: 700;
          font-size: 1.3rem;
          padding: 1rem 3rem;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(0, 119, 255, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          transition: background-color 0.3s ease, color 0.3s ease,
            transform 0.25s ease;
          cursor: pointer;
        }

        .monitor-btn i {
          font-size: 1.7rem;
        }

        .monitor-btn:hover {
          background-color: #005fcc;
          color: #e0f0ff;
          transform: scale(1.05);
          box-shadow: 0 12px 40px rgba(0, 95, 204, 0.6);
        }

        @media (max-width: 768px) {
          .header-section h1 {
            font-size: 2rem;
          }

          .warehouse-content h2 {
            font-size: 1.6rem;
          }

          .item-card {
            padding: 1.2rem 1rem;
          }

          .item-card h3 {
            font-size: 1.25rem;
          }

          .item-card p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
