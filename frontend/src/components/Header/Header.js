import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCategories, setShowCategories] = useState(false); // DODATO ZA DROPDOWN
    const navigate = useNavigate();

    const categories = [
        { value: 'all', label: 'Sve Kategorije', icon: 'fas fa-list' },
        { value: 'tehnika', label: 'Tehnika', icon: 'fas fa-mobile-alt' },
        { value: 'bela-tehnika', label: 'Bela Tehnika', icon: 'fas fa-tv' },
        { value: 'sport', label: 'Sport', icon: 'fas fa-running' },
        { value: 'moda', label: 'Moda', icon: 'fas fa-tshirt' },
        { value: 'putovanje', label: 'Putovanje', icon: 'fas fa-plane' },
        { value: 'hrana', label: 'Hrana', icon: 'fas fa-utensils' },
        { value: 'karte', label: 'Karte', icon: 'fas fa-ticket-alt' },
        { value: 'usluge', label: 'Usluge', icon: 'fas fa-tools' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', searchQuery, selectedCategory);
    };

    const handleCategorySelect = (categoryValue) => {
        setSelectedCategory(categoryValue);
        setShowCategories(false); // Zatvori dropdown kada se odabere kategorija

        if (categoryValue === 'all') {
            navigate('/');
        } else {
            navigate(`/category/${categoryValue}`);
        }
    };

    const handleLogoClick = () => {
        navigate('/');
        setSelectedCategory('all');
    };

    const handleNavClick = (section) => {
        console.log('Navigation:', section);
    };

    return (
        <header className="slickdeals-header">
            {/* TOP BAR - SLICKDEALS STYLE */}
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-fire logo-icon"></i>
                            <h1>Super Akcije</h1>
                        </div>
                        <nav className="main-nav">
                            <a
                                href="/podnesi-ponudu"
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/podnesi-ponudu');
                                }}
                            >
                                <i className="fas fa-plus"></i>
                                Podnesi Ponudu
                            </a>
                            <a
                                href="/test-card"
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/test-card');
                                }}
                            >
                                <i className="fas fa-vial"></i>
                                Test Card
                            </a>
                            <a
                                href="#frontpage"
                                className="nav-link active"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('frontpage');
                                    navigate('/');
                                }}
                            >
                                <i className="fas fa-home"></i>
                                Početna
                            </a>
                            <a
                                href="#deals"
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('deals');
                                }}
                            >
                                <i className="fas fa-tag"></i>
                                Sve Akcije
                            </a>
                            <a
                                href="#hot"
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('hot');
                                }}
                            >
                                <i className="fas fa-fire"></i>
                                Popularno
                            </a>
                            <a
                                href="#categories"
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('categories');
                                }}
                            >
                                <i className="fas fa-th-large"></i>
                                Kategorije
                            </a>
                        </nav>
                    </div>

                    <div className="header-right">
                        <div className="header-actions">
                            <button className="icon-btn">
                                <i className="fas fa-bell"></i>
                            </button>
                            <button className="icon-btn">
                                <i className="fas fa-envelope"></i>
                            </button>
                        </div>
                        <div className="auth-buttons">
                            <button className="login-btn">
                                <i className="fas fa-sign-in-alt"></i>
                                Prijavi se
                            </button>
                            <button className="signup-btn">
                                <i className="fas fa-user-plus"></i>
                                Registruj se
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH BAR - SLICKDEALS STYLE */}
            <div className="search-section">
                <div className="container">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-container">
                            {/* Search Input */}
                            <div className="search-input-container">
                                <input
                                    type="text"
                                    placeholder="Pretraži akcije, prodavnice, proizvode..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                <button type="submit" className="search-btn">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* KATEGORIJE ISPOD SEARCH BARA - SA DROPDOWN-OM I BRZIM KATEGORIJAMA */}
                    <div className="categories-section">
                        <div className="categories-container">
                            {/* Kategorije dropdown dugme */}
                            <div className="categories-dropdown">
                                <button
                                    className="categories-btn"
                                    onClick={() => setShowCategories(!showCategories)}
                                >
                                    Kategorije
                                    <i className="fas fa-chevron-down"></i>
                                </button>

                                {/* Dropdown menu - JEDNA KOLONA, BEZ BORDERA */}
                                {showCategories && (
                                    <div className="categories-dropdown-menu">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.value}
                                                className={`category-item ${selectedCategory === cat.value ? 'active' : ''}`}
                                                onClick={() => handleCategorySelect(cat.value)}
                                            >
                                                <i className={cat.icon}></i>
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Brze kategorije pored dugmeta */}
                            <div className="quick-categories">
                                {categories.slice(1, 7).map(cat => (
                                    <button
                                        key={cat.value}
                                        className={`quick-cat ${selectedCategory === cat.value ? 'active' : ''}`}
                                        onClick={() => handleCategorySelect(cat.value)}
                                    >
                                        <i className={cat.icon}></i>
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;