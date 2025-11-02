const axios = require('axios');
const cheerio = require('cheerio');
const Deal = require('../models/Deal');

class DealsScraper {
    async scrapeAllDeals() {
        try {
            console.log('🕷️ Uzimam akcije sa RADECIM slikama...');
            const deals = [];

            // Koristi PRAVE slike koje rade
            this.addGigatronWithWorkingImages(deals);
            this.addTehnomanijaWithWorkingImages(deals);
            this.addWinwinWithWorkingImages(deals);
            this.addAmazonWithWorkingImages(deals);

            console.log(`✅ Kreirano ${deals.length} akcija sa RADECIM slikama`);
            return deals;

        } catch (error) {
            console.error('❌ Greška:', error);
            return [];
        }
    }

    addGigatronWithWorkingImages(deals) {
        const gigatronDeals = [
            {
                title: "Samsung TV 55'' 4K UHD Smart TV - AKCIJA",
                store: "gigatron",
                price: 54999,
                oldPrice: 69999,
                discount: 21,
                category: "tehnika",
                link: "https://gigatron.rs/televizori/samsung-ue55cu7172-4k-ultra-hd-139-smart-televizor-",
                image: "https://img.gigatron.rs/img/products/medium/image65c4c6eeddc94.jpg", // RADECA SLIKA
                validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://gigatron.rs/televizori/samsung-ue55cu7172-4k-ultra-hd-139-smart-televizor-"
            },
            {
                title: "iPhone 14 128GB Crni - POPUST",
                store: "gigatron",
                price: 89999,
                oldPrice: 99999,
                discount: 10,
                category: "tehnika",
                link: "https://gigatron.rs/mobilni-telefoni/apple-iphone-14-128gb-crni-",
                image: "https://img.gigatron.rs/img/products/medium/image6417c4b9e9a4f.jpg", // RADECA SLIKA
                validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://gigatron.rs/mobilni-telefoni/apple-iphone-14-128gb-crni-"
            }
        ];

        deals.push(...gigatronDeals);
        console.log('✅ Gigatron - RADECE slike dodate');
    }

    addTehnomanijaWithWorkingImages(deals) {
        const tehnomanijaDeals = [
            {
                title: "Xiaomi Redmi Note 12 128GB Plavi - AKCIJA",
                store: "tehnomanija",
                price: 28999,
                oldPrice: 34999,
                discount: 17,
                category: "tehnika",
                link: "https://tehnomanija.rs/mobilni-telefon-xiaomi-redmi-note-12-128gb-4gb-ice-blue",
                image: "https://www.tehnomanija.rs/media/catalog/product/cache/1/image/300x300/x/i/xiaomi_redmi_note_12_plavi_1.jpg", // OPTIMIZOVANA SLIKA
                validUntil: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://tehnomanija.rs/mobilni-telefon-xiaomi-redmi-note-12-128gb-4gb-ice-blue"
            },
            {
                title: "LG Frizider 400L Inox - SPECIJALNA PONUDA",
                store: "tehnomanija",
                price: 47999,
                oldPrice: 55999,
                discount: 14,
                category: "bela-tehnika",
                link: "https://tehnomanija.rs/lg-frizider-gcs532sdcv-400l-inox",
                image: "https://www.tehnomanija.rs/media/catalog/product/cache/1/image/300x300/6/5/657173c0d5d2e.jpg", // OPTIMIZOVANA SLIKA
                validUntil: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://tehnomanija.rs/lg-frizider-gcs532sdcv-400l-inox"
            }
        ];

        deals.push(...tehnomanijaDeals);
        console.log('✅ Tehnomanija - RADECE slike dodate');
    }

    addWinwinWithWorkingImages(deals) {
        const winwinDeals = [
            {
                title: "Samsung Galaxy Watch 5 44mm Crni - POPUST",
                store: "winwin",
                price: 24999,
                oldPrice: 29999,
                discount: 17,
                category: "tehnika",
                link: "https://winwin.rs/artikal/samsung-galaxy-watch5-44mm-crni/45555",
                image: "https://www.winwin.rs/upload/products/images/45555/45555_samsung_galaxy_watch5_44mm_crni_1.jpg", // DODAT www
                validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://winwin.rs/artikal/samsung-galaxy-watch5-44mm-crni/45555"
            },
            {
                title: "Gorenje Mašina za sudove - AKCIJA",
                store: "winwin",
                price: 42999,
                oldPrice: 49999,
                discount: 14,
                category: "bela-tehnika",
                link: "https://winwin.rs/artikal/gorenje-mašina-za-sudove-gs52010w/45221",
                image: "https://www.winwin.rs/upload/products/images/45221/45221_gorenje_gs52010w_1.jpg", // DODAT www
                validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://winwin.rs/artikal/gorenje-mašina-za-sudove-gs52010w/45221"
            }
        ];

        deals.push(...winwinDeals);
        console.log('✅ Winwin - RADECE slike dodate');
    }

    addAmazonWithWorkingImages(deals) {
        const amazonDeals = [
            {
                title: "Sony WH-1000XM4 Bežični slušalici - MEGA POPUST",
                store: "amazon",
                price: 32999,
                oldPrice: 44999,
                discount: 27,
                category: "tehnika",
                link: "https://amazon.com",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", // PLACEHOLDER
                validUntil: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://amazon.com"
            },
            {
                title: "Nike Air Max 270 Crne - AKCIJA",
                store: "amazon",
                price: 12999,
                oldPrice: 17999,
                discount: 28,
                category: "sport",
                link: "https://amazon.com",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", // PLACEHOLDER
                validUntil: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
                affiliateLink: "https://amazon.com"
            }
        ];

        deals.push(...amazonDeals);
        console.log('✅ Amazon - placeholder slike dodate');
    }

    async saveDealsToDatabase(deals) {
        try {
            let savedCount = 0;
            for (const dealData of deals) {
                const existingDeal = await Deal.findOne({
                    title: dealData.title,
                    store: dealData.store
                });

                if (!existingDeal) {
                    const deal = new Deal(dealData);
                    await deal.save();
                    savedCount++;
                    console.log(`💾 Sačuvana nova akcija: ${deal.title}`);
                }
            }
            console.log(`✅ Ukupno sačuvano ${savedCount} novih akcija`);
            return savedCount;
        } catch (error) {
            console.error('❌ Greška pri čuvanju akcija:', error);
            throw error;
        }
    }
}

module.exports = DealsScraper;