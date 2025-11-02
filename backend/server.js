const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const Deal = require('./models/Deal');
// Privremeno komentariši scraper ako postoji
// const DealsScraper = require('./scrapers/dealsScraper');
// const dealsScraper = new DealsScraper();

const app = express();

// POBOLJŠANI CORS MIDDLEWARE
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected!'))
    .catch(err => console.log('❌ MongoDB Error:', err));

// API RUTE
app.get('/api/health', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
        res.json({
            status: 'Server i baza rade!',
            timestamp: new Date(),
            db: dbStatus,
            message: 'SaaS aplikacija je živa! 🚀'
        });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// NOVA RUTA ZA BRISANJE
app.get('/api/clear', async (req, res) => {
    try {
        console.log('🗑️ Brisem celu bazu...');
        const result = await Deal.deleteMany({});
        console.log(`✅ Obrisano ${result.deletedCount} akcija`);
        res.json({
            success: true,
            message: `Baza obrisana! Obrisano: ${result.deletedCount} akcija`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('❌ Greška pri brisanju:', error);
        res.status(500).json({
            success: false,
            error: 'Greška pri brisanju baze'
        });
    }
});

// GET sve akcije
app.get('/api/deals', async (req, res) => {
    try {
        console.log('✅ /api/deals ruta pozvana!');
        const deals = await Deal.find({ isActive: true }).sort({ createdAt: -1 });
        console.log(`✅ Pronađeno ${deals.length} akcija`);
        res.json(deals);
    } catch (error) {
        console.error('❌ Greška pri učitavanju akcija:', error);
        res.status(500).json({ error: 'Greška pri učitavanju akcija' });
    }
});

// DELETE sve deal-ove
app.delete('/api/deals', async (req, res) => {
    try {
        console.log('🗑️ DELETE /api/deals pozvan');
        const result = await Deal.deleteMany({});
        console.log(`✅ Obrisano ${result.deletedCount} akcija`);
        res.json({
            success: true,
            message: `Svi deal-ovi obrisani! Obrisano: ${result.deletedCount}`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('❌ Greška pri brisanju deal-ova:', error);
        res.status(500).json({
            success: false,
            error: 'Greška pri brisanju deal-ova'
        });
    }
});

// Ruta za podnošenje nove ponude
app.post('/api/deals/submit', async (req, res) => {
    try {
        console.log('📥 Primljena nova ponuda:', req.body);

        const { title, store, price, oldPrice, link, image, category, description, dealExpiry } = req.body;

        // Provera obaveznih polja
        if (!title || !store || !price || !link || !category) {
            return res.status(400).json({
                error: 'Nedostaju obavezna polja: naziv, prodavac, cena, link, kategorija'
            });
        }

        // Izračunaj popust
        const discount = oldPrice && price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : 0;

        const deal = new Deal({
            title,
            store,
            price: Number(price),
            oldPrice: oldPrice ? Number(oldPrice) : null,
            discount,
            link,
            image: image || '',
            category,
            description: description || '',
            dealExpiry: dealExpiry || null,
            status: 'pending',
            isActive: false,
            submittedBy: 'anonymous',
            votes: { positive: 0, negative: 0 },
            commentsCount: 0
        });

        await deal.save();

        console.log('✅ Ponuda uspešno sačuvana u bazi:', deal._id);

        res.json({
            success: true,
            message: 'Ponuda uspešno podneta! Čeka odobrenje administratora.',
            dealId: deal._id
        });

    } catch (error) {
        console.error('❌ Greška pri čuvanju ponude:', error);
        res.status(500).json({
            error: 'Greška pri čuvanju ponude: ' + error.message
        });
    }
});

// Ruta za pregled svih ponuda na moderaciji
app.get('/api/deals/pending', async (req, res) => {
    try {
        const pendingDeals = await Deal.find({ status: 'pending' }).sort({ createdAt: -1 });
        console.log(`📋 Pronađeno ${pendingDeals.length} ponuda na čekanju`);
        res.json(pendingDeals);
    } catch (error) {
        console.error('❌ Greška pri učitavanju ponuda na čekanju:', error);
        res.status(500).json({ error: 'Greška pri učitavanju ponuda' });
    }
});

// Ruta za odobravanje ponude
app.patch('/api/deals/:id/approve', async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            {
                status: 'approved',
                isActive: true
            },
            { new: true }
        );

        if (!deal) {
            return res.status(404).json({ error: 'Ponuda nije pronađena' });
        }

        console.log(`✅ Ponuda odobrena: ${deal.title}`);

        res.json({
            success: true,
            message: 'Ponuda odobrena!',
            deal
        });
    } catch (error) {
        console.error('❌ Greška pri odobravanju:', error);
        res.status(500).json({ error: 'Greška pri odobravanju' });
    }
});

// Ruta za odbijanje ponude
app.patch('/api/deals/:id/reject', async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            {
                status: 'rejected',
                isActive: false
            },
            { new: true }
        );

        if (!deal) {
            return res.status(404).json({ error: 'Ponuda nije pronađena' });
        }

        console.log(`❌ Ponuda odbijena: ${deal.title}`);

        res.json({
            success: true,
            message: 'Ponuda odbijena.',
            deal
        });
    } catch (error) {
        console.error('❌ Greška pri odbijanju:', error);
        res.status(500).json({ error: 'Greška pri odbijanju' });
    }
});

// Test CORS rute
app.get('/api/test-cors', (req, res) => {
    res.json({ message: 'CORS radi!', timestamp: new Date() });
});

app.post('/api/test-cors', (req, res) => {
    console.log('Test CORS POST:', req.body);
    res.json({ message: 'POST CORS radi!', received: req.body });
});

// Ignoriši favicon zahteve
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server radi na portu ${PORT}`);
    console.log(`🌐 CORS podešen za: http://localhost:3000`);
});