// backend/server.js - OSNOVNI SERVER
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Osnovna ruta
app.get('/', (req, res) => {
    res.json({
        message: 'AkcijeSrbija API radi! 🎉',
        version: '1.0.0'
    });
});

// Ruta za akcije
app.get('/api/deals', (req, res) => {
    // PRIVREMENO - vraćamo testne podatke
    const testDeals = [
        {
            id: 1,
            name: 'Samsung TV 55"',
            price: '49.999 RSD',
            oldPrice: '64.999 RSD',
            discount: '23%',
            store: 'Gomex',
            category: 'tehnika',
            link: '#',
            image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300'
        },
        {
            id: 2,
            name: 'iPhone 14 Pro',
            price: '125.999 RSD',
            oldPrice: '149.999 RSD',
            discount: '16%',
            store: 'WinWin',
            category: 'telefoni',
            link: '#',
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300'
        },
        {
            id: 3,
            name: 'Sony PlayStation 5',
            price: '79.999 RSD',
            oldPrice: '89.999 RSD',
            discount: '11%',
            store: 'Compy',
            category: 'igre',
            link: '#',
            image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300'
        },
        {
            id: 4,
            name: 'Dell Laptop',
            price: '89.999 RSD',
            oldPrice: '99.999 RSD',
            discount: '10%',
            store: 'eProduct',
            category: 'laptopovi',
            link: '#',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300'
        }
    ];

    res.json(testDeals);
});

// Pokreni server
app.listen(PORT, () => {
    console.log(`🚀 Server radi na http://localhost:${PORT}`);
    console.log(`📊 API dostupan na: http://localhost:${PORT}/api/deals`);
});