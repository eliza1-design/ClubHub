# Analiza e Projektit 2: ClubHub Dinamik

## 1. Qëllimi

Ky projekt e zgjeron ClubHub-in ekzistues me një mini-aplikacion web për regjistrimin dhe organizimin e anëtarëve dhe klubeve. Përdoruesi do të mund të regjistrojë anëtarë, të krijojë klube, të lidhë anëtarët me klubet dhe të shohë listat përkatëse.

Ky dokument është vetëm analizë dhe propozim. Në këtë fazë nuk krijohet kod PHP, skemë SQL ose databazë.

## 2. Funksionalitetet kryesore

- Regjistrimi i një anëtari me emër, email dhe informacione bazë kontakti.
- Shfaqja e listës së anëtarëve të regjistruar.
- Krijimi dhe shfaqja e listës së klubeve.
- Lidhja e një anëtari ekzistues me një klub.
- Shfaqja e anëtarëve të një klubi të zgjedhur.
- Largimi i anëtarësimit të një personi nga një klub, pa e fshirë anëtarin nga sistemi ose nga klubet e tjera.
- Parandalimi i lidhjes së dyfishtë të të njëjtit anëtar me të njëjtin klub.
- Paraqitja e mesazheve të qarta pas veprimeve dhe kur nuk ka të dhëna.

Të dhënat do të ruhen në MySQL, prandaj listat dhe numrat nuk do të jenë më shembuj statikë si në faqen prezantuese.

## 3. Rrjedha e përdorimit

1. Përdoruesi hap pjesën e menaxhimit të ClubHub.
2. Nga menuja zgjedh **Anëtarët** për të regjistruar një anëtar ose për të parë listën ekzistuese.
3. Zgjedh **Klubet** për të krijuar një klub të ri ose për të parë klubet.
4. Nga një klub hap listën e anëtarëve të tij.
5. Për të shtuar anëtar në klub, zgjedh një anëtar të regjistruar dhe konfirmon veprimin.
6. Për ta larguar nga ai klub, përdor veprimin “Largo nga klubi”. Anëtari mbetet në listën e përgjithshme dhe në çdo klub tjetër ku është regjistruar.

## 4. Struktura teknike

- **PHP procedural:** çdo faqe PHP përmban përpunim të drejtpërdrejtë të formularit dhe paraqitjen e rezultatit. Nuk përdoren klasa, OOP, MVC, framework ose ORM.
- **MySQL:** ruan anëtarët, klubet dhe lidhjet ndërmjet tyre.
- **MySQLi procedural:** përdoret për lidhjen me MySQL. Për vlerat që vijnë nga formularët përdoren prepared statements për të shmangur ndërtimin e query-ve duke bashkuar tekstin drejtpërdrejt.
- **Bootstrap 5:** përdoret për navbar-in, formularët, tabelat, butonat dhe paraqitjen responsive të faqeve të menaxhimit. ClubHub ekzistues tashmë përdor Bootstrap dhe CSS-in e vet.
- **JavaScript:** nuk nevojitet për funksionet bazë; mund të përdoret vetëm nëse më vonë duhet një ndërveprim i vogël në ndërfaqe. Shtimi ose largimi i të dhënave kryhet nga PHP pas dërgimit të formularit.
- **Validimi:** fushat kontrollohen në PHP në server, edhe kur formulari ka validim bazë HTML.
- **Siguria bazë:** dalja e tekstit të futur nga përdoruesi escape-ohet para shfaqjes në HTML. Veprimet që ndryshojnë të dhënat dërgohen me `POST`, jo me link `GET`.

Faqja aktuale prezantuese (`index.html`, `style.css`, `script.js` dhe `images/`) mund të ruhet e pandryshuar. Aplikacioni i menaxhimit propozohet si pjesë e veçantë në folderin `app/`, që të mos prishet faqja ekzistuese dhe të jetë e lehtë për t'u hapur lokalisht në XAMPP.

## 5. Tabelat dhe fushat kryesore

