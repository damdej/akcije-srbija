### 🔧 Tehnické Detalje:

- **Container širina**: 1400px (Home), 1200px (CategoryPage)
- **Kartice**: fiksne 200px širine
- **Grid**: Home (5 kolona), CategoryPage (3 kolone)
- **Responsive**: breakpointi u globals.css varijablama

## Sledeći Koraci za Razvoj:

### 1. AUTENTIFIKACIJA (Prioritet)

- [ ] JWT token sistem
- [ ] Login/Register komponente
- [ ] Protected rute
- [ ] Korisnički kontekst
- [ ] Backend auth endpointi

### 2. NAPREDNA PRETRAGA

- [ ] Full-text search
- [ ] Filteri po cenovnom rangu
- [ ] Filteri po kategorijama
- [ ] Sortiranje (datum, cena, popularnost)

### 3. KORISNIČKE FUNKCIONALNOSTI

- [ ] Omiljene ponude
- [ ] Istorija pregleda
- [ ] Korisnički profil
- [ ] Notifikacije

### 4. PERFORMANSE

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
- Potrebno proširiti za autentifikaciju

---

**Git Repozitorijum**: https://github.com/damdej/akcije-srbija
**Poslednji Commit**: CSS reorganizacija završena
