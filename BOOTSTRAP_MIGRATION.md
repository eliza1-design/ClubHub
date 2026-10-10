# Plani i Migrimit në Bootstrap 5 — ClubHub

> Gjendja: migrimi fillestar është zbatuar në `index.html`, `style.css` dhe `script.js`. Seksionet më poshtë shërbejnë si përmbledhje të zgjedhjeve të implementuara dhe si checklist verifikimi/regression test.

Ky dokument përshkruan migrimin e ClubHub në Bootstrap 5. Qëllimi është të përmirësohet paraqitja në mobile, tablet dhe desktop duke ruajtur tekstet, funksionet, paletën vjollcë/jeshile dhe identitetin vizual ekzistues.

## 1. Qasja e migrimit

- Përdor Bootstrap 5 për container-at, grid-in, navbar-in responsive, butonat dhe utilities e layout-it.
- Mbaj `style.css` për identitetin e ClubHub dhe stilet që nuk ofrohen nga Bootstrap: animacionet, orbitën e Hero-it, glassmorphism-in, gradientet, ngjyrat, kartat e personalizuara, galeritë dhe dialogët.
- Mos e zëvendëso funksionalitetin ekzistues të `script.js`: kërkimi, filtrimi, sortimi, preferuarat, galeritë, numëruesit, linket Google Maps dhe hapja e detajeve duhet të vazhdojnë të përdorin të njëjtat ID dhe `data-*` atribute.
- Përdor Bootstrap 5.3.3 nga CDN-ja zyrtare e jsDelivr vetëm një herë; mos ngarko versione të dyfishta ose CSS tjetër framework.
- Shto Bootstrap JavaScript bundle vetëm nëse përdoret navbar collapse ose ndonjë komponent interaktiv Bootstrap. Komponentët aktualë `<dialog>` dhe ndërveprimet e shkruara në `script.js` nuk kërkojnë migrim në Bootstrap JS.

## 2. Container dhe Container-fluid

Përdor `.container` për përmbajtje që duhet të ketë gjerësi maksimale dhe të rreshtohet në qendër:

- Përmbajtjen e navbar-it, përfshirë logon, navigimin dhe butonin “Bashkohu”.
- Përmbajtjen e të gjitha seksioneve: Hero, statistikat, Rreth, Klubet, Find Us, Preferuarat, Përfitimet, Ekipi, Si funksionon dhe CTA/Kontakti.
- Përmbajtjen kryesore të footer-it.
- Përmbajtjen e brendshme të një zone me sfond që zgjatet deri në skajet e viewport-it.

Përdor `.container-fluid` vetëm kur një element ose sfond duhet të shtrihet në tërë gjerësinë e ekranit, si:

- Header-i sticky dhe sfondet e seksioneve me gradient.
- Sfondi i plotë i seksionit Find Us ose i një blloku CTA, nëse dizajni i kërkon bleed deri në skaj.
- Sfondi i footer-it.

Brenda një `.container-fluid` përdor një `.container` për tekstin dhe kartat, në mënyrë që përmbajtja të mos ngjitet në skajet e ekranit. Mos i zëvendëso sfondet ekzistuese vetëm për të përdorur `.container-fluid`.

## 3. Grid system: row dhe col

Përdor `.row` dhe klasat responsive `col-*` për layout-et shumëkolonëshe. Ruaj renditjen semantike në HTML dhe sigurohu që çdo `.col-*` të jetë fëmijë i drejtpërdrejtë i `.row`.

| Pjesa ekzistuese | Grid i propozuar |
| --- | --- |
| Hero: teksti dhe ilustrimi orbital | `row align-items-center`; tekst `col-12 col-lg-6`, ilustrim `col-12 col-lg-6`. Në mobile rendit tekstin para ilustrimit. |
| Rreth ClubHub | `row g-4 align-items-center`; titulli dhe teksti në dy kolona `col-12 col-lg-6`. |
| Statistikat | `row g-3`; secila statistikë `col-12 col-sm-4`. |
| Kartat e klubeve | `row g-4`; çdo klub `col-12 col-md-6 col-xl-4`. |
| Find Us | `row g-4`; çdo lokacion `col-12 col-md-6 col-xl-4`. |
| Klubet e preferuara | `row g-3`; kartat `col-12 col-md-6 col-xl-4`, nëse përshtatet me gjerësinë e kartës ekzistuese. |
| Përfitimet | `row g-3`; `col-12 col-sm-6 col-xl-3`. |
| Ekipi | Seksion-heading dhe kartat mund të ndahen në `col-12 col-lg-5` dhe `col-12 col-lg-7`; kartat e anëtarëve `col-12 col-md-6`. |
| Si funksionon | Heading dhe lista e hapave `col-12 col-lg-5` dhe `col-12 col-lg-7`. |
| CTA dhe footer | Flex utilities ose `row` me kolona që grumbullohen në mobile. |

