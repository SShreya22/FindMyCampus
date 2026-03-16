import { createContext, useContext, useState } from 'react';
import { facultyData } from '../data/facultyData';
import { busData } from '../data/busData';
import { buildingData } from '../data/buildingData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [faculty, setFaculty] = useState(facultyData);
  const [buses, setBuses] = useState(busData);
  const [buildings, setBuildings] = useState(buildingData);

  const loginStudent = (id, password) => {
    if (id === 'STU001' && password === 'password') {
      setUser({ id, name: 'Rahul Verma', role: 'student' });
      setRole('student');
      return true;
    }
    return false;
  };

  const loginAdmin = (id, password) => {
    if (id === 'ADM001' && password === 'admin123') {
      setUser({ id, name: 'Admin User', role: 'admin' });
      setRole('admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const updateFaculty = (id, updates) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const updateBus = (id, updates) => {
    setBuses(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const updateBuilding = (id, updates) => {
    setBuildings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  return (
    <AppContext.Provider value={{
      user, role, faculty, buses, buildings,
      loginStudent, loginAdmin, logout,
      updateFaculty, updateBus, updateBuilding,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
