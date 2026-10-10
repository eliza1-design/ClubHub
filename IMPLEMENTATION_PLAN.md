# Plani i Implementimit: ClubHub

Ky plan bazohet në [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md). Ai përshkruan versionin e parë statik të faqes; nuk është vetë implementimi.

## 1. Fajllat që do të krijohen

Gjatë implementimit të mëvonshëm:

- `index.html` — struktura dhe përmbajtja e faqes one-page.
- `css/style.css` — stilet e faqes.

Folderi `images/` dhe asetet brenda tij janë opsionalë vetëm nëse nevojiten ilustrime. Në këtë fazë, plani nuk kërkon fajll JavaScript ose ndonjë teknologji tjetër jashtë HTML5 dhe CSS3.

## 2. Struktura e propozuar e `index.html`

1. Deklarata HTML5 dhe elementi rrënjë `html`, me atributin e gjuhës shqipe.
2. `head` me kodimin e karaktereve, viewport-in, titullin e faqes dhe lidhjen me `css/style.css`.
3. `body` me:
   - `header` që përmban `nav` dhe lidhjet e navigimit.
   - `main` që përmban seksionet kryesore.
   - `footer` me përshkrimin e ClubHub, lidhjet dhe shënimin e të drejtave të autorit.

Çdo seksion kryesor do të ketë një `id` të dallueshëm, që lidhjet e navigimit dhe butonat mund ta përdorin si ankorë.

## 3. Seksionet dhe elementet semantike HTML

Në renditjen e faqes:

1. **Navbar:** `header`, `nav`, listë `ul` me elemente `li` dhe lidhje `a`. Emri ClubHub mund të jetë lidhje drejt fillimit të faqes.
2. **Hero:** `section` me titull kryesor `h1`, përshkrim `p` dhe lidhje `a` të stilizuara si butona për te Klubet dhe Rreth ClubHub.
3. **Rreth ClubHub:** `section` me `h2` dhe paragrafë `p` që përshkruajnë qëllimin e faqes.
4. **Klubet:** `section` me `h2`, tekst hyrës dhe listë `ul` me pesë `li`; çdo klub paraqitet si `article`.
5. **Përfitimet:** `section` me `h2` dhe listë `ul` me katër `li`; secili përfitim ka titull `h3` dhe përshkrim `p`.
6. **Si funksionon:** `section` me `h2` dhe listë të renditur `ol` me tri `li`, për hapat Eksploro, Zgjidh dhe Lidhu.
7. **Call to Action / Kontakti:** `section` me `h2`, tekst `p` dhe, nëse ka adresë kontakti të miratuar, lidhje `a`. Nuk do të përfshijë formular funksional.
8. **Footer:** `footer` me emrin dhe përshkrimin e shkurtër, navigim dytësor me `nav` dhe shënim për të drejtat e autorit.

Titujt do të përdorin hierarki të rregullt: një `h1` për faqen, pastaj `h2` për seksionet dhe `h3` për nëntitujt ose elementet përfitim.

## 4. Struktura e cards për klubet

Seksioni Klubet do të përdorë një listë semantike. Secili nga pesë elementet `li` do të përmbajë një `article` me:

- Emrin e klubit si `h3`.
- Kategorinë si tekst i dallueshëm.
- Përshkrimin e shkurtër si `p`.
- Numrin ilustrues të anëtarëve si tekst, me etiketë të qartë si “Anëtarë (shembull)”.

Klubet dhe numrat shembull:

| Emri | Kategoria | Anëtarë (shembull) |
| --- | --- | ---: |
| Klubi i Teknologjisë | Teknologji | 24 |
| Klubi i Sportit | Sport | 32 |
| Klubi i Artit | Art | 18 |
| Klubi i Leximit | Lexim | 15 |
| Klubi i Vullnetarizmit | Vullnetarizëm | 21 |

Përshkrimet do të përdorin tekstet përkatëse të përcaktuara në `PROJECT_ANALYSIS.md`. Numrat janë vetëm shembuj dhe nuk duhet të paraqiten si të dhëna reale.

## 5. Organizimi i `css/style.css`

Për ta mbajtur CSS-in të lehtë për t'u ndjekur, rregullat do të grupohen sipas kësaj radhe:

1. Rregullime bazë dhe stile të përgjithshme për elementet HTML.
2. Variabla CSS për ngjyrat, hapësirat, fontet dhe vlerat e përsëritura.
3. Stilet e përgjithshme të tekstit, lidhjeve dhe butonave.
4. Kontejnerët e përmbajtjes dhe hapësirat e përbashkëta të seksioneve.
5. Navbar-i.
6. Hero.
7. Rreth ClubHub.
8. Cards dhe rrjeti i klubeve.
9. Përfitimet dhe hapat “Si funksionon”.
10. Call to Action / Kontakti.
11. Footer.

