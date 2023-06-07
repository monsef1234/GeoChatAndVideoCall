import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="map" element={<Map />} />
      </Routes>
    </>
  );
};

export default App;
