// scripts/seedCategories.js
const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categoriesData = [
    {
        name: 'Tehnika',
        slug: 'tehnika',
        icon: 'fas fa-laptop',
        description: 'Sve iz sveta tehnologije i elektronike',
        bannerImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop',
        subcategories: [
            { name: 'Računari i Komponente', slug: 'racunari-komponente', icon: 'fas fa-desktop', productCount: 156 },
            { name: 'Laptopovi', slug: 'laptopovi', icon: 'fas fa-laptop', productCount: 89 },
            { name: 'Mobilni Telefoni', slug: 'mobilni-telefoni', icon: 'fas fa-mobile-alt', productCount: 234 },
            { name: 'Tableti', slug: 'tableti', icon: 'fas fa-tablet-alt', productCount: 67 },
            { name: 'Monitori', slug: 'monitori', icon: 'fas fa-tv', productCount: 45 },
            { name: 'Slušalice', slug: 'slusalice', icon: 'fas fa-headphones', productCount: 78 },
            { name: 'Pametni Satovi', slug: 'pametni-satovi', icon: 'fas fa-clock', productCount: 34 },
            { name: 'Gaming', slug: 'gaming', icon: 'fas fa-gamepad', productCount: 112 },
            { name: 'Mrežna Oprema', slug: 'mrežna-oprema', icon: 'fas fa-wifi', productCount: 23 },
            { name: 'Printeri i Skeneri', slug: 'printeri-skeneri', icon: 'fas fa-print', productCount: 41 }
        ],
        productCount: 879
    },
    {
        name: 'Bela Tehnika',
        slug: 'bela-tehnika',
        icon: 'fas fa-temperature-low',
        description: 'Kućni aparati i bela tehnika',
        bannerImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=400&fit=crop',
        subcategories: [
            { name: 'Frižideri', slug: 'frizideri', icon: 'fas fa-snowflake', productCount: 67 },
            { name: 'Veš Mašine', slug: 'ves-masine', icon: 'fas fa-tshirt', productCount: 89 },
            { name: 'Mašine za Sudove', slug: 'masine-za-sudove', icon: 'fas fa-hand-sparkles', productCount: 45 },
            { name: 'Šporeti i Rerne', slug: 'sporeti-rerne', icon: 'fas fa-fire', productCount: 78 },
            { name: 'Aspiratori', slug: 'aspiratori', icon: 'fas fa-wind', productCount: 23 },
            { name: 'Zamrzivači', slug: 'zamrzivaci', icon: 'fas fa-icicles', productCount: 34 },
            { name: 'Mašine za Ves', slug: 'masine-za-ves', icon: 'fas fa-tshirt', productCount: 56 }
        ],
        productCount: 392
    },
    {
        name: 'Sport',
        slug: 'sport',
        icon: 'fas fa-running',
        description: 'Sportska oprema i rekviziti',
        bannerImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
        subcategories: [
            { name: 'Sportska Odeća', slug: 'sportska-odeca', icon: 'fas fa-tshirt', productCount: 145 },
            { name: 'Sportska Obuća', slug: 'sportska-obuca', icon: 'fas fa-shoe-prints', productCount: 167 },
            { name: 'Fitness Oprema', slug: 'fitness-oprema', icon: 'fas fa-dumbbell', productCount: 89 },
            { name: 'Bicikli', slug: 'bicikli', icon: 'fas fa-bicycle', productCount: 45 },
            { name: 'Loptovi', slug: 'loptovi', icon: 'fas fa-basketball-ball', productCount: 67 },
            { name: 'Ribolov', slug: 'ribolov', icon: 'fas fa-fish', productCount: 34 },
            { name: 'Kampovanje', slug: 'kampovanje', icon: 'fas fa-campground', productCount: 78 }
        ],
        productCount: 625
    },
    {
        name: 'Moda',
        slug: 'moda',
        icon: 'fas fa-tshirt',
        description: 'Odeća, obuća i modni dodaci',
        bannerImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
        subcategories: [
            { name: 'Muška Odeća', slug: 'muska-odeca', icon: 'fas fa-male', productCount: 234 },
            { name: 'Ženska Odeća', slug: 'zenska-odeca', icon: 'fas fa-female', productCount: 345 },
            { name: 'Obuća', slug: 'obuca', icon: 'fas fa-shoe-prints', productCount: 189 },
            { name: 'Torbe i Rančevi', slug: 'torbe-rancevi', icon: 'fas fa-briefcase', productCount: 67 },
            { name: 'Nakit', slug: 'nakit', icon: 'fas fa-gem', productCount: 89 },
            { name: 'Satovi', slug: 'satovi', icon: 'fas fa-clock', productCount: 45 },
            { name: 'Naočare', slug: 'naocare', icon: 'fas fa-glasses', productCount: 23 }
        ],
        productCount: 992
    },
    {
        name: 'Putovanje',
        slug: 'putovanje',
        icon: 'fas fa-plane',
        description: 'Aranžmani, smeštaj i turističke usluge',
        bannerImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop',
        subcategories: [
            { name: 'Avionske Karte', slug: 'avionske-karte', icon: 'fas fa-plane', productCount: 567 },
            { name: 'Hoteli', slug: 'hoteli', icon: 'fas fa-hotel', productCount: 789 },
            { name: 'Putno Osiguranje', slug: 'putno-osiguranje', icon: 'fas fa-shield-alt', productCount: 45 },
            { name: 'Turističke Ture', slug: 'turisticke-ture', icon: 'fas fa-map-marked-alt', productCount: 67 },
            { name: 'Izleti', slug: 'izleti', icon: 'fas fa-bus', productCount: 89 },
            { name: 'Ski Aranžmani', slug: 'ski-aranžmani', icon: 'fas fa-snowboarding', productCount: 34 }
        ],
        productCount: 1591
    }
];

async function seedCategories() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Obriši postojeće kategorije
        await Category.deleteMany({});
        console.log('🗑️ Obrisane postojeće kategorije');

        // Dodaj nove kategorije
        await Category.insertMany(categoriesData);
        console.log('✅ Kategorije uspešno dodane u bazu');

        // Prikaži statistiku
        const categories = await Category.find();
        console.log(`📊 Ukupno kategorija: ${categories.length}`);

        let totalSubcategories = 0;
        categories.forEach(cat => {
            totalSubcategories += cat.subcategories.length;
            console.log(`   ${cat.name}: ${cat.subcategories.length} podkategorija`);
        });

        console.log(`📊 Ukupno podkategorija: ${totalSubcategories}`);

    } catch (error) {
        console.error('❌ Greška pri seedovanju kategorija:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB konekcija zatvorena');
    }
}

seedCategories();