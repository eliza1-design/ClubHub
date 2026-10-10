# Plani i Implementimit 2: ClubHub Dinamik

Ky plan bazohet vetëm në [PROJECT2_ANALYSIS.md](./PROJECT2_ANALYSIS.md). Ai përcakton rendin e implementimit për mini-aplikacionin PHP procedural me MySQL, mysqli procedural dhe Bootstrap. Nuk përfshin framework, OOP, MVC ose ORM.

## 1. Rendi i implementimit

1. Përgatitja e databazës lokale në XAMPP dhe tabelave `members`, `clubs` dhe `member_clubs`.
2. Krijimi i lidhjes procedurale me MySQL në një fajll të përbashkët.
3. Krijimi i header-it dhe footer-it të përbashkët me Bootstrap dhe navigimin mes faqeve të menaxhimit.
4. Implementimi i faqes së anëtarëve: ruajtja e anëtarit të ri dhe shfaqja e listës.
5. Implementimi i faqes së klubeve: ruajtja e klubit të ri dhe shfaqja e listës.
6. Implementimi i faqes së një klubi: shfaqja e anëtarëve të tij dhe formulari për të lidhur anëtarë ekzistues me klubin.
7. Shtimi i veprimit për të larguar vetëm lidhjen anëtar-klub.
8. Testimi i validimit, listave, lidhjeve dhe pamjes responsive.

Çdo formular që ndryshon të dhëna dërgohet me `POST`; pas ruajtjes mund të ridrejtohet te faqja përkatëse dhe të shfaqet një mesazh rezultati.

## 2. Databaza që duhet krijuar

Krijo një databazë të vetme, p.sh. `clubhub_db`, përmes phpMyAdmin. Përdor `utf8mb4` për mbështetjen e tekstit shqip dhe InnoDB për relacionet dhe çelësat e huaj.

Databaza përmban tri tabela:

### `members`

- `id` — çelës primar, rritet automatikisht.
- `full_name` — emri i plotë, i detyrueshëm.
- `email` — i detyrueshëm dhe unik.
- `phone` — opsional.
- `created_at` — data dhe ora e regjistrimit.

### `clubs`

- `id` — çelës primar, rritet automatikisht.
- `name` — i detyrueshëm.
- `category` — kategori si Teknologji, Sport ose Art.
- `description` — përshkrim opsional.
- `created_at` — data dhe ora e krijimit.

### `member_clubs`

- `member_id` — çelës i huaj që lidhet me `members.id`.
- `club_id` — çelës i huaj që lidhet me `clubs.id`.
- `joined_at` — data dhe ora e anëtarësimit.
- Çelës primar i përbërë `(member_id, club_id)` për të ndaluar lidhjen e dyfishtë të të njëjtit anëtar me të njëjtin klub.

Tabelat dhe databaza krijohen vetëm gjatë fazës së implementimit. Ky plan nuk krijon databazë apo fajll SQL.

## 3. Fajllat PHP dhe roli i tyre

Mini-aplikacioni vendoset në `app/`, pa ndryshuar faqen prezantuese ekzistuese.

| Fajlli | Roli |
| --- | --- |
| `app/index.php` | Faqja hyrëse e menaxhimit me lidhje drejt anëtarëve dhe klubeve. |
| `app/members.php` | Formulari për regjistrim dhe lista e anëtarëve. Përpunon ruajtjen me PHP procedural. |
| `app/clubs.php` | Formulari për krijim klubi dhe lista e klubeve. |
| `app/club_members.php` | Merr ID-në e klubit, shfaq anëtarët e tij, lidh anëtar ekzistues dhe largon anëtarësimin. |
| `app/includes/db.php` | Hap lidhjen me databazën përmes funksioneve procedurale `mysqli`. |
| `app/includes/header.php` | Hap strukturën HTML dhe paraqet navbar-in e përbashkët me Bootstrap. |
| `app/includes/footer.php` | Mbyll strukturën e faqes dhe përfshin burimet e nevojshme të Bootstrap-it. |

`app/database.sql` mund të krijohet më vonë për të ruajtur komandat fillestare të skemës, por nuk është i domosdoshëm për planin e faqeve PHP dhe nuk krijohet në këtë hap. Në të ardhmen, nëse krijohet, importohet nga phpMyAdmin.

## 4. Formularët që duhen

### Formulari i anëtarit — `members.php`

- Emri i plotë (`full_name`) — i detyrueshëm.
- Email (`email`) — i detyrueshëm dhe duhet të ketë format të vlefshëm.
- Telefoni (`phone`) — opsional.
- Buton “Regjistro anëtarin”.

### Formulari i klubit — `clubs.php`

- Emri i klubit (`name`) — i detyrueshëm.
- Kategoria (`category`) — tekst ose zgjedhje nga kategori të thjeshta.
- Përshkrimi (`description`) — opsional.
- Buton “Krijo klubin”.

### Formulari i anëtarësimit — `club_members.php`

- Klubi përcaktohet nga ID-ja e faqes së hapur.
- Zgjedhje nga anëtarët ekzistues, me ID-në e anëtarit si vlerë.
- Buton “Shto në klub”.

### Veprimi i largimit nga klubi — `club_members.php`

