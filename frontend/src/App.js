// frontend/src/App.js - NAŠ KOD ZA AKCIJE
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  // Uzmi akcije sa API-ja
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/deals');
        setDeals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Greška pri učitavanju akcija:', error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Newsletter pretplata
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Hvala na pretplati! ${email} je dodat na listu.`);
      setEmail('');
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>Učitavam najbolje akcije... ⏳</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <h1>🎯 AkcijeSrbija</h1>
          <p>Pronađi najbolje akcije u Srbiji svakog dana!</p>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h2>Dnevne akcije iz svih prodavnica</h2>
          <p>Pretplati se na newsletter i budi prvi koji sazna za super ponude!</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Unesi svoj email..."
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-btn">
              PRETPLATI SE 📧
            </button>
          </form>
        </div>
      </section>

      {/* DEALS GRID */}
      <main className="container">
        <h2 className="section-title">🔥 Aktuelne Akcije</h2>

        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="deal-card">
              <div className="deal-image">
                <img src={deal.image} alt={deal.name} />
                {deal.discount && (
                  <span className="discount-badge">-{deal.discount}</span>
                )}
              </div>

              <div className="deal-info">
                <h3 className="deal-title">{deal.name}</h3>
                <div className="deal-prices">
                  <span className="current-price">{deal.price}</span>
                  {deal.oldPrice && (
                    <span className="old-price">{deal.oldPrice}</span>
                  )}
                </div>
                <div className="deal-store">
                  🏪 {deal.store}
                </div>
                <button className="deal-button">
                  VIDI AKCIJU 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 AkcijeSrbija - Sve akcije na jednom mestu</p>
        </div>
      </footer>
    </div>
  );
}

export default App;