### `members` — anëtarët

| Fusha | Qëllimi |
| --- | --- |
| `id` | Identifikues unik, numër që rritet automatikisht dhe çelës primar. |
| `full_name` | Emri dhe mbiemri i anëtarit; i detyrueshëm. |
| `email` | Email-i i anëtarit; i detyrueshëm dhe unik. |
| `phone` | Numër telefoni; opsional. |
| `created_at` | Data dhe ora e regjistrimit. |

### `clubs` — klubet

| Fusha | Qëllimi |
| --- | --- |
| `id` | Identifikues unik, numër që rritet automatikisht dhe çelës primar. |
| `name` | Emri i klubit; i detyrueshëm. |
| `category` | Kategoria, për shembull Teknologji, Sport ose Art. |
| `description` | Përshkrim i shkurtër; mund të jetë opsional. |
| `created_at` | Data dhe ora e krijimit. |

### `member_clubs` — anëtarësimet

| Fusha | Qëllimi |
| --- | --- |
| `member_id` | ID-ja e anëtarit dhe çelës i huaj te `members.id`. |
| `club_id` | ID-ja e klubit dhe çelës i huaj te `clubs.id`. |
| `joined_at` | Data dhe ora kur anëtari u bashkua me klubin. |

Kombinimi `member_id` + `club_id` duhet të jetë çelës primar i përbërë ose të ketë kufizim `UNIQUE`. Kjo nuk lejon që i njëjti person të regjistrohet dy herë në të njëjtin klub. Databaza duhet të përdorë InnoDB dhe karakterizimin `utf8mb4` për të ruajtur saktë tekstin shqip.

## 6. Relacionet ndërmjet tabelave

- Një anëtar mund të jetë anëtar i shumë klubeve.
- Një klub mund të ketë shumë anëtarë.
- Prandaj, `members` dhe `clubs` kanë relacion **shumë-me-shumë**.
- Tabela `member_clubs` e zgjidh këtë relacion me nga një rresht për çdo anëtarësim.
- `member_clubs.member_id` referon `members.id`; `member_clubs.club_id` referon `clubs.id`.

## 7. Skemë e thjeshtë tekstuale e databazës

```text
members
  id (PK)
  full_name
  email (UNIQUE)
  phone
  created_at
       1
       |
       | shumë anëtarësime
       v
member_clubs
  member_id (PK, FK -> members.id)
  club_id  (PK, FK -> clubs.id)
  joined_at
       ^
       | shumë anëtarësime
       |
       1
clubs
  id (PK)
  name
  category
  description
  created_at
```

`PK` do të thotë çelës primar, `FK` çelës i huaj. Çelësi primar i përbërë i `member_clubs` është `(member_id, club_id)`.

## 8. Si zgjidhet anëtarësimi në disa klube

Anëtari regjistrohet vetëm një herë në `members`. Çdo lidhje me klub ruhet veçmas në `member_clubs`. Për shembull, anëtari me ID `3` nëse është në klubet me ID `1` dhe `4`, ka dy rreshta lidhës:

```text
member_clubs
member_id | club_id
3         | 1
3         | 4
```

Për të shfaqur anëtarët e një klubi, PHP lexon rreshtat e atij klubi nga `member_clubs` dhe merr të dhënat e anëtarëve përkatës nga `members`. Për ta larguar një anëtar vetëm nga një klub, fshihet vetëm rreshti që përputhet me të dy ID-të në `member_clubs`. Nuk fshihet rreshti i anëtarit nga `members`.

## 9. Faqet dhe fajllat e propozuar

Struktura e propozuar ruan faqen ekzistuese dhe vendos mini-aplikacionin në `app/`:

