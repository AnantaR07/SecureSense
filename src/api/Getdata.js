import React, { useEffect, useContext, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { DataContext } from "./DataContext";

// Konfigurasi Firebase
const firebaseConfig = {
  databaseURL:
    "https://sense-20462-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi bantu rotasi
const ROR = (x, r) => ((x >>> r) | (x << (16 - r))) & 0xffff;
const ROL = (x, r) => ((x << r) | (x >>> (16 - r))) & 0xffff;

// Fungsi enkripsi Speck 16-bit dengan 22 round
const speckEncrypt = (xInput, yInput, keyInit) => {
  let x = xInput & 0xffff;
  let y = yInput & 0xffff;
  let k = keyInit.slice(0, 2); // hanya ambil 2 word untuk key 32-bit
  let keySchedule = [];

  for (let i = 0; i < 22; i++) {
    keySchedule[i] = k[0];

    x = ROR(x, 7);
    x = (x + y) & 0xffff;
    x ^= keySchedule[i];

    y = ROL(y, 2);
    y ^= x;

    // Key expansion
    const tmp = k[1];
    k[1] = ROR(k[1], 7);
    k[1] = (k[1] + k[0]) & 0xffff;
    k[1] ^= i;
    k[0] = ROL(k[0], 2);
    k[0] ^= k[1];
  }

  return [x, y];
};

export default function GetData() {
  const { setLogData } = useContext(DataContext);
  const [localLogs, setLocalLogs] = useState([]);

  useEffect(() => {
    const keyInit = [0x1918, 0x1110, 0x0908, 0x0100];
    const dataRef = ref(database, "data");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logs = Object.entries(data).map(([timestamp, value], index) => {
          const suhuRaw = parseFloat(value.suhu);
          const kelembabanRaw = parseFloat(value.kelembaban);

          const suhuInt = Math.round(suhuRaw * 100) & 0xffff;
          const kelembabanInt = Math.round(kelembabanRaw * 100) & 0xffff;

          const [encX, encY] = speckEncrypt(
            suhuInt,
            kelembabanInt,
            [0x1918, 0x1110]
          );

          return {
            index: index + 1,
            timestamp,
            suhu: suhuRaw, // ✅ penting
            kelembaban: kelembabanRaw, // ✅ penting
            encX,
            encY,
          };
        });

        setLogData(logs); // jika masih ingin mengisi context
        setLocalLogs(logs); // ditampilkan di komponen ini
      }
    });
  }, [setLogData]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Data dari Firebase + Enkripsi</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>No</th>
            <th>Timestamp</th>
            <th>Suhu (°C)</th>
            <th>Kelembaban (%)</th>
            <th>encX</th>
            <th>encY</th>
          </tr>
        </thead>
        <tbody>
          {localLogs.map((log) => (
            <tr key={log.index}>
              <td>{log.index}</td>
              <td>{log.timestamp}</td>
              <td>{log.suhu?.toFixed(2) ?? "-"}</td>
              <td>{log.kelembaban?.toFixed(2) ?? "-"}</td>
              <td>{log.encX}</td>
              <td>{log.encY}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
