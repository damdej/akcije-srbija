import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import './CategoryPage.css';

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popularDeals, setPopularDeals] = useState([]);
    const [activeSubcategory, setActiveSubcategory] = useState('all');

    useEffect(() => {
        fetchCategoryData();
    }, [slug]);

    // Funkcija za mapiranje kategorija na ikone
    const getCategoryIcon = (categorySlug) => {
        const iconMap = {
            'tehnika': 'fas fa-laptop',
            'bela-tehnika': 'fas fa-blender',
            'sport': 'fas fa-basketball-ball',
            'moda': 'fas fa-tshirt',
            'putovanje': 'fas fa-plane',
            'hrana': 'fas fa-utensils',
            'karte': 'fas fa-ticket-alt',
            'usluge': 'fas fa-tools',
            'default': 'fas fa-tag'
        };
        return iconMap[categorySlug] || iconMap.default;
    };

    // Funkcija za podkategorije po glavnoj kategoriji
    const getSubcategories = (categorySlug) => {
        const subcategoriesMap = {
            'tehnika': [
                { name: 'Laptopovi i računari', slug: 'laptopovi', icon: 'fas fa-laptop', count: 24 },
                { name: 'Mobilni telefoni', slug: 'telefoni', icon: 'fas fa-mobile-alt', count: 18 },
                { name: 'Televizori', slug: 'televizori', icon: 'fas fa-tv', count: 12 },
                { name: 'Audio oprema', slug: 'audio', icon: 'fas fa-headphones', count: 8 },
                { name: 'Gaming konzole', slug: 'gaming', icon: 'fas fa-gamepad', count: 6 }
            ],
            'bela-tehnika': [
                { name: 'Frižideri', slug: 'frizideri', icon: 'fas fa-snowflake', count: 15 },
                { name: 'Mašine za veš', slug: 'masine-za-ves', icon: 'fas fa-tshirt', count: 10 },
                { name: 'Šporeti i rerne', slug: 'sporeti', icon: 'fas fa-fire', count: 8 },
                { name: 'Mašine za pranje sudova', slug: 'sudoperice', icon: 'fas fa-soap', count: 5 }
            ],
            'sport': [
                { name: 'Sportska obuća', slug: 'obuca', icon: 'fas fa-shoe-prints', count: 20 },
                { name: 'Sportska oprema', slug: 'oprema', icon: 'fas fa-dumbbell', count: 15 },
                { name: 'Fitnes oprema', slug: 'fitnes', icon: 'fas fa-running', count: 12 },
                { name: 'Sportski pribor', slug: 'pribor', icon: 'fas fa-table-tennis', count: 8 }
            ],
            'moda': [
                { name: 'Muška odeća', slug: 'muska-odeca', icon: 'fas fa-male', count: 25 },
                { name: 'Ženska odeća', slug: 'zenska-odeca', icon: 'fas fa-female', count: 30 },
                { name: 'Obuća', slug: 'obuca', icon: 'fas fa-shoe-prints', count: 18 },
                { name: 'Aksesoari', slug: 'aksesoari', icon: 'fas fa-gem', count: 12 }
            ],
            'default': [
                { name: 'Svi proizvodi', slug: 'all', icon: 'fas fa-th-large', count: 0 }
            ]
        };
        return subcategoriesMap[categorySlug] || subcategoriesMap.default;
    };

    const fetchCategoryData = async () => {
        try {
            setLoading(true);

            // PRIVREMENO: Mock podaci dok backend ne radi
            const mockCategory = {
                name: slug.charAt(0).toUpperCase() + slug.slice(1),
                description: `Najbolje akcije iz kategorije ${slug}`,
                icon: getCategoryIcon(slug)
            };

            const mockDeals = [
                {
                    _id: '1',
                    title: `Samsung 55" 4K UHD Smart TV - ${slug} kategorija`,
                    store: 'Tehnomanija',
                    price: 32999,
                    oldPrice: 54999,
                    discount: 40,
                    image: 'https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=TV',
                    category: slug,
                    votes: 42,
                    commentsCount: 12,
                    link: '#',
                    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
                },
                {
                    _id: '2',
                    title: `iPhone 15 Pro Max 256GB - ${slug}`,
                    store: 'iStyle',
                    price: 145999,
                    oldPrice: 159999,
                    discount: 9,
                    image: 'https://via.placeholder.com/200x150/FF6B6B/FFFFFF?text=iPhone',
                    category: slug,
                    votes: 89,
                    commentsCount: 34,
                    link: '#',
                    validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000)
                },
                {
                    _id: '3',
                    title: `Nike Air Max 270 - Sportske patike - ${slug}`,
                    store: 'Sport Vision',
                    price: 12999,
                    oldPrice: 17999,
                    discount: 28,
                    image: 'https://via.placeholder.com/200x150/4ECDC4/FFFFFF?text=Nike',
                    category: slug,
                    votes: 56,
                    commentsCount: 18,
                    link: '#',
                    validUntil: new Date(Date.now() + 72 * 60 * 60 * 1000)
                },
                {
                    _id: '4',
                    title: `BOSCH frižider - A++ energetska klasa - ${slug}`,
                    store: 'Gigatron',
                    price: 65999,
                    oldPrice: 82999,
                    discount: 20,
                    image: 'https://via.placeholder.com/200x150/45B7D1/FFFFFF?text=Frizider',
                    category: slug,
                    votes: 23,
                    commentsCount: 7,
                    link: '#',
                    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
                },
                {
                    _id: '5',
                    title: `Dell XPS 13 laptop - 16GB RAM, 512GB SSD - ${slug}`,
                    store: 'Winwin',
                    price: 124999,
                    oldPrice: 149999,
                    discount: 17,
                    image: 'https://via.placeholder.com/200x150/96CEB4/FFFFFF?text=Laptop',
                    category: slug,
                    votes: 67,
                    commentsCount: 29,
                    link: '#',
                    validUntil: new Date(Date.now() + 36 * 60 * 60 * 1000)
                }
            ];

            setCategory(mockCategory);
            setDeals(mockDeals);

            const popular = mockDeals
                .sort((a, b) => (b.votes || 0) - (a.votes || 0))
                .slice(0, 5);
            setPopularDeals(popular);

        } catch (error) {
            console.error('Error fetching category:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubcategoryClick = (subcategorySlug) => {
        setActiveSubcategory(subcategorySlug);
        // Ovdje bi se dodala logika za filtriranje deal-ova po podkategoriji
        console.log('Odabrana podkategorija:', subcategorySlug);
    };

    if (loading) {
        return (
            <div className="category-page">
                <Header />
                <div className="loading">Učitavam kategoriju...</div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="category-page">
                <Header />
                <div className="error">Kategorija nije pronađena</div>
            </div>
        );
    }

    const subcategories = getSubcategories(slug);

    return (
        <div className="category-page">


            {/* BREADCRUMB */}
            <div className="breadcrumb">
                <div className="container">
                    <Link to="/" className="breadcrumb-link">Početna</Link>
                    <span className="breadcrumb-separator">&gt;</span>
                    <span className="breadcrumb-current">{category.name}</span>
                </div>
            </div>

            {/* CATEGORY HEADER */}
            <div className="category-header">
                <div className="container">
                    <div className="category-title-container">
                        <h1 className="category-title">{category.name}</h1>
                        <div className="category-icon">
                            <i className={category.icon}></i>
                        </div>
                    </div>
                    <p className="category-description">{category.description}</p>
                </div>
            </div>

            <div className="category-content">
                <div className="container">
                    <div className="category-layout">
                        {/* LEVI SIDEBAR SA PODEKATEGORIJAMA */}
                        <div className="category-sidebar">
                            <div className="sidebar-section">
                                <h3 className="subcategories-title">Podkategorije</h3>
                                <div className="subcategories-list">
                                    <button
                                        className={`subcategory-item ${activeSubcategory === 'all' ? 'active' : ''}`}
                                        onClick={() => handleSubcategoryClick('all')}
                                    >
                                        <div className="subcategory-icon">
                                            <i className="fas fa-th-large"></i>
                                        </div>
                                        <div className="subcategory-info">
                                            <span className="subcategory-name">Sve {category.name}</span>
                                            <span className="product-count">({deals.length})</span>
                                        </div>
                                    </button>
                                    {subcategories.map((subcat) => (
                                        <button
                                            key={subcat.slug}
                                            className={`subcategory-item ${activeSubcategory === subcat.slug ? 'active' : ''}`}
                                            onClick={() => handleSubcategoryClick(subcat.slug)}
                                        >
                                            <div className="subcategory-icon">
                                                <i className={subcat.icon}></i>
                                            </div>
                                            <div className="subcategory-info">
                                                <span className="subcategory-name">{subcat.name}</span>
                                                <span className="product-count">({subcat.count})</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* GLAVNI SADRŽAJ */}
                        <main className="category-main">
                            <div className="results-header">
                                <h2>Rezultati za "{category.name}"</h2>
                                <div className="results-count">
                                    {deals.length} proizvoda
                                </div>
                            </div>

                            <div className="category-deals-grid">
                                {deals.map(deal => (
                                    <Card key={deal._id} deal={deal} />
                                ))}
                            </div>

                            {deals.length === 0 && (
                                <div className="no-results">
                                    <p>Nema proizvoda u ovoj kategoriji.</p>
                                </div>
                            )}
                        </main>

                        {/* DESNI SIDEBAR */}
                        <aside className="right-sidebar">
                            <div className="sidebar-widget">
                                <h3>Popularne Akcije</h3>
                                <div className="popular-deals-list">
                                    {popularDeals.map(deal => (
                                        <div key={deal._id} className="popular-deal-item">
                                            <div className="popular-deal-content">
                                                <div className="popular-deal-image">
                                                    <img
                                                        src={deal.image}
                                                        alt={deal.title}
                                                        onError={(e) => {
                                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjN0Y4QzhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5OTyBJTUc8L3RleHQ+Cjwvc3ZnPgo=';
                                                            e.target.style.backgroundColor = '#f8f9fa';
                                                            e.target.style.border = '1px solid #eaeaea';
                                                        }}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="popular-deal-info">
                                                    <h4>{deal.title.length > 50 ? deal.title.substring(0, 50) + '...' : deal.title}</h4>
                                                    <div className="popular-deal-prices">
                                                        <span className="current-price">{deal.price?.toLocaleString()} RSD</span>
                                                        {deal.oldPrice && (
                                                            <span className="original-price">{deal.oldPrice?.toLocaleString()} RSD</span>
                                                        )}
                                                    </div>
                                                    <div className="popular-deal-meta">
                                                        <span className="votes">
                                                            <i className="fas fa-fire"></i>
                                                            {deal.votes || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-widget">
                                <h3>Preporučeno</h3>
                                <div className="ads-container">
                                    <div className="ad-item">
                                        <div className="ad-content">
                                            <i className="fas fa-gem"></i>
                                            <span>Premium Ponude</span>
                                        </div>
                                    </div>
                                    <div className="ad-item">
                                        <div className="ad-content">
                                            <i className="fas fa-bolt"></i>
                                            <span>Ekskluzivni Popusti</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;