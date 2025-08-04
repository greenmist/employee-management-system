import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/EmployeDashboard';
import AdminDashboard from './Pages/Dashboard';
import Announcements from './Pages/Announcements';
import LeaveHistory from './Pages/LeaveHistory'; //
import Attendance from './Pages/Attendance'; //
import Profile from './Pages/Profile';

import './App.css';

const App: React.FC = () => {
  // const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employedashboard" element={<Dashboard />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/leave" element={<LeaveHistory />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/dashboard" element={ <AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
