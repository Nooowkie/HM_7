import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Encyclopedia from './pages/Encyclopedia';
import FilmsCharacters from './pages/FilmsCharacters';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/encyclopedia">Encyclopedia</Link>
        <Link to="/films-characters">Films ↔ Characters</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/films-characters" element={<FilmsCharacters />} />
      </Routes>
    </>
  );
}

export default App;
