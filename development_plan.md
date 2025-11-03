# Akcije Srbija - Development Plan

## Trenutno Stanje (CSS Reorganizacija Završena)

### ✅ Završeno:

- Centralni CSS sistem u `src/styles/globals.css`
- CSS varijable za boje, fontove, spacing, border-radius
- Svi komponentni CSS fajlovi ažurirani da koriste varijable
- Home page: 5 kartica od 200px širine u containeru od 1400px
- Category page: 3 kartice od 200px širine sa `category-deals-grid` klasom
- Header crne boje cele širine na svim stranicama
- Slickdeals.css uklonjen i zamenjen modularnim pristupom

### 🎯 CSS Struktura:

### 🔧 Tehnické Detalje:

- **Container širina**: 1400px (Home), 1200px (CategoryPage)
- **Kartice**: fiksne 200px širine
- **Grid**: Home (5 kolona), CategoryPage (3 kolone)
- **Responsive**: breakpointi u globals.css varijablama

## Sledeći Koraci za Razvoj:

### 1. FOOTER KOMPONENTA (Novo)

- [ ] Kreirati Footer komponentu
- [ ] Dodati linkove i informacije
- [ ] Responsive dizajn
- [ ] Dodati na sve stranice

### 2. PAGINATION (Novo)

- [ ] Pagination komponenta
- [ ] Integracija sa Home i Category stranama
- [ ] Backend podrška za paginaciju
- [ ] Responsive dizajn

### 3. AUTENTIFIKACIJA (Prioritet)

- [ ] JWT token sistem
- [ ] Login/Register komponente
- [ ] Protected rute
- [ ] Korisnički kontekst
- [ ] Backend auth endpointi

### 4. NAPREDNA PRETRAGA

- [ ] Full-text search
- [ ] Filteri po cenovnom rangu
- [ ] Filteri po kategorijama
- [ ] Sortiranje (datum, cena, popularnost)

### 5. KORISNIČKE FUNKCIONALNOSTI

- [ ] Omiljene ponude
- [ ] Istorija pregleda
- [ ] Korisnički profil
- [ ] Notifikacije

### 6. PERFORMANSE

- [ ] Lazy loading slika
- [ ] Infinite scrolling
- [ ] Caching strategija

## Važne Napomene:

### CSS Konvencije:

- Uvek koristiti CSS varijable iz `globals.css`
- Koristiti utility klase kada je moguće
- Responsive breakpointi: --mobile, --tablet, --desktop

### Komponente:

- Home page koristi `.deals-grid`
- Category page koristi `.category-deals-grid`
- Header je fiksiran za sve stranice

### Backend:

- Trenutno radi osnovni CRUD za ponude
- Potrebno proširiti za autentifikaciju i paginaciju

---

**Git Repozitorijum**: https://github.com/damdej/akcije-srbija
**Poslednji Commit**: CSS reorganizacija završena
