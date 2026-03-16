import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Splash from './pages/Splash';
import RoleSelection from './pages/RoleSelection';
import StudentLogin from './pages/StudentLogin';
import AdminLogin from './pages/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import CampusMap from './pages/CampusMap';
import FacultyFinder from './pages/FacultyFinder';
import BusSchedule from './pages/BusSchedule';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/role-select" element={<RoleSelection />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/faculty-finder" element={<FacultyFinder />} />
          <Route path="/bus-schedule" element={<BusSchedule />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
