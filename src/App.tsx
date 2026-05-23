import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Market from './main/market';
import Auth from './auth/auth';
import Registration from './auth/registration';
import Balance from './store/balance';
import Settings from './store/settings';
import Admin from './store/admin';
import Support from './store/support';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/market" element={<Market />} />
        <Route path="/topup" element={<Balance />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;