- Çdo anëtar në listën e klubit ka formular të vogël me `POST`.
- Formulari dërgon ID-në e anëtarit dhe ID-në e klubit aktual.
- Butoni “Largo nga klubi” heq vetëm anëtarësimin për atë çift ID-sh.

## 5. Si ruhet një anëtar

1. `members.php` merr të dhënat e formularit me `POST`.
2. PHP kontrollon që emri dhe email-i nuk janë bosh dhe që email-i ka format të vlefshëm.
3. PHP përdor një `mysqli` prepared statement procedural për të ruajtur `full_name`, `email` dhe `phone` në `members`.
4. Kufizimi unik i databazës parandalon email-et e përsëritura; PHP shfaq një mesazh të qartë nëse email-i ekziston.
5. Faqja rifreskohet/ridrejtohet dhe lista e anëtarëve lexohet nga databaza.

## 6. Si krijohet një klub

1. `clubs.php` merr `name`, `category` dhe `description` me `POST`.
2. PHP kontrollon që emri i klubit nuk është bosh.
3. PHP ruan fushat në `clubs` përmes prepared statement procedural.
4. Faqja shfaq mesazh suksesi dhe listën e klubeve të lexuar nga MySQL.

## 7. Si lidhet një anëtar me një ose më shumë klube

1. Përdoruesi hap `club_members.php` përmes lidhjes së klubit; ID-ja e klubit përdoret për të përcaktuar faqen.
2. Faqja shfaq një dropdown me anëtarët ekzistues.
3. Pas dërgimit me `POST`, PHP kontrollon që anëtari dhe klubi ekzistojnë.
4. PHP shton një rresht në `member_clubs` me `member_id`, `club_id` dhe `joined_at`.
5. Çelësi i përbërë `(member_id, club_id)` ndalon anëtarësimin e dyfishtë. Nëse lidhja ekziston, shfaqet mesazh informues.
6. Për t'u regjistruar në klube të tjera, i njëjti anëtar shtohet në rreshta të veçantë me `club_id` të ndryshëm. Nuk krijohet kopje e anëtarit në `members`.

## 8. Si shfaqen anëtarët e një klubi

`club_members.php` merr ID-në e klubit dhe përdor një `SELECT` me `JOIN` mes `member_clubs` dhe `members`. Rezultati paraqitet si tabelë Bootstrap me emrin, email-in, telefonin dhe veprimin “Largo nga klubi”. Nëse query-ja nuk kthen rreshta, faqja shfaq një mesazh se klubi ende nuk ka anëtarë.

## 9. Si largohet vetëm lidhja me klubin

1. Formulari “Largo nga klubi” dërgon me `POST` ID-në e klubit dhe ID-në e anëtarit.
2. PHP kontrollon që të dy ID-të janë vlera të vlefshme dhe që lidhja ekziston.
3. PHP ekzekuton `DELETE` mbi `member_clubs` vetëm për `member_id` dhe `club_id` përkatës.
4. Nuk ekzekutohet `DELETE` mbi `members`; anëtari mbetet në sistem dhe në klubet e tjera.
5. Faqja ridrejtohet te lista e anëtarëve të atij klubi dhe shfaqet mesazh konfirmimi.

## 10. Përdorimi i JavaScript-it

JavaScript nuk është i domosdoshëm për funksionet bazë. Mund të përdoret vetëm për një konfirmim të vogël para veprimit “Largo nga klubi”. Edhe nëse ky konfirmim përdoret, kontrolli dhe largimi real bëhen nga PHP pas dërgimit të formularit me `POST`.

Navbar-i responsive mund të përdorë Bootstrap bundle, sipas integrimit ekzistues të ClubHub. Nuk shtohen kërkim dinamik, AJAX ose funksione të tjera jashtë scope-it.

## 11. Checklist për testim

- [ ] Databaza krijohet dhe lidhet nga PHP përmes `mysqli`.
- [ ] Anëtar i vlefshëm regjistrohet dhe shfaqet në listë.
- [ ] Emri/email-i bosh ose email-i me format të pavlefshëm refuzohet me mesazh të kuptueshëm.
- [ ] Email-i i përsëritur parandalohet nga databaza dhe trajtohet nga PHP.
- [ ] Klub i vlefshëm krijohet dhe shfaqet në listë.
- [ ] Formulari nuk lejon krijimin e klubit pa emër.
- [ ] Anëtari mund të shtohet në një klub dhe në një klub të dytë pa u regjistruar përsëri.
- [ ] Anëtarët e shfaqur në faqen e klubit janë vetëm anëtarët e lidhur me atë klub.
- [ ] I njëjti anëtar nuk mund të lidhet dy herë me të njëjtin klub.
- [ ] Largimi heq anëtarësimin vetëm nga klubi i zgjedhur; anëtari dhe anëtarësimet e tjera mbeten.
- [ ] Klubet pa anëtarë dhe listat bosh paraqiten me mesazh të qartë.
- [ ] Vlerat e formularëve ruhen me prepared statements dhe teksti escape-ohet para shfaqjes.
- [ ] Veprimet që ndryshojnë të dhëna kryhen me `POST`.
- [ ] Faqet kryesore duken të përdorshme në mobile dhe desktop me Bootstrap.