Emrat e klasave do të jenë përshkrues dhe të qëndrueshëm. CSS-i do të kufizohet te paraqitja e versionit fillestar; përshtatja e plotë responsive planifikohet për fazën e ardhshme.

## 6. Qasja vizuale

### Tipografia

- Përdor një font sans-serif të lexueshëm.
- Dallo titujt nga paragrafët përmes madhësisë, peshës dhe hapësirës.
- Mbaji paragrafët të shkurtër dhe përdor kontrast të mirë mes tekstit dhe sfondit.

### Spacing

- Përdor vlera të përsëritura për padding dhe margin, mundësisht të ruajtura si variabla CSS.
- Lër hapësirë të mjaftueshme ndërmjet seksioneve, titujve, paragrafëve dhe kartave.
- Ruaj ritëm të njëtrajtshëm vizual në të gjithë faqen.

### Layout

- Përdor një kontejner për të kufizuar gjerësinë dhe për të rreshtuar përmbajtjen.
- Përdor Flexbox ose CSS Grid vetëm aty ku e bëjnë paraqitjen më të qartë, si navigimi ose rrjeti i kartave.
- Syno një paraqitje të pastër për desktop/laptop në versionin e parë; përshtatja e plotë responsive do të bëhet më vonë.

### Stilet sipas pjesëve

- **Navbar:** sfond i dallueshëm nga përmbajtja, logo tekstuale ClubHub dhe lidhje të renditura qartë; “Bashkohu” mund të marrë stilin e një butoni.
- **Hero:** titull i dukshëm, tekst i shkurtër dhe dy veprime të dallueshme; ilustrimi është opsional.
- **Cards:** sfond i pastër, padding i njëtrajtshëm, kënde të buta dhe hije e lehtë. Emri, kategoria, përshkrimi dhe numri i anëtarëve duhet të dallohen vizualisht.
- **Seksionet:** ndarje të qarta me hapësirë të mjaftueshme dhe tituj konsistentë; përdor sfond të lehtë alternativ vetëm nëse ndihmon orientimin.
- **Footer:** sfond dhe ngjyrë teksti me kontrast të mirë, përshkrim i shkurtër dhe lidhje dytësore të lexueshme.

## 7. Checklist për testim

- [ ] Faqja hapet nga `index.html` dhe ngarkon `css/style.css`.
- [ ] Të tetë pjesët janë të pranishme dhe në renditjen e planifikuar.
- [ ] Lidhjet e navbar-it dhe butonat e Hero-it të çojnë te seksionet e duhura.
- [ ] Shfaqen pesë klubet e kërkuara, secili me emër, kategori, përshkrim dhe numër shembull anëtarësh.
- [ ] Struktura e titujve dhe elementet semantike janë të kuptueshme.
- [ ] Teksti lexohet qartë dhe ka kontrast të mjaftueshëm.
- [ ] Cards, seksionet, navbar-i dhe footer-i kanë paraqitje të njëtrajtshme në madhësi desktop/laptop.
- [ ] Nuk është shtuar funksionalitet ose përmbajtje që lë të kuptohet se regjistrimi apo menaxhimi bëhet automatikisht.

## 8. Çfarë nuk duhet të shtohet

Në versionin e parë **nuk** duhet të shtohen:

- Bootstrap.
- JavaScript.
- PHP.
- MySQL.
- Backend ose API.

Faqja është statike dhe përdor vetëm HTML5 dhe CSS3. Formularët funksionalë, regjistrimi, menaxhimi real i anëtarëve dhe përshtatja e plotë responsive janë jashtë këtij hapi.

## 9. Shtesat e kërkuara më vonë

Kërkesat e mëvonshme zgjeruan kufirin e versionit fillestar dhe e lejuan JavaScript-in për veçoritë e ndërveprimit. Struktura e implementimit aktual bëhet:

```text
ClubHub/
├── PROJECT_ANALYSIS.md
├── IMPLEMENTATION_PLAN.md
├── index.html
├── style.css
├── script.js
└── images/
    └── (fotot lokale të klubeve)
```

- `index.html` ruan strukturën semantike, ndërsa lidh CSS-in dhe JavaScript-in me relative paths.
- `style.css` përmban stilimin e galerisë së cards, filtrave, butonave, animacioneve dhe dialogëve, krahas seksioneve ekzistuese.
- `script.js` menaxhon galeritë automatike/manuale, dialogun e detajeve, lightbox-in, ESC, filtrat, gjendjen aktive të navbar-it, scroll, animacionet dhe preferuarat.
- `images/` ruan lokalisht nga tri fotografi për secilin klub; faqja nuk kërkon libra ose stylesheet-e të jashtme.
- Detajet shtesë të vendndodhjes, orarit, kostos dhe aktiviteteve shënohen si shembuj.

