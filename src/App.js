import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./views/login/login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./views/home/home";
import { Doctors } from "./views/doctors/doctors";
import { Appointments } from "./views/appointments/appointments";
import { CreateAppointment } from "./views/appointments/createAppointment";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
