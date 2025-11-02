import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SubmitDeal.css';
import Header from '../components/Header/Header';

function SubmitDeal() {
    const [formData, setFormData] = useState({
        title: '',
        store: '',
        price: '',
        oldPrice: '',
        link: '',
        image: '',
        category: '',
        description: '',
        dealExpiry: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const categories = [
        { value: 'tehnika', label: 'Tehnika' },
        { value: 'bela-tehnika', label: 'Bela Tehnika' },
        { value: 'sport', label: 'Sport' },
        { value: 'moda', label: 'Moda' },
        { value: 'hrana', label: 'Hrana i Piće' },
        { value: 'kuca-basta', label: 'Kuća i Bašta' },
        { value: 'putovanje', label: 'Putovanje' },
        { value: 'usluge', label: 'Usluge' },
        { value: 'ostalo', label: 'Ostalo' }
    ];

    const popularStores = [
        'Gigatron', 'Tehnomanija', 'UniverExport',
        'FISH i Chips', 'Maxi', 'Roda', 'Sport Vision',
        'DD Shop', 'Winwin', 'Emmezeta', 'Ostalo'
        // UKLONJEN DUPLI IDEA
    ];
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/deals/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    store: formData.store,
                    price: Number(formData.price),
                    oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
                    link: formData.link,
                    category: formData.category,
                    status: 'pending'
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('✅ Ponuda uspešno podneta!');
                setFormData({
                    title: '', store: '', price: '', oldPrice: '', link: '',
                    image: '', category: '', description: '', dealExpiry: ''
                });
            } else {
                setMessage('❌ ' + result.error);
            }
        } catch (error) {
            setMessage('❌ Greška: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="submit-deal-page">
            {/* DODAJ HEADER SA LINKOM ZA NAZAD */}

            <div className="submit-deal-header">
                <Link to="/" className="back-link">
                    <i className="fas fa-arrow-left"></i>
                    Nazad na početnu
                </Link>
                <h1>Podnesi Novu Ponudu</h1>
            </div>

            <div className="submit-deal-container">
                <p className="page-description">
                    Podeli super ponudu sa zajednicom! Sve ponude će biti pregledane pre objavljivanja.
                </p>

                {message && (
                    <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="submit-deal-form">
                    {/* Naziv proizvoda */}
                    <div className="form-group">
                        <label htmlFor="title">Naziv Proizvoda *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="npr. Samsung TV 55 inca, Patike Nike Air Max..."
                        />
                    </div>

                    {/* Prodavac i Kategorija u istom redu */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="store">Prodavac *</label>
                            <select
                                id="store"
                                name="store"
                                value={formData.store}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Izaberi prodavca</option>
                                {popularStores.map(store => (
                                    <option key={store} value={store}>{store}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Kategorija *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Izaberi kategoriju</option>
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Cene */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Trenutna Cena (RSD) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="29999"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="oldPrice">Originalna Cena (RSD)</label>
                            <input
                                type="number"
                                id="oldPrice"
                                name="oldPrice"
                                value={formData.oldPrice}
                                onChange={handleChange}
                                placeholder="39999"
                            />
                        </div>
                    </div>

                    {/* Linkovi */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="link">Link ka Proizvodu *</label>
                            <input
                                type="url"
                                id="link"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                required
                                placeholder="https://www.prodavac.com/proizvod"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Link Slike (opciono)</label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://www.prodavac.com/slika.jpg"
                            />
                        </div>
                    </div>

                    {/* Opis i Rok trajanja */}
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="description">Opis Ponude (opciono)</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Dodatni detalji o ponudi, uslovi, dostava, garancija..."
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dealExpiry">Ponuda Važi Do (opciono)</label>
                        <input
                            type="date"
                            id="dealExpiry"
                            name="dealExpiry"
                            value={formData.dealExpiry}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit-btn"
                        onClick={(e) => {
                            console.log('🖱️ Dugme kliknuto!');
                            // Ovo će se pokrenuti čak i ako onSubmit ne radi
                        }}
                    >
                        {isSubmitting ? '⏳ Podnosim...' : '📤 Podnesi Ponudu'}
                    </button>
                </form>

                <div className="form-tips">
                    <h3>💡 Saveti za dobru ponudu:</h3>
                    <ul>
                        <li>Proveri da li je link tačan i proizvod dostupan</li>
                        <li>Dodaj sliku za bolju preglednost</li>
                        <li>Navedi tačan rok trajanja ponude</li>
                        <li>Proveri da li je cena ista kao na sajtu prodavca</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SubmitDeal;