Zëvendëso Grid CSS-in e kolonave vetëm pasi të kontrollohet përmbajtja në gjerësi reale; përmasat e imazheve, orbitës dhe brendësia e kartave mbeten custom CSS.

## 4. Lista e cards të klubeve

- Mbaj listën semantike ekzistuese `ul#club-list` dhe çdo `li.club-list-item`; mos i zëvendëso `article.club-card` me `div`.
- Shto `row g-4` te lista/grid-i dhe klasa e kolonës te çdo `li`, ose vendos një `.row` brenda `ul` me `li` si `.col-*`. Zgjidh një model të vetëm që ruan HTML semantik.
- Sugjerimi fillestar për madhësi: `col-12 col-md-6 col-xl-4`, pra një kartë në mobile, dy në tablet dhe tri në desktop të gjerë.
- Mbaje `article.club-card` si elementin vizual të kartës me flex-column dhe lartësi të njëtrajtshme; Bootstrap utilities si `h-100 d-flex flex-column` mund të zëvendësojnë rregulla të thjeshta layout-i, ndërsa pamja e kartës mbetet në CSS.
- Galeria, emri, përshkrimi, kategoria, anëtarët, yjet dhe veprimet “Lexo më shumë”/favorite mbeten brenda së njëjtës kartë.
- Ruaj ID-të, klasat që kërkon JavaScript-i (`.club-card`, `.category`, `.gallery-photo`, `.favorite-button` etj.) dhe atributet `data-club-id`, `data-rating`, `data-added-order`, `data-images` e `data-*` të detajeve.
- Lista tregon tri karta fillimisht. Rregulli aktual CSS `nth-child(n + 4)` dhe klasa `is-collapsed` duhet rishikuar gjatë migrimit, sepse elementët e fshehur duhet të vazhdojnë të sillen saktë pas sortimit/filtrimit dhe ri-append në DOM.
- Mos i vendos klasat e Bootstrap-it brenda `script.js` për renderim dinamik pa testuar; listat e preferuarave krijohen nga JavaScript dhe duhet të marrin të njëjtin layout pa prishur funksionet.

## 5. Bootstrap components që mund të përdoren

- **Navbar:** komponenti responsive `navbar`, me `navbar-expand-lg`, `navbar-toggler`, `collapse navbar-collapse` dhe `navbar-nav`. Mbaj logon, tekstet dhe lidhjen CTA ekzistuese.
- **Buttons:** përdor `.btn` dhe madhësitë/variantet si bazë, por shto klasa të ClubHub për gradientin, ngjyrat, radius-in, hover-in dhe fokusin.
- **Cards:** mund të përdoret struktura `.card` dhe `.card-body` për skelet semantik/layout, por mos e lër stilin default të Bootstrap-it të zëvendësojë pamjen custom dhe galerinë.
- **Forms:** `.form-control` për kërkimin dhe `.form-select` për kategorinë/sortimin; ruaj `id` dhe label-et aktuale që kërkon JavaScript/accessibility.
- **Badges:** `.badge` mund të shërbejë si bazë për etiketat e kategorisë, duke ruajtur ngjyrat e kategorive në custom CSS.
- **Utilities:** `d-flex`, `flex-column`, `align-items-*`, `justify-content-*`, `gap-*`, `h-100`, `w-100`, `text-center`, `mx-auto`, `mt-*`, `mb-*`, `py-*` dhe `px-*` për rregullime të zakonshme.
- **Modal/offcanvas:** mos i migro dialogët automatikisht. Dialogu i klubit dhe lightbox-i aktual përdorin elementin native `<dialog>`, ESC dhe klikim jashtë; zëvendësimi me Bootstrap Modal do të kërkonte ndryshim dhe riprovim të `script.js`. Përdor komponentin vetëm nëse ka arsye të qartë dhe sjellja e mbylljes/aksesueshmërisë ruhet.
- **Alerts:** mos zëvendëso toast-in aktual vetëm për të shtuar komponent Bootstrap. Mund të përdoret `toast` Bootstrap si alternativë në një fazë të ardhshme, por duhet të ruhet aria-live dhe kohëzgjatja ekzistuese.

## 6. Navbar responsive

