# Analiza e Projektit: ClubHub

## 1. Qëllimi i projektit

ClubHub është një faqe one-page për prezantimin dhe menaxhimin konceptual të klubeve dhe anëtarëve të tyre. Faqja do t'i ndihmojë nxënësit dhe studentët të zbulojnë klubet, të kuptojnë çfarë ofron secili dhe të gjejnë mënyrën për të marrë pjesë.

Versioni i parë do të jetë një prezantim statik, i ndërtuar vetëm me HTML5 dhe CSS3. Nuk do të përdorë Bootstrap, JavaScript, formularë me përpunim real apo funksione dinamike. Më vonë, projekti mund të përshtatet me Bootstrap dhe të bëhet responsive.

## 2. Audienca

- Nxënës dhe studentë që kërkojnë aktivitete jashtë mësimit.
- Anëtarë të klubeve që duan të shohin aktivitetet dhe komunitetin e tyre.
- Organizatorë ose mësues që duan t'i prezantojnë klubet në një vend të vetëm.

Gjuha dhe ndërfaqja duhet të jenë të qarta, miqësore dhe të kuptueshme edhe për vizitorët që nuk kanë përvojë me klube.

## 3. Seksionet e faqes

Faqja do të përmbajë këto seksione, në këtë renditje të propozuar:

1. Navbar
2. Hero
3. Rreth ClubHub
4. Klubet
5. Përfitimet
6. Si funksionon
7. Call to Action / Kontakti
8. Footer

Navbar-i do të ketë lidhje me ankorë drejt seksioneve të së njëjtës faqe. Lidhjet mund të përdorin `href` me ID-të e seksioneve dhe nuk kërkojnë JavaScript.

## 4. Përmbajtja e propozuar për secilin seksion

### Navbar

- Emri ose logoja tekstuale: **ClubHub**
- Lidhje: Kryefaqja, Rreth nesh, Klubet, Përfitimet, Si funksionon, Kontakti
- Një lidhje e dallueshme drejt seksionit të kontaktit, si “Bashkohu”

### Hero

- Titull i shkurtër që shpjegon vlerën, për shembull: “Gjej klubin tënd. Ndërto komunitetin tënd.”
- Përshkrim që paraqet ClubHub si pikënisje për zbulimin e klubeve dhe pjesëmarrjen në to.
- Buton kryesor “Eksploro klubet”, që të çon te seksioni i klubeve.
- Buton dytësor “Mëso më shumë”, që të çon te seksioni Rreth ClubHub.
- Ilustrim ose formë grafike opsionale, e realizueshme me CSS ose me një aset të thjeshtë.

### Rreth ClubHub

- Shpjegim i shkurtër se çfarë është ClubHub dhe për kë shërben.
- Theksim se klubet krijojnë hapësira për interesa të përbashkëta, bashkëpunim dhe zhvillim personal.
- Përmbajtje statike; nuk nevojitet pretendim se platforma kryen regjistrime ose menaxhim real në këtë fazë.

### Klubet

- Titull dhe hyrje që ftojnë vizitorin të eksplorojë interesat.
- Pesë cards shembull, për kategoritë e përshkruara në seksionin 5.
- Çdo card paraqet emrin e klubit, kategorinë, përshkrimin e shkurtër dhe numrin shembull të anëtarëve.
- Numrat shënohen si shembuj dhe nuk paraqiten si të dhëna të lidhura me një sistem real.

### Përfitimet

Një grup i shkurtër përfitimesh, secili me titull dhe përshkrim:

- **Zbulo interesa të reja:** gjej aktivitete që përputhen me interesat e tua.
- **Njihu me njerëz:** lidhu me bashkëmoshatarë që ndajnë pasione të ngjashme.
- **Mëso duke bërë:** zhvillo aftësi përmes projekteve dhe aktiviteteve praktike.
- **Bëhu pjesë e komunitetit:** kontribuo, bashkëpuno dhe ndaj ide.

