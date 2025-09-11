import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Raffles from './pages/Raffles.jsx';
import LastWinners from './pages/LastWinners.jsx';
import Login from './pages/Login.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';

export default function App() {
  return (
    <Router>
      <AnimatedBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/raffles" element={<Raffles />} />
        <Route path="/winners" element={<LastWinners />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}