- Ndërtoje si `<nav class="navbar navbar-expand-lg">` brenda header-it sticky dhe kontejnerit të përmbajtjes.
- Lidhjen `.brand` mbaj si `navbar-brand`.
- Butoni toggler-i duhet të ketë `type="button"`, `data-bs-toggle="collapse"`, `data-bs-target` që përputhet me ID unike të menusë, `aria-controls`, `aria-expanded` dhe `aria-label`.
- Lidhjet e ankorave vendosi brenda `collapse navbar-collapse`; përdor `navbar-nav` dhe `nav-item`/`nav-link`.
- CTA “Bashkohu” mund të jetë `btn` brenda menusë, por në mobile sigurohu që të mbetet i dukshëm dhe i lehtë për t'u shtypur.
- Zgjidh një breakpoint të qëndrueshëm, p.sh. `navbar-expand-lg`: menuja zgjerohet në desktop dhe paloset në tablet/mobile.
- Bootstrap JS bundle nevojitet për hapje/mbyllje të collapse-it. Mos mbaj njëkohësisht menunë horizontale që tejkalon ekranin dhe toggler-in e Bootstrap-it.
- Ruaj pozicionimin sticky, blur/transparencën, hijen gjatë scroll-it, vijën e hover/active dhe gjendjen `aria-current="location"` të përditësuar nga `script.js`.
- Testo `scroll-padding-top`/`scroll-margin-top`, sepse header-i sticky dhe collapsed navbar-i kanë lartësi të ndryshme; lidhjet e seksioneve nuk duhet të fshihen pas header-it.

## 7. Sjellja sipas madhësisë së ekranit

### Mobile (më pak se 576 px)

- Një kolonë për kartat e klubeve, lokacionet dhe përfitimet; statistikat mund të grumbullohen ose të shfaqen në tre blloqe të ngushta nëse etiketat lexohen qartë.
- Hero-i bëhet një kolonë: teksti sipër, ilustrimi poshtë. Ruaj madhësinë e orbitës dhe shmang prerjen e kartave lundruese.
- Kontrollet e filtrit/search-it zënë gjerësinë e disponueshme dhe kanë lartësi të përshtatshme për prekje.
- Dialogu i detajeve, lightbox-i dhe blloku i hartës përdorin gjerësi të ekranit me padding të brendshëm; tekstet dhe butonat nuk dalin jashtë.
- Footer-i dhe CTA grumbullohen vertikalisht; navigimi i navbar-it përdor collapse, jo overflow horizontal.

### Tablet (576–991 px)

- Dy kolona për klubet, Find Us dhe përfitimet (përfitimet mund të kalojnë në katër kolonat vetëm kur ka hapësirë).
- Hero-i, Rreth dhe Si funksionon mund të qëndrojnë njëkolonëshe deri te breakpoint-i `lg` nëse përmbajtja bëhet e ngushtë.
- Navbar-i mund të jetë collapsed deri te breakpoint-i i zgjedhur `lg`; verifiko që CTA të mos mbivendoset me brand-in.
- Ekipi përdor dy kolona për cards kur gjerësia e lejon; mos shkurto përshkrimet.

### Desktop (992 px e lart)

- Hero-i, Rreth, Ekipi dhe Si funksionon përdorin kolonat e dyfishta të planifikuara.
- Rrjeti i klubeve dhe Find Us shfaqin tri karta në rresht në desktop të gjerë; në 992–1199 px mund të mbahen dy kolona nëse cards bëhen të ngushta.
- Preferuarat shfaqen në rrjet me gjerësi të kontrolluar; CTA dhe footer-i përdorin rreshtim horizontal.
- Mbaje gjerësinë maksimale të lexueshme; `container-fluid` nuk duhet të bëjë tekstet ose cards tepër të gjera.

## 8. Custom CSS që duhet të mbetet

Ruaj ose përshtat, mos i hiq gjatë migrimit:

- Variablat e ngjyrave/fontit dhe identitetin tipografik ClubHub.
- Gradientet e sfondit, glassmorphism-in dhe backdrop blur.
- Orbitën e Hero-it, pozicionet e kartave lundruese dhe animacionet përkatëse.
- Pamjen e custom të kartave, ikonave, kategorive, vlerësimeve me yje dhe butonave.
- Galerinë e fotografive, overlay, thumbnails, indikatorët dhe lightbox-in.
- Animacionet e reveal/stagger, counter, loading, toast, hover dhe gjendjet `prefers-reduced-motion`.
- Dialogët native, hartën ilustruese CSS dhe pamjen e kartave Find Us.
- Stilet e navigimit active/hover, efektin sticky në scroll dhe fokusin e dukshëm për aksesueshmëri.
- Rregullat për `hidden`, `is-collapsed`, gjendjet bosh, kartat e preferuara dhe faqosjen pas renderimit dinamik.

Kontrollo konfliktet me Bootstrap Reboot: stilet globale aktuale për `ul`, `ol`, tituj dhe elementë formash mund të ndryshojnë, prandaj ruaj vetëm reset-et që duhen dhe kufizo custom selectors që të mos mbivendosen pa nevojë.

