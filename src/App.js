import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashbaordSecureSense from "./Dashboard";
import AirMonitoringSecureSense from "./Airmonitoring";
import AboutSecureSense from "./About";
import ContactSecureSense from "./Contact";
import GetData from "./api/Getdata";
import ResultData from "./api/Resultdata";
import { DataProvider } from "./api/DataContext";
import { ResultProvider } from "./api/ResultContext";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <ResultProvider>
        <Router>
          <div style={{ display: "none" }}>
            <GetData />
          </div>
          <Routes>
            <Route path="/" element={<DashbaordSecureSense />} />
            <Route
              path="/airmonitoring"
              element={<AirMonitoringSecureSense />}
            />
            <Route path="/about" element={<AboutSecureSense />} />
            <Route path="/contact" element={<ContactSecureSense />} />
            <Route path="/resultdata" element={<ResultData />} />
            <Route path="/getdata" element={<GetData />} />
          </Routes>
        </Router>
      </ResultProvider>
    </DataProvider>
  );
}

export default App;
