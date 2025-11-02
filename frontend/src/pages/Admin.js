import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function Admin() {
    const [pendingDeals, setPendingDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPendingDeals();
    }, []);

    const loadPendingDeals = async () => {
        try {
            const response = await axios.get('/api/deals/pending');
            setPendingDeals(response.data);
        } catch (error) {
            console.error('Greška pri učitavanju:', error);
        } finally {
            setLoading(false);
        }
    };

    const approveDeal = async (dealId) => {
        try {
            await axios.patch(`/api/deals/${dealId}/approve`);
            alert('Ponuda odobrena!');
            loadPendingDeals(); // Ponovo učitaj listu
        } catch (error) {
            console.error('Greška pri odobravanju:', error);
            alert('Greška pri odobravanju');
        }
    };

    const rejectDeal = async (dealId) => {
        try {
            await axios.patch(`/api/deals/${dealId}/reject`);
            alert('Ponuda odbijena!');
            loadPendingDeals(); // Ponovo učitaj listu
        } catch (error) {
            console.error('Greška pri odbijanju:', error);
            alert('Greška pri odbijanju');
        }
    };

    if (loading) return <div className="loading">Učitavanje...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>🛠️ Administracija - Ponude na čekanju</h1>
                <p>Pronađeno {pendingDeals.length} ponuda za pregled</p>
            </div>

            {pendingDeals.length === 0 ? (
                <div className="no-deals">
                    <h3>🎉 Nema ponuda na čekanju!</h3>
                    <p>Sve ponude su obrađene.</p>
                </div>
            ) : (
                <div className="pending-deals">
                    {pendingDeals.map(deal => (
                        <div key={deal._id} className="deal-card">
                            <div className="deal-image">
                                <img
                                    src={deal.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdGOEM4RCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+Tk8gSU1HPC90ZXh0Pgo8L3N2Zz4K'}
                                    alt={deal.title}
                                />
                            </div>
                            <div className="deal-info">
                                <h3>{deal.title}</h3>
                                <div className="deal-details">
                                    <p><strong>Prodavac:</strong> {deal.store}</p>
                                    <p><strong>Cena:</strong> {deal.price} RSD</p>
                                    {deal.oldPrice && <p><strong>Stara cena:</strong> {deal.oldPrice} RSD</p>}
                                    <p><strong>Kategorija:</strong> {deal.category}</p>
                                    <p><strong>Datum:</strong> {new Date(deal.createdAt).toLocaleString()}</p>
                                </div>
                                <a href={deal.link} target="_blank" rel="noopener noreferrer" className="deal-link">
                                    🔗 Pogledaj ponudu
                                </a>
                            </div>
                            <div className="deal-actions">
                                <button
                                    onClick={() => approveDeal(deal._id)}
                                    className="btn-approve"
                                >
                                    ✅ Odobri
                                </button>
                                <button
                                    onClick={() => rejectDeal(deal._id)}
                                    className="btn-reject"
                                >
                                    ❌ Odbij
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Admin;