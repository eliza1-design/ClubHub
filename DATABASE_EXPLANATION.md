# Shpjegimi i databazës ClubHub

Databaza quhet `clubhub_db` dhe ka tri tabela: `members`, `clubs` dhe `member_clubs`. Ekzekuto fajllin `database.sql` në phpMyAdmin për t'i krijuar.

## Tabelat

- **`members`** ruan personat e regjistruar. Çdo person ka ID, emër të plotë, email, telefon opsional dhe datën e regjistrimit. Email-i është unik, që i njëjti email të mos regjistrohet dy herë.
- **`clubs`** ruan klubet, me emër, kategori, përshkrim opsional dhe datën e krijimit.
- **`member_clubs`** ruan anëtarësimet. Çdo rresht lidh një anëtar me një klub dhe regjistron datën kur u bashkua.

## Pse ekzistojnë relacionet?

Një anëtar mund të jetë në disa klube, dhe secili klub mund të ketë disa anëtarë. Këto lidhje ruhen me ID-të përkatëse në `member_clubs`, jo duke kopjuar të dhënat e personit ose klubit.

Tabela `member_clubs` është tabela ndërmjetëse që zgjidh relacionin shumë-me-shumë. Çelësi i saj përbëhet nga `member_id` dhe `club_id`; kështu i njëjti anëtar nuk mund të shtohet dy herë në të njëjtin klub, por mund të ketë rreshta të veçantë për klube të tjera.

## Primary key dhe foreign key

- **Primary key (çelës primar)** identifikon në mënyrë unike një rresht. Për shembull, `members.id` është ID unike e secilit anëtar. Te `member_clubs`, primary key përbëhet nga çifti `(member_id, club_id)`.
- **Foreign key (çelës i huaj)** është një fushë që i referohet primary key në një tabelë tjetër. `member_clubs.member_id` lidhet me `members.id`, ndërsa `member_clubs.club_id` lidhet me `clubs.id`. Kjo ndihmon që çdo anëtarësim t'i referohet një anëtari dhe klubi ekzistues.

Me këto relacione, largimi i një personi nga një klub mund të bëhet duke hequr rreshtin përkatës nga `member_clubs`; të dhënat e anëtarit në `members` mbeten.
