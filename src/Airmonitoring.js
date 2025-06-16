import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useContext } from "react";
import { ref as dbRef, set } from "firebase/database";
import { ResultContext } from "./api/ResultContext";
import NavbarSecureSense from "./component/Navbar";
import FooterSecureSense from "./component/Footer";

// Firebase config
const firebaseConfig = {
  databaseURL:
    "https://sense-20462-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const DashboardPage = () => {
  const [dataKualitasUdara, setDataKualitasUdara] = useState([]);
  const { resultData } = useContext(ResultContext);
  const [isChecking, setIsChecking] = useState(false); // state untuk tombol

  const handleCheckNow = () => {
    setIsChecking(true);
    const statusRef = dbRef(database, "data/value/status");
    set(statusRef, true);

    setTimeout(() => {
      set(statusRef, false);
      setIsChecking(false);
    }, 5000);
  };

  useEffect(() => {
    const dataRef = ref(database, "data");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(
          ([timestamp, value]) => ({
            ...value,
            timestamp,
          })
        );
        formattedData.sort((a, b) => b.timestamp - a.timestamp);
        setDataKualitasUdara(formattedData);
      }
    });
  }, []);

  return (
    <div>
      <NavbarSecureSense />
      <div className="dashboard-container">
        <section className="data-table-section">
          <h2>
            <i className="fas fa-smog"></i> Data Kualitas Udara
          </h2>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <button
              onClick={handleCheckNow}
              disabled={isChecking}
              style={{
                padding: "12px 24px",
                fontSize: "1rem",
                backgroundColor: isChecking ? "#ffc107" : "#0047b3",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i
                className={`fas ${
                  isChecking ? "fa-spinner fa-spin" : "fa-thermometer-half"
                }`}
              ></i>
              {isChecking
                ? "Proses cek & kelembaban..."
                : "Cek suhu & kelembaban sekarang"}
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Suhu (°C)</th>
                <th>Kelembaban (%)</th>
                <th>Kualitas</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataKualitasUdara.slice(0, 6).map((item, index) => {
                const decrypted = resultData.find(
                  (res) => res.timestamp === item.timestamp
                );

                const suhu = decrypted
                  ? decrypted.suhu.toFixed(2)
                  : parseFloat(item.suhu).toFixed(2);
                const kelembaban = decrypted
                  ? decrypted.kelembaban.toFixed(2)
                  : parseFloat(item.kelembaban).toFixed(2);

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.waktu}</td>
                    <td>{suhu}</td>
                    <td>{kelembaban}</td>
                    <td>{item.kualitas}</td>
                    <td>
                      <span
                        className={`status-badge ${item.status?.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="spec-section">
          <h2>
            <i className="fas fa-info-circle"></i> Apa itu SPEC?
          </h2>
          <p>
            SPEC adalah singkatan dari <strong>Specification</strong> atau
            spesifikasi teknis yang menjelaskan standar, parameter, dan detail
            teknis suatu sistem atau perangkat. Dalam konteks{" "}
            <em>Dashboard Kualitas Udara</em> ini, SPEC merujuk pada standar
            sensor dan batasan nilai kualitas udara yang digunakan untuk
            menentukan status aman, waspada, atau bahaya.
          </p>
          <p>
            Dengan memahami SPEC, kita dapat lebih tepat dalam memantau dan
            menilai kondisi lingkungan agar tetap sehat dan nyaman untuk semua
            pengguna.
          </p>
          <p className="note">
            <strong>Catatan:</strong> Penting untuk selalu mengikuti SPEC agar
            data yang ditampilkan valid dan bermanfaat.
          </p>
        </section>

        <style jsx>{`
          .dashboard-container {
            padding: 3rem 1rem 5rem;
            background: linear-gradient(to bottom right, #eef3fb, #ffffff);
            min-height: 100vh;
            font-family: "Poppins", sans-serif;
          }

          .data-table-section h2 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            text-align: center;
            text-transform: uppercase;
            color: #0047b3;
            background: linear-gradient(45deg, #0047b3, #00c6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;
          }

          .data-table {
            width: 100%;
            border-collapse: collapse;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            border-radius: 12px;
            overflow: hidden;
            background: #fff;
          }

          .data-table th,
          .data-table td {
            padding: 1rem;
            text-align: center;
            font-size: 1rem;
            border-bottom: 1px solid #eee;
          }

          .data-table th {
            background: #0047b3;
            color: #fff;
            font-weight: 700;
          }

          .data-table tbody tr:hover {
            background-color: #f1f7ff;
            transition: background 0.3s ease;
          }

          .status-badge {
            padding: 0.4rem 1rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #fff;
            text-transform: uppercase;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            display: inline-block;
          }

          .status-badge.aman {
            background-color: #28a745;
          }

          .status-badge.waspada {
            background-color: #ffc107;
            color: #212529;
          }

          .status-badge.bahaya {
            background-color: #dc3545;
          }

          .spec-section {
            width: 93%;
            margin: 0 auto 3rem;
            background: #d0eaff;
            border-left: 6px solid #0047b3;
            padding: 1.8rem 2rem;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 71, 179, 0.2);
            color: #0047b3;
            margin-top: 2%;
          }

          .spec-section h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
          }

          .spec-section p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1rem;
            text-align: justify;
          }

          .spec-section .note {
            background-color: #0047b3;
            color: white;
            padding: 0.6rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          }

          @media (max-width: 768px) {
            .data-table-section h2 {
              font-size: 1.8rem;
            }

            .data-table {
              font-size: 0.95rem;
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }
            .spec-section {
              width: 85%;
            }
          }
        `}</style>
      </div>
      <FooterSecureSense />
    </div>
  );
};

export default DashboardPage;
