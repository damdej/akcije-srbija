import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card/Card';
import './Home.css';

function Home() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadDeals();
    }, []);


    const loadDeals = async () => {
        try {
            const response = await axios.get('/api/deals');
            setDeals(response.data);
        } catch (error) {
            console.error('❌ Greška pri učitavanju:', error);
            setError('Nije moguće učitati ponude');
            setDeals([]);
        } finally {
            setLoading(false);
        }
    };

    const getPopularDeals = () => {
        return [...deals]
            .sort((a, b) => (b.discount || 0) - (a.discount || 0))
            .slice(0, 3);
    };

    // Funkcija za otvaranje linka u novom tabu
    const openDealLink = (link) => {
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    if (loading) return <div className="loading">Učitavanje ponuda...</div>;
    if (error) return <div className="error">{error}</div>;

    const popularDeals = getPopularDeals();

    return (
        <div className="container">
            <div className="home-page" >
                {/* GLAVNI SADRŽAJ - LEVA STRANA */}
                <div className="main-content">
                    <div className="content-header">
                        <h2>Sve Ponude</h2>
                        <p>Pronađeno {deals.length} aktivnih ponuda</p>
                    </div>

                    <div className="deals-grid">
                        {deals.length === 0 ? (
                            <div className="no-deals">
                                <h3>🤷‍♂️ Nema aktivnih ponuda</h3>
                                <p>Budite prvi koji će podneti ponudu!</p>
                                <a href="/podnesi-ponudu" className="cta-button">
                                    Podnesi prvu ponudu
                                </a>
                            </div>
                        ) : (
                            deals.map(deal => (
                                <Card key={deal._id} deal={deal} />
                            ))
                        )}
                    </div>
                </div>

                {/* SIDEBAR - DESNA STRANA */}
                <div className="sidebar">
                    <div className="sidebar-widget">
                        <h3><span> <i className="fa-solid fa-fire"></i></span>
                            Popularne Ponude</h3>
                        <div className="popular-deals">
                            {popularDeals.length > 0 ? (
                                popularDeals.map(deal => (
                                    <div
                                        key={deal._id}
                                        className="popular-deal-item"
                                        onClick={() => openDealLink(deal.link)} // DODATA FUNKCIONALNOST KLIKA
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="popular-deal-image">
                                            <img
                                                src={deal.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdGOEM4RCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+Tk8gSU1HPC90ZXh0Pgo8L3N2Zz4K'}
                                                alt={deal.title}
                                            />
                                        </div>
                                        <div className="popular-deal-info">
                                            <h4>{deal.title.length > 50 ? deal.title.substring(0, 50) + '...' : deal.title}</h4>
                                            <div className="popular-deal-prices">
                                                <span className="popular-price">{deal.price?.toLocaleString()} RSD</span>
                                                {deal.oldPrice && (
                                                    <span className="popular-old-price">{deal.oldPrice?.toLocaleString()} RSD</span>
                                                )}
                                            </div>
                                            {deal.discount > 0 && (
                                                <span className="popular-discount">-{deal.discount}%</span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-popular">Trenutno nema popularnih ponuda</p>
                            )}
                        </div>
                    </div>

                    <div className="sidebar-widget">
                        <h3>📢 Reklama</h3>
                        <div className="ad-space">
                            <img
                                src="https://via.placeholder.com/250x300/4A90E2/FFFFFF?text=Premium+Proizvodi+Ovde"
                                alt="Reklama"
                                className="ad-image"
                            />
                            <div className="ad-content">
                                <h4>Specijalna Ponuda!</h4>
                                <p>Uštedite do 50% na odabrane proizvode</p>
                                <button className="ad-button">Saznaj Više</button>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-widget">
                        <h3>⚡ Brzi Linkovi</h3>
                        <ul className="quick-links">
                            <li><a href="/podnesi-ponudu">📤 Podnesi Ponudu</a></li>
                            <li><a href="/admin">⚙️ Administracija</a></li>
                            <li><a href="/category/tehnika">💻 Tehnika</a></li>
                            <li><a href="/category/sport">🏃 Sport</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;