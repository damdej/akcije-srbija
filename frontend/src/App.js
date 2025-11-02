import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import TestCard from './pages/TestCard';
import SubmitDeal from './pages/SubmitDeal';
import Admin from './pages/Admin'; // DODAJ OVAJ IMPORT
import Header from './components/Header/Header';
import './Slickdeals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/test-card" element={<TestCard />} />
          <Route path="/podnesi-ponudu" element={<SubmitDeal />} />
          <Route path="/admin" element={<Admin />} /> {/* DODAJ OVU RUTU */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;