### Si funksionon

Paraqitje e procesit në tri hapa të kuptueshëm:

1. **Eksploro** — shfleto klubet dhe përshkrimet e tyre.
2. **Zgjidh** — gjej klubin që përputhet me interesat e tua.
3. **Lidhu** — kontakto organizatorin ose ndiq udhëzimet e shkollës për t'u bashkuar.

Hapi i fundit duhet të shpjegohet si udhëzim informues, jo si veprim që faqja e kryen automatikisht.

### Call to Action / Kontakti

- Ftesë pozitive për të gjetur një klub ose për të nisur një klub të ri.
- Tekst orientues që tregon se si mund të kontaktohet organizatori, p.sh. përmes adresës së institucionit ose një personi përgjegjës.
- Nëse paraqitet një adresë ose lidhje kontakti, ajo duhet të jetë shembull ose të zëvendësohet me të dhëna reale të miratuara para publikimit.
- Pa formular funksional në versionin e parë statik.

### Footer

- Emri ClubHub dhe një përshkrim i shkurtër.
- Lidhje të përsëritura drejt seksioneve kryesore.
- Shënim i thjeshtë për të drejtat e autorit.
- Të dhënat sociale ose institucionale shtohen vetëm nëse janë të disponueshme dhe të miratuara.

## 5. Strukturën dhe informacionin e cards të klubeve

Çdo card do të ketë:

- **Emrin e klubit**
- **Kategorinë**
- **Përshkrim të shkurtër**
- **Numrin shembull të anëtarëve**

| Emri i klubit | Kategoria | Përshkrimi i shkurtër | Anëtarë (shembull) |
| --- | --- | --- | ---: |
| Klubi i Teknologjisë | Teknologji | Eksploro programimin, robotikën dhe idetë e reja digjitale përmes projekteve praktike. | 24 |
| Klubi i Sportit | Sport | Merr pjesë në aktivitete sportive, sfida ekipore dhe ushtrime për një mënyrë jetese aktive. | 32 |
| Klubi i Artit | Art | Krijo, eksperimento me teknika të ndryshme dhe ndaj punimet me komunitetin. | 18 |
| Klubi i Leximit | Lexim | Zbulo libra, diskuto personazhe dhe ndaje mendimin tënd në takime të klubit. | 15 |
| Klubi i Vullnetarizmit | Vullnetarizëm | Bashkëpuno në iniciativa që ndihmojnë shkollën dhe komunitetin lokal. | 21 |

Shifrat janë përmbajtje ilustruese dhe duhen zëvendësuar me të dhëna të sakta nëse faqja përdoret realisht. Për HTML semantik, cards mund të paraqiten si elementë `article` brenda një liste ose gridi.

## 6. Drejtimi vizual

- **Karakteri:** i pastër, modern, miqësor dhe energjik, pa u dukur si panel kompleks administrimi.
- **Ngjyrat:** sfond i hapur dhe neutral, tekst me kontrast të mirë dhe një ngjyrë kryesore e gjallë për butonat e theksimet. Paleta përfundimtare të mbahet e kufizuar dhe e njëtrajtshme.
- **Tipografia:** font sans-serif i lexueshëm; tituj të dallueshëm dhe paragrafë të shkurtër.
- **Cards:** hapësirë e bollshme, kënde të buta dhe hije të lehta, me hierarki të qartë të emrit, kategorisë dhe numrit të anëtarëve.
- **Kompozimi:** seksione të ndara qartë, hapësirë e mjaftueshme ndërmjet elementeve dhe thirrje për veprim të dukshme.
- **Aksesueshmëria bazë:** strukturë me elemente semantike HTML5, hierarki të rregullt titujsh, tekste alternative për imazhet dhe kontrast i lexueshëm.
- **Kufiri i versionit të parë:** dizajn për ekran të zakonshëm desktop/laptop, pa pretenduar ende përshtatje të plotë responsive; kjo do të trajtohet në fazën e Bootstrap-it.

