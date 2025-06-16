import React, { useContext, useEffect } from "react";
import { DataContext } from "./DataContext";
import { ResultContext } from "./ResultContext";

const ROR = (x, r) => ((x >>> r) | (x << (16 - r))) & 0xffff;
const ROL = (x, r) => ((x << r) | (x >>> (16 - r))) & 0xffff;

const speckDecrypt = (xInput, yInput, keyInit) => {
  let x = xInput & 0xffff;
  let y = yInput & 0xffff;
  let k = keyInit.slice(0, 2);
  let keySchedule = [];

  for (let i = 0; i < 22; i++) {
    keySchedule[i] = k[0];
    const tmp = k[1];
    k[1] = ROR(k[1], 7);
    k[1] = (k[1] + k[0]) & 0xffff;
    k[1] ^= i;
    k[0] = ROL(k[0], 2);
    k[0] ^= k[1];
  }

  for (let i = 21; i >= 0; i--) {
    y ^= x;
    y = ROR(y, 2);
    x ^= keySchedule[i];
    x = (x - y + 0x10000) & 0xffff;
    x = ROL(x, 7);
  }

  return [x, y];
};

export default function ResultData() {
  const { logData } = useContext(DataContext);
  const { setResultData } = useContext(ResultContext);
  const key = [0x1918, 0x1110];

  useEffect(() => {
    const decryptedResults = logData.map((log) => {
      const [decSuhuInt, decKelembabanInt] = speckDecrypt(
        log.encX,
        log.encY,
        key
      );
      return {
        timestamp: log.timestamp,
        suhu: decSuhuInt / 100,
        kelembaban: decKelembabanInt / 100,
      };
    });

    setResultData(decryptedResults);
  }, [logData, setResultData]);

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Hasil Dekripsi Sensor</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd" }}>
            <th>No</th>
            <th>Timestamp</th>
            <th>EncX</th>
            <th>EncY</th>
            <th>Hasil Suhu</th>
            <th>Hasil Kelembaban</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log, i) => {
            const [decSuhuInt, decKelembabanInt] = speckDecrypt(
              log.encX,
              log.encY,
              key
            );
            const decSuhu = decSuhuInt / 100;
            const decKelembaban = decKelembabanInt / 100;

            return (
              <tr key={log.index}>
                <td>{log.index}</td>
                <td>{log.timestamp}</td>
                <td>{log.encX}</td>
                <td>{log.encY}</td>
                <td>{decSuhu.toFixed(2)} °C</td>
                <td>{decKelembaban.toFixed(2)} %</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
