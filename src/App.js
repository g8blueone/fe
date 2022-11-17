import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './views/login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './views/home/home';
import { Doctors } from './views/doctors/doctors';
import { Appointments } from './views/appointments/appointments';
import { CreateAppointment } from './views/appointments/createAppointment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