## 7. Struktura e fajllave

Folderi i projektit është aktualisht bosh, përveç kësaj analize. Struktura e propozuar për implementimin e mëvonshëm është:

```text
ClubHub/
├── PROJECT_ANALYSIS.md
├── index.html
├── css/
│   └── style.css
└── images/
    └── (asetet vizuale, nëse nevojiten)
```

`index.html` do të mbajë përmbajtjen dhe strukturën semantike; `css/style.css` do të përmbajë paraqitjen vizuale. Folderi `images/` është opsional. Nuk propozohet fajll JavaScript në versionin e parë.

## 8. Hapat kryesorë të implementimit

1. Konfirmo tekstet, paletën e ngjyrave dhe çdo informacion kontakti që do të përdoret.
2. Krijo strukturën bazë të `index.html` me doctype HTML5, metadata dhe elementet semantike.
3. Ndërto seksionet sipas renditjes së përcaktuar dhe lidhjet e navigimit me ID.
4. Shto përmbajtjen tekstuale dhe pesë cards statike të klubeve.
5. Krijo `css/style.css` dhe përcakto tipografinë, ngjyrat, hapësirat, cards dhe gjendjet vizuale të lidhjeve e butonave.
6. Kontrollo faqen në shfletues në madhësi desktop/laptop dhe përmirëso lexueshmërinë e rrjedhën vizuale.
7. Kontrollo semantikën, lidhjet e ankorave, tekstet alternative dhe konsistencën e përmbajtjes.
8. Në një fazë të mëvonshme, përshtat paraqitjen për ekrane të ndryshme dhe migro dizajnin në Bootstrap.

## 9. Kriteret e përfundimit

- Faqja e implementuar ka të gjitha tetë seksionet e kërkuara, në renditje të kuptueshme.
- Navbar-i lundron te seksionet përkatëse përmes lidhjeve të brendshme.
- Seksioni i klubeve përmban pesë cards: Teknologji, Sport, Art, Lexim dhe Vullnetarizëm.
- Çdo card paraqet emrin, përshkrimin, kategorinë dhe një numër shembull anëtarësh.
- Përmbajtja është e qartë, e shkurtër dhe e përshtatshme për nxënës/studentë.
- Versioni i parë përdor vetëm HTML5 dhe CSS3; nuk ka Bootstrap ose JavaScript.
- Pamja është e pastër dhe e njëtrajtshme, me hierarki të lexueshme dhe thirrje për veprim të dallueshme.
- Elementet bazë semantike dhe lidhjet e navigimit funksionojnë; informacioni shembull nuk paraqitet si i dhënë real.
- Struktura mbetet e thjeshtë për fillestarë dhe e përgatitur për përshtatje të mëvonshme me Bootstrap dhe responsive design.

## 10. Zgjerimi i kërkesave për ndërveprim

Kërkesat e mëvonshme zgjeruan versionin fillestar statik. Për këtë zgjerim, JavaScript lejohet vetëm për ndërveprimet e listuara më poshtë; faqja vazhdon të mos përdorë Bootstrap, framework-e të jashtme, backend, PHP ose MySQL.

- Çdo card klubi ka një galeri lokale me tri fotografi, ndërrim automatik dhe kontrolle manuale.
- Fotografitë hapen në një lightbox me navigim para/prapa dhe mbyllje me buton ose tastin Escape.
- Butoni “Lexo më shumë” hap një dialog me përshkrim, vendndodhje, orar, kosto, aktivitete dhe fotografi shembull.
- Kërkimi sipas emrit, filtri i kategorisë dhe filtri i klubeve të preferuara rifreskojnë kartat pa ringarkim.
- Klubet e preferuara ruhen në `localStorage`.
- Navbar-i ndryshon pamje gjatë scroll-it, shënon seksionin aktiv dhe përdoren animacione të lehta të shfaqjes, hover-it dhe ndërveprimit.
- Vendndodhjet, oraret, kostot dhe të dhënat e anëtarëve mbeten qartësisht shembuj ilustrues.