## 9. CSS që mund të zëvendësohet me Bootstrap utilities

Pas verifikimit vizual mund të zëvendësohen gradualisht:

- `display: flex/grid`, rreshtimi dhe drejtimi i thjeshtë i blloqeve me `d-flex`, `d-grid` (nëse përdoret), `flex-column`, `align-items-*`, `justify-content-*`.
- `grid-template-columns` të zakonshme me `row` dhe `col-*`.
- `gap` i zakonshëm me `g-*`, `gap-*`, `column-gap-*`, `row-gap-*`.
- `width: 100%`, `height: 100%` me `w-100`, `h-100`; margjinat/padding-et standarde me `m*`, `p*`, `mx-auto`, `py-*`.
- Qendërzimin dhe fsheh/shfaq të thjeshtë me `text-center`, `d-none`, `d-md-*` aty ku nuk ndërhyn në filtrimin e kartave.
- Stilet bazë të input/select me `.form-control` dhe `.form-select`.
- Stilet bazë të butonit me `.btn`, por jo brand colors/hover/animacionet.

Mos zëvendëso verbërisht `ul`-at semantikë ose rregullat `hidden`; testet duhet të mbulojnë kërkimin, kategoritë, sortimin, preferuarat dhe zgjerimin e 3/7 cards pas përdorimit të utilities.

## 10. Checklist për responsive testing

- [ ] Verifiko viewport-et 320, 375/390, 576, 768, 992, 1200 dhe 1440 px.
- [ ] Nuk ka scroll horizontal në asnjë madhësi; përjashtim mund të jetë vetëm ndonjë element që synimisht kërkon scroll, jo faqja.
- [ ] Navbar toggler-i hapet/mbyllet me mouse, touch dhe tastierë; `aria-expanded` përditësohet dhe lidhjet e ankorave punojnë.
- [ ] Navbar-i sticky nuk mbulon titullin e seksionit pas navigimit.
- [ ] Hero-i dhe orbitat nuk priten në mobile/tablet; tekstet dhe kartat dekorative mbeten të lexueshme.
- [ ] Rrjeti i klubeve ka 1/2/3 kolona sipas breakpoint-it; cards janë të njëtrajtshme pa përmbajtje të prerë.
- [ ] Hap “Shiko më shumë”, kërko, filtro, rendit dhe kontrollo gjendjen pa rezultate pas kalimit në kolonat Bootstrap.
- [ ] Galeritë, lightbox-i, favorites/localStorage, detajet dhe linku Share vazhdojnë të punojnë.
- [ ] Seksioni Find Us shfaq të shtatë lokacionet; adresat dhe oraret lexohen, ndërsa çdo “Get Directions” hap Google Maps.
- [ ] Dialogu i klubit përshtatet në mobile, mbyllet me X/ESC/klikim jashtë dhe linku i hartës ka adresën e klubit aktual.
- [ ] Preferuarat dinamike përputhen me grid-in edhe pas shtimit/heqjes së favoriteve dhe rifreskimit.
- [ ] CTA, përfitimet, ekipi, hapat dhe footer-i nuk krijojnë rreshta të ngushtë ose elemente të mbivendosura.
- [ ] Ngjyrat, tipografia, radius-et, hijet, gradientet, hover/focus dhe glassmorphism-i ruajnë identitetin aktual.
- [ ] Testo me tastierë, fokus të dukshëm, zoom 200% dhe `prefers-reduced-motion`.
- [ ] Kontrollo console për gabime dhe konfirmo që Bootstrap CSS/JS ngarkohet saktë pa u shtuar dependencies të panevojshme.

## 11. Skedarët dhe integrimi i implementuar

- `index.html` ngarkon Bootstrap 5.3.3 CSS dhe JavaScript bundle nga CDN-ja, përdor navbar collapse responsive, klasa `container`/`row`/`col-*`, form controls dhe markup semantik të ruajtur.
- `style.css` ruan identitetin vizual, animacionet dhe stilet e veçanta; rregullat e layout-it me CSS Grid që binin ndesh me Bootstrap rows u hoqën aty ku përdoret grid-i Bootstrap. Breakpoint-et e seksioneve të rrjetit tashmë menaxhohen nga klasat `col-*`.
- `script.js` ruan sjelljen ekzistuese dhe u përditësua vetëm që kartat/lokacionet/favorites të marra dinamikisht të përdorin Bootstrap card/column classes.
- Navbar-i zgjerohet në `xl`, duke e lënë collapsed në mobile/tablet dhe duke ruajtur gjendjen sticky, active link, focus dhe collapse me `data-bs-toggle`.
- Bootstrap JS bundle përdoret për toggler/collapse; nuk janë shtuar funksione të reja të aplikacionit.