### Checklist shtesë për ndërveprimet

- [ ] Secila galeri ndërron fotografinë automatikisht dhe pranon kontrolle manuale.
- [ ] Hover-i në fotografi shfaq overlay të lehtë; klikimi hap lightbox-in dhe navigimi me shigjeta funksionon.
- [ ] Dialogu “Lexo më shumë” tregon detajet shembull dhe mbyllet me X, klikim jashtë ose Escape.
- [ ] Kërkimi, kategoria, gjendja pa rezultate dhe filtri i preferuarave funksionojnë pa ringarkim.
- [ ] Preferuarat mbijetojnë rifreskimin e faqes përmes `localStorage`.
- [ ] Navbar-i reagon ndaj scroll-it dhe seksioni aktiv shënohet.
- [ ] Animacionet janë të lehta, me mbështetje për `prefers-reduced-motion`.
- [ ] Kartat shfaqin vlerësime ilustrative dhe renditja sipas vlerësimit, emrit ose rendit ilustrues të shtimit rifreskohet pa ringarkim.
- [ ] Numëruesit e statistikave animohen kur bëhen të dukshëm; shifrat jo reale etiketohen si shembuj.
- [ ] Seksioni i preferuarave sinkronizohet me `localStorage`, përfshirë pas rifreskimit dhe heqjen e një klubi.
- [ ] Veprimi Share kopjon lidhje të drejtpërdrejtë të klubit kur clipboard-i lejohet; toast-i konfirmon suksesin ose njofton dështimin.
- [ ] Loading overlay largohet vetë dhe animacionet respektojnë `prefers-reduced-motion`.
- [ ] Nuk janë shtuar Bootstrap, framework CSS, backend, PHP ose MySQL.

## 11. Përditësimet e përmbajtjes

- Shto kartat e Klubit të Muzikës dhe Klubit të Shkencës me foto lokale dhe të dhëna shembull.
- Përfshi kategoritë e reja në filtrin ekzistues.
- Shto seksionin Ekipi me orientim për zgjedhjen e klubeve dhe lidhje drejt kontaktit; mos shpik persona ose të dhëna institucionale.
- Paraqit katër profile shembull në seksionin Ekipi, secili me emër ilustrues, rol të lidhur me një klub dhe përshkrim të shkurtër; shënoji qartë si shembuj.
- Paraqit përfitimet me mesazhe tërheqëse dhe cards të qarta, pa pretendime të paverifikuara.
- Jep kartave të vogla të Hero-it reagim të butë në hover, prekje dhe fokus.
- Shto lidhjen e footer-it për t'u kthyer në fillim të faqes.
- Vendosi pesë kartat dekorative të Hero-it në orbitë të ngadaltë rreth mesazhit qendror; mbaji të lexueshme dhe respekto lëvizjen e reduktuar.
- Shfaq tri klubet e para si parazgjedhje dhe shto një buton për të zgjeruar/tkurrur listën e plotë; filtrimi dhe kërkimi duhet të gjejnë çdo klub.
- Mbaj listën e shtatë klubeve shembull: Teknologji, Sport, Art, Lexim, Vullnetarizëm, Muzikë dhe Shkencë.
- Shto vlerësime me yje të etiketuara qartë si ilustrime dhe renditje sipas vlerësimit, alfabetit ose rendit demonstrues të shtimit.
- Paraqit statistika shembull për klubet, anëtarët dhe ekipin; animoi numëruesit vetëm kur hyjnë në viewport.
- Krijo një seksion preferuarash të sinkronizuar me `localStorage`, me gjendje bosh dhe veprim për heqje.
- Shto kopjim të lidhjes së klubit nga dialogu, hapje me lidhje të drejtpërdrejtë dhe njoftime toast të ripërdorshme.
- Përdor gradient, transparencë dhe blur me masë; shto loading të shkurtër, hyrje graduale të kartave dhe respektim të lëvizjes së reduktuar.
- Mos i paraqit vlerësimet, numëruesit ose rendin demonstrues si të dhëna reale.
- Seksioni “Find Us” paraqet listën e lokacioneve me emrin e klubit, hapësirën, adresën dhe orarin shembull; përdor link Google Maps me destination të adresës.
- Dialogu i secilit klub shfaq të njëjtën adresë dhe një ilustrim CSS të hartës, pa kërkuar çelës API ose shërbim harte të integruar.
- Adresa shembull `Rruga e Studentëve 12, Prishtinë` duhet zëvendësuar dhe verifikuar para publikimit; të gjitha vendndodhjet dhe oraret duhen konfirmuar me organizatorët.