Struktura aktuale e zgjeruar:

```text
ClubHub/
├── PROJECT_ANALYSIS.md
├── IMPLEMENTATION_PLAN.md
├── index.html
├── style.css
├── script.js
└── images/
    └── (fotot lokale për galeritë e klubeve)
```

## 11. Përditësime të përmbajtjes

- Katalogu i klubeve përfshin edhe **Muzikën** dhe **Shkencën**, secilin me fotografi lokale, numër ilustrues anëtarësh dhe detaje shembull.
- Është shtuar seksioni **Ekipi**, që shpjegon orientimin dhe ndihmën informative për zbulimin e klubeve. Për të dhëna përfundimtare, vizitorët drejtohen te organizatori ose shkolla.
- Seksioni i përfitimeve përdor mesazhe më tërheqëse, pa premtuar shërbime ose rezultate të garantuara.
- Seksioni Ekipi paraqet katër profile ilustrative me emër, rol në klub dhe një përshkrim të shkurtër të ndihmës së tyre; emrat nuk përfaqësojnë persona realë të konfirmuar.
- Kartat dekorative të Hero-it reagojnë lehtë kur preken ose fokusohen.
- Footer-i përfshin lidhjen “Në fillim” për t'u kthyer te kreu i faqes.
- Në Hero, pesë mini-kartat rrotullohen ngadalë rreth elementit qendror “Gjej vendin tënd”; animacioni respekton preferencën për lëvizje të reduktuar.
- Seksioni Klubet tregon fillimisht tri karta dhe përfshin kontrollin “Shiko më shumë klube” për të zgjeruar ose tkurrur listën. Kërkimi dhe filtrat përfshijnë të gjitha klubet.
- Lista shembull përmban shtatë klube: Teknologji, Sport, Art, Lexim, Vullnetarizëm, Muzikë dhe Shkencë.

## 12. Zgjerime vizuale dhe funksione interaktive

- Cards e klubeve paraqesin yje dhe një vlerësim numerik ilustrues; mund të renditen sipas vlerësimit, emrit ose rendit ilustrues të shtimit.
- Seksioni i statistikave tregon numrin e klubeve, shumën shembull të anëtarëve dhe numrin shembull të udhëheqësve. Numrat animohen kur seksioni hyn në viewport.
- Seksioni i veçantë **Klubet e tua të preferuara** pasqyron zgjedhjet e ruajtura në `localStorage`; vizitori mund t'i heqë aty.
- Dialogu i klubit ka veprimin **Ndaj klubin**, që kopjon një URL të drejtpërdrejtë për klubin dhe e hap sërish dialogun te marrësi.
- Njoftimet e shkurtra toast konfirmojnë ndryshimin e preferuarave dhe kopjimin e lidhjeve, ose tregojnë kur kopjimi dështon.
- Ngarkimi fillestar paraqet një animacion minimal; glassmorphism dhe gradientet dekorative përdoren me masë, duke ruajtur lexueshmërinë dhe lëvizjen e reduktuar.
- Vlerësimet, renditja e shtimit, statistikat, numrat e anëtarëve dhe profilet e ekipit janë shembuj ilustrues, jo të dhëna reale.
- Seksioni **Find Us** liston për secilin klub hapësirën, adresën dhe orarin shembull, me link “Get Directions” drejt kërkimit të adresës në Google Maps.
- Dialogu i detajeve përfshin një paraqitje vizuale të lokacionit dhe linkun për udhëzime; nuk përdoret API harte apo hartë e integruar.
- Adresa e përdorur për ilustrim është `Rruga e Studentëve 12, Prishtinë`; ajo dhe të gjitha hapësirat/oraret janë shembuj që duhet zëvendësuar e konfirmuar para përdorimit real.