```text
ClubHub/
├── index.html                 # Faqja prezantuese ekzistuese, e pandryshuar
├── style.css                  # Stilet ekzistuese
├── script.js                  # Ndërveprimet ekzistuese të faqes prezantuese
├── images/                    # Imazhet ekzistuese
├── app/
│   ├── index.php              # Hyrja/përmbledhja e mini-aplikacionit
│   ├── members.php            # Regjistrimi dhe lista e anëtarëve
│   ├── clubs.php              # Krijimi dhe lista e klubeve
│   ├── club_members.php       # Anëtarët, shtimi dhe largimi për një klub
│   ├── includes/
│   │   ├── db.php             # Lidhja e përbashkët me MySQL
│   │   ├── header.php         # Header/nav i përbashkët i aplikacionit
│   │   └── footer.php         # Footer i përbashkët
│   └── database.sql           # Skema fillestare për t'u importuar më vonë
└── PROJECT2_ANALYSIS.md       # Ky dokument
```

Faqet mund të përpunojnë formularët e tyre në të njëjtin fajll: për shembull, `members.php` pranon formularin me `POST`, validon dhe ruan anëtarin, pastaj shfaq listën. Kjo shmang fajlla shtesë për çdo veprim dhe e mban projektin të përshtatshëm për fillestarë. `club_members.php` pranon formularët për anëtarësim të ri dhe largimin e anëtarësimit.

`database.sql` është vetëm fajlli i propozuar për një fazë të ardhshme; nuk krijohet ose importohet në këtë fazë. Kredencialet lokale të databazës do të konfigurohen në `db.php` gjatë implementimit dhe nuk duhet të përmbajnë kredenciale reale të publikuara.

## 10. Rrjedha Browser → PHP → MySQL → PHP → Browser

1. **Browser → PHP:** përdoruesi hap një faqe, si `members.php`, ose dërgon formularin me `POST`.
2. **PHP:** merr vlerat e formularit, kontrollon fushat dhe përgatit query-n me prepared statement.
3. **PHP → MySQL:** dërgon query-n për regjistrimin, leximin ose ndryshimin e një rreshti anëtarësimi.
4. **MySQL → PHP:** databaza kthen rreshtat e kërkuar ose rezultatin e veprimit.
5. **PHP:** formon HTML me të dhënat dhe mesazhin e rezultatit; çdo tekst i përdoruesit escape-ohet para shfaqjes.
6. **PHP → Browser:** browser-i merr dhe paraqet faqen HTML të stiluar me Bootstrap.

## 11. Kriteret e pranimit

- [ ] Aplikacioni hapet lokalisht përmes XAMPP dhe lidhja PHP–MySQL funksionon.
- [ ] Mund të regjistrohet anëtar me emër dhe email të vlefshëm; fushat e pavlefshme japin mesazh të kuptueshëm.
- [ ] Email-i unik nuk lejon regjistrime të dyfishta të të njëjtit email.
- [ ] Mund të krijohet klub dhe të shfaqet në listën e klubeve.
- [ ] Një anëtar mund të lidhet me më shumë se një klub.
- [ ] Një klub mund të ketë disa anëtarë dhe faqja e tij shfaq vetëm anëtarët përkatës.
- [ ] I njëjti anëtar nuk mund të lidhet dy herë me të njëjtin klub.
- [ ] Largimi i anëtarit nga një klub fshin vetëm lidhjen për atë klub; anëtari dhe lidhjet e tij të tjera mbeten.
- [ ] Listat shfaqin gjendje bosh kur nuk ka ende anëtarë, klube ose anëtarësime.
- [ ] Formularët përdorin validim në server dhe veprimet që ndryshojnë të dhënat përdorin `POST`.
- [ ] Faqet bazë përdorin Bootstrap dhe funksionojnë në mobile dhe desktop.
- [ ] Faqja ekzistuese prezantuese vazhdon të jetë e paprekur.

## 12. Kufijtë e zgjidhjes

Për ta mbajtur projektin të vogël, kjo fazë nuk përfshin hyrje/llogari përdoruesish, role administratori, fshirje të anëtarëve apo klubeve, kërkim të avancuar, API, framework PHP, OOP, MVC, ORM ose funksione JavaScript jo të domosdoshme.
