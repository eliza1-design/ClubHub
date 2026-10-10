(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('is-loading');
  window.setTimeout(() => document.body.classList.remove('is-loading'), reduceMotion ? 120 : 650);

  const toast = document.querySelector('#toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  const registrationFeedback = document.querySelector('#registration-feedback');
  const registrationStatus = new URLSearchParams(window.location.search).get('registration');
  if (registrationFeedback && registrationStatus) {
    const feedbackMessages = {
      created: ['Regjistrimi u krye me sukses. Mirë se vjen në ClubHub!', 'success'],
      duplicate: ['Ky email është regjistruar tashmë. Provo me një email tjetër.', 'error'],
      'club-required': ['Zgjidh një klub për t’u regjistruar.', 'error'],
      'club-invalid': ['Klubi i zgjedhur nuk ekziston më. Rifresko faqen dhe provo përsëri.', 'error'],
      'save-error': ['Regjistrimi nuk u ruajt. Provo përsëri më vonë.', 'error']
    };
    const feedback = feedbackMessages[registrationStatus];
    if (feedback) {
      registrationFeedback.textContent = feedback[0];
      registrationFeedback.classList.add('is-visible', `is-${feedback[1]}`);
    }
    window.history.replaceState(null, '', `${window.location.pathname}#regjistrohu`);
  }

  const clubFeedback = document.querySelector('#club-feedback');
  const clubStatus = new URLSearchParams(window.location.search).get('club_status');
  if (clubFeedback && clubStatus) {
    const clubMessages = {
      created: ['Klubi u krijua dhe u ruajt me sukses.', 'success'],
      invalid: ['Shkruaj emrin e klubit për të vazhduar.', 'error'],
      deleted: ['Klubi u fshi bashkë me anëtarësimet e lidhura.', 'success'],
      'not-found': ['Klubi nuk u gjet ose është fshirë më parë.', 'error'],
      'delete-invalid': ['Nuk u zgjodh një klub i vlefshëm për fshirje.', 'error']
    };
    const feedback = clubMessages[clubStatus];
    if (feedback) {
      clubFeedback.textContent = feedback[0];
      clubFeedback.classList.add('is-visible', `is-${feedback[1]}`);
    }
    window.history.replaceState(null, '', `${window.location.pathname}#database-clubs`);
  }

  const registeredMembersList = document.querySelector('#registered-members-list');
  const membersListStatus = document.querySelector('#members-list-status');
  const memberStatus = new URLSearchParams(window.location.search).get('member_status');
  const memberStatusMessages = {
    deleted: 'Anëtari dhe anëtarësimet e tij u fshinë.',
    'not-found': 'Anëtari nuk u gjet ose është fshirë më parë.',
    invalid: 'Nuk u zgjodh një anëtar i vlefshëm për fshirje.'
  };
  const memberStatusMessage = memberStatusMessages[memberStatus];
  if (memberStatusMessage && membersListStatus) {
    membersListStatus.textContent = memberStatusMessage;
    membersListStatus.classList.toggle('is-error', memberStatus !== 'deleted');
  }

  function createHomepageDeleteForm(action, id, name, buttonText, confirmation) {
    const form = document.createElement('form');
    const actionInput = document.createElement('input');
    const idInput = document.createElement('input');
    const sourceInput = document.createElement('input');
    const button = document.createElement('button');

    form.method = 'post';
    form.action = `app/${action === 'delete-member' ? 'members.php' : 'clubs.php'}`;
    form.className = 'homepage-delete-form';
    form.addEventListener('submit', (event) => {
      if (!window.confirm(confirmation.replace('{name}', name))) event.preventDefault();
    });

    actionInput.type = 'hidden';
    actionInput.name = 'action';
    actionInput.value = 'delete';
    idInput.type = 'hidden';
    idInput.name = action === 'delete-member' ? 'member_id' : 'club_id';
    idInput.value = String(id);
    sourceInput.type = 'hidden';
    sourceInput.name = 'source';
    sourceInput.value = 'homepage';
    button.type = 'submit';
    button.className = 'homepage-delete-button';
    button.textContent = buttonText;

    form.append(actionInput, idInput, sourceInput, button);
    return form;
  }

  if (registeredMembersList && membersListStatus) {
    fetch('app/public_members.php', { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`Member list request failed with status ${response.status}`);
        return response.json();
      })
      .then((members) => {
        if (!Array.isArray(members)) throw new Error('Member list response was not an array');

        if (members.length === 0) {
          membersListStatus.textContent = 'Nuk ka ende anëtarë të regjistruar. Regjistrohu dhe bëhu pjesë e komunitetit.';
          membersListStatus.classList.add('is-empty');
          return;
        }

        members.forEach((member) => {
          const item = document.createElement('li');
          const card = document.createElement('article');
          const identity = document.createElement('div');
          const avatar = document.createElement('span');
          const name = document.createElement('p');
          const clubs = document.createElement('div');
          const clubsLabel = document.createElement('span');
          const deleteForm = createHomepageDeleteForm(
            'delete-member',
            member.id,
            member.full_name,
            'Fshi anëtarin',
            'A dëshiron ta fshish përgjithmonë anëtarin {name} dhe anëtarësimet e tij?'
          );

          item.className = 'registered-member-item';
          card.className = 'registered-member-card';
          identity.className = 'registered-member-identity';
          avatar.className = 'registered-member-avatar';
          avatar.setAttribute('aria-hidden', 'true');
          avatar.textContent = member.full_name.trim().charAt(0).toLocaleUpperCase('sq');
          name.className = 'registered-member-name';
          name.textContent = member.full_name;
          clubs.className = 'registered-member-clubs';
          clubsLabel.className = 'registered-member-clubs-label';
          clubsLabel.textContent = member.clubs && member.clubs.length > 1 ? 'Klubet' : 'Klubi';

          identity.append(avatar, name);
          clubs.append(clubsLabel);
          if (Array.isArray(member.clubs) && member.clubs.length > 0) {
            member.clubs.forEach((clubName) => {
              const club = document.createElement('span');
              club.className = 'registered-member-club';
              club.textContent = clubName;
              clubs.append(club);
            });
          } else {
            const noClub = document.createElement('span');
            noClub.className = 'registered-member-no-club';
            noClub.textContent = 'Pa klub';
            clubs.append(noClub);
          }

          card.append(identity, clubs, deleteForm);
          item.append(card);
          registeredMembersList.append(item);
        });

        membersListStatus.textContent = `${members.length} ${members.length === 1 ? 'anëtar i regjistruar' : 'anëtarë të regjistruar'}.`;
        registeredMembersList.hidden = false;
        if (memberStatusMessage) {
          membersListStatus.textContent = `${memberStatusMessage} ${members.length} ${members.length === 1 ? 'anëtar i regjistruar' : 'anëtarë të regjistruar'}.`;
        }
      })
      .catch((error) => {
        console.error('ClubHub could not load registered members:', error);
        membersListStatus.textContent = 'Lista e anëtarëve nuk mund të ngarkohet tani. Rifresko faqen dhe provo përsëri.';
        membersListStatus.classList.add('is-error');
      });
  }

  const databaseClubsList = document.querySelector('#database-clubs-list');
  const databaseClubsStatus = document.querySelector('#database-clubs-status');
  if (databaseClubsList && databaseClubsStatus) {
    fetch('app/public_clubs.php', { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`Club list request failed with status ${response.status}`);
        return response.json();
      })
      .then((clubs) => {
        if (!Array.isArray(clubs)) throw new Error('Club list response was not an array');

        const joinClubSelect = document.querySelector('#join-club');
        const joinClubHint = document.querySelector('#join-club-hint');
        if (joinClubSelect) {
          joinClubSelect.replaceChildren();
          const placeholder = document.createElement('option');
          placeholder.value = '';
          placeholder.textContent = clubs.length === 0 ? 'Nuk ka ende klube' : 'Zgjidh një klub';
          joinClubSelect.append(placeholder);
          clubs.forEach((club) => {
            const option = document.createElement('option');
            option.value = String(club.id);
            option.textContent = club.category ? `${club.name} — ${club.category}` : club.name;
            joinClubSelect.append(option);
          });
          joinClubSelect.disabled = clubs.length === 0;
          if (joinClubHint && clubs.length === 0) {
            joinClubHint.textContent = 'Krijo fillimisht një klub te seksioni “Klubet e ClubHub”.';
          }
        }

        if (clubs.length === 0) {
          databaseClubsStatus.textContent = 'Nuk ka ende klube në databazë. Krijo klubin e parë për komunitetin.';
          databaseClubsStatus.classList.add('is-empty');
          return;
        }

        clubs.forEach((club) => {
          const item = document.createElement('li');
          const card = document.createElement('article');
          const category = document.createElement('span');
          const title = document.createElement('h3');
          const description = document.createElement('p');
          const memberCount = document.createElement('p');
          const deleteForm = createHomepageDeleteForm(
            'delete-club',
            club.id,
            club.name,
            'Fshi klubin',
            'A dëshiron ta fshish përgjithmonë klubin {name} dhe anëtarësimet e lidhura me të?'
          );

          item.className = 'database-club-item';
          card.className = 'database-club-card';
          category.className = 'database-club-category';
          category.textContent = club.category || 'Klub';
          title.className = 'database-club-name';
          title.textContent = club.name;
          description.className = 'database-club-description';
          description.textContent = club.description || 'Përshkrimi do të shtohet së shpejti.';
          memberCount.className = 'database-club-members';
          memberCount.textContent = `${club.member_count} ${club.member_count === 1 ? 'anëtar' : 'anëtarë'}`;

          card.append(category, title, description, memberCount, deleteForm);
          item.append(card);
          databaseClubsList.append(item);
        });

        databaseClubsStatus.textContent = `${clubs.length} ${clubs.length === 1 ? 'klub i krijuar' : 'klube të krijuara'} në ClubHub.`;
        databaseClubsList.hidden = false;
      })
      .catch((error) => {
        console.error('ClubHub could not load registered clubs:', error);
        databaseClubsStatus.textContent = 'Lista e klubeve nuk mund të ngarkohet tani. Rifresko faqen dhe provo përsëri.';
        databaseClubsStatus.classList.add('is-error');
      });
  }

  const galleries = [...document.querySelectorAll('[data-gallery]')].map((element) => {
    const card = element.closest('.club-card');
    card.classList.add('card');
    const images = element.dataset.images.split('|');
    const image = element.querySelector('.gallery-photo img');
    const indicators = element.querySelector('.gallery-indicators');
    const title = card.querySelector('h3').textContent.trim();
    const gallery = { element, card, images, image, indicators, title, index: 0 };

    images.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.type = 'button';
      indicator.className = 'gallery-indicator';
      indicator.setAttribute('aria-label', `Shfaq fotografinë ${index + 1} nga ${title}`);
      indicator.addEventListener('click', () => showImage(gallery, index));
      indicators.append(indicator);
    });

    showImage(gallery, 0, false);
    return gallery;
  });

  function showImage(gallery, index, animate = true) {
    gallery.index = (index + gallery.images.length) % gallery.images.length;
    gallery.image.classList.toggle('is-changing', animate);
    gallery.image.src = gallery.images[gallery.index];
    gallery.image.alt = `Fotografia ${gallery.index + 1} nga ${gallery.images.length} e ${gallery.title}`;
    [...gallery.indicators.children].forEach((indicator, indicatorIndex) => {
      const active = indicatorIndex === gallery.index;
      indicator.classList.toggle('is-active', active);
      indicator.setAttribute('aria-current', active ? 'true' : 'false');
    });
  }

  function galleryFor(element) {
    return galleries.find((gallery) => gallery.element === element.closest('[data-gallery]'));
  }

  let lightboxGallery = null;
  const lightbox = document.querySelector('#image-lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const lightboxCaption = document.querySelector('#lightbox-caption');

  function showLightboxImage(index) {
    if (!lightboxGallery) return;
    lightboxGallery.index = (index + lightboxGallery.images.length) % lightboxGallery.images.length;
    lightboxImage.src = lightboxGallery.images[lightboxGallery.index];
    lightboxImage.alt = `Fotografia ${lightboxGallery.index + 1} nga ${lightboxGallery.images.length} e ${lightboxGallery.title}`;
    lightboxCaption.textContent = `${lightboxGallery.title} · ${lightboxGallery.index + 1} / ${lightboxGallery.images.length}`;
    showImage(lightboxGallery, lightboxGallery.index);
  }

  function openLightbox(gallery, index) {
    lightboxGallery = gallery;
    showLightboxImage(index);
    lightbox.showModal();
  }

  const clubDialog = document.querySelector('#club-dialog');
  const detailsPhotos = document.querySelector('#details-photos');

  function directionsUrl(address) {
    const destination = address.replace(/\s*\(adresë shembull\)/i, '');
    const url = new URL('https://www.google.com/maps/dir/');
    url.searchParams.set('api', '1');
    url.searchParams.set('destination', destination);
    return url.href;
  }

  function openDetails(card) {
    clubDialog.dataset.clubId = card.dataset.clubId;
    document.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent.trim();
    document.querySelector('#dialog-description').textContent = card.dataset.description;
    document.querySelector('#dialog-location').textContent = card.dataset.location;
    document.querySelector('#dialog-schedule').textContent = card.dataset.schedule;
    document.querySelector('#dialog-cost').textContent = card.dataset.cost;
    document.querySelector('#dialog-services').textContent = card.dataset.services;
    document.querySelector('#dialog-address').textContent = card.dataset.address;
    document.querySelector('#dialog-directions').href = directionsUrl(card.dataset.address);
    detailsPhotos.replaceChildren();

    const gallery = galleries.find((item) => item.card === card);
    gallery.images.forEach((src, index) => {
      const button = document.createElement('button');
      const image = document.createElement('img');
      button.type = 'button';
      button.className = 'details-photo';
      button.setAttribute('aria-label', `Hap fotografinë ${index + 1} të ${gallery.title}`);
      image.src = src;
      image.alt = `Fotografia ${index + 1} e ${gallery.title}`;
      image.loading = 'lazy';
      button.append(image);
      button.addEventListener('click', () => openLightbox(gallery, index));
      detailsPhotos.append(button);
    });

    clubDialog.showModal();
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const gallery = galleryFor(button);

    if (action === 'next' && gallery) showImage(gallery, gallery.index + 1);
    if (action === 'previous' && gallery) showImage(gallery, gallery.index - 1);
    if (action === 'lightbox' && gallery) openLightbox(gallery, gallery.index);
    if (action === 'details') openDetails(button.closest('.club-card'));
    if (action === 'close-details') clubDialog.close();
    if (action === 'close-lightbox') lightbox.close();
    if (action === 'lightbox-next' && lightboxGallery) showLightboxImage(lightboxGallery.index + 1);
    if (action === 'lightbox-previous' && lightboxGallery) showLightboxImage(lightboxGallery.index - 1);
    if (action === 'favorite') toggleFavorite(button);
    if (action === 'remove-favorite') {
      const clubId = button.dataset.clubId;
      const favoriteButton = [...document.querySelectorAll('.favorite-button')]
        .find((favorite) => favorite.closest('.club-card').dataset.clubId === clubId);
      if (favoriteButton) toggleFavorite(favoriteButton);
    }
    if (action === 'share') shareClub();
  });

  [clubDialog, lightbox].forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  lightbox.addEventListener('close', () => {
    lightboxGallery = null;
    lightboxImage.removeAttribute('src');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (lightbox.open) {
        event.preventDefault();
        lightbox.close();
      } else if (clubDialog.open) {
        event.preventDefault();
        clubDialog.close();
      }
      return;
    }

    if (!lightbox.open || !lightboxGallery) return;
    if (event.key === 'ArrowRight') showLightboxImage(lightboxGallery.index + 1);
    if (event.key === 'ArrowLeft') showLightboxImage(lightboxGallery.index - 1);
  });

  const storageKey = 'clubhub-favorites';
  const favoriteStatus = document.querySelector('#favorite-status');
  const favoritesList = document.querySelector('#favorite-clubs-list');
  const favoritesEmptyState = document.querySelector('#favorites-empty-state');
  let favorites = new Set();
  const knownClubIds = new Set([...document.querySelectorAll('.club-card')].map((card) => card.dataset.clubId));

  try {
    const storedFavorites = localStorage.getItem(storageKey);
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      if (Array.isArray(parsedFavorites) && parsedFavorites.every((id) => typeof id === 'string')) {
        favorites = new Set(parsedFavorites.filter((id) => knownClubIds.has(id)));
      }
    }
  } catch (error) {
    console.error('Nuk u lexuan dot klubet e preferuara nga ruajtja lokale.', error);
    favoriteStatus.textContent = 'Preferuarat nuk mund të ngarkohen në këtë shfletues.';
  }

  function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-button').forEach((button) => {
      const card = button.closest('.club-card');
      const isFavorite = favorites.has(card.dataset.clubId);
      button.classList.toggle('is-favorite', isFavorite);
      button.setAttribute('aria-pressed', String(isFavorite));
      button.setAttribute(
        'aria-label',
        `${isFavorite ? 'Hiq' : 'Ruaj'} ${card.querySelector('h3').textContent.trim()} ${isFavorite ? 'nga' : 'te'} të preferuarat`
      );
      button.querySelector('span').textContent = isFavorite ? '♥' : '♡';
    });
  }

  function renderFavoriteClubs() {
    const favoriteCards = [...document.querySelectorAll('.club-card')]
      .filter((card) => favorites.has(card.dataset.clubId));
    favoritesList.replaceChildren();
    favoritesEmptyState.hidden = favoriteCards.length > 0;

    favoriteCards.forEach((card) => {
      const item = document.createElement('li');
      const favoriteCard = document.createElement('article');
      const galleryImage = card.querySelector('.gallery-photo img');
      const image = document.createElement('img');
      const content = document.createElement('div');
      const name = document.createElement('h3');
      const description = document.createElement('p');
      const removeButton = document.createElement('button');
      const link = document.createElement('a');

      item.className = 'favorite-club-item col-12 col-md-6 col-xl-4';
      favoriteCard.className = 'favorite-club-card card';
      image.src = galleryImage.src;
      image.alt = '';
      image.loading = 'lazy';
      name.textContent = card.querySelector('h3').textContent.trim();
      description.textContent = card.querySelector(':scope > p').textContent.trim();
      link.href = '#klubet';
      link.className = 'favorite-club-link';
      link.textContent = 'Shiko klubin';
      removeButton.type = 'button';
      removeButton.className = 'favorite-remove-button';
      removeButton.dataset.action = 'remove-favorite';
      removeButton.dataset.clubId = card.dataset.clubId;
      removeButton.setAttribute('aria-label', `Hiq ${name.textContent} nga të preferuarat`);
      removeButton.textContent = '♥';
      content.className = 'favorite-club-content';
      content.append(name, description, link);
      favoriteCard.append(image, content, removeButton);
      item.append(favoriteCard);
      favoritesList.append(item);
    });
  }

  function toggleFavorite(button) {
    const id = button.closest('.club-card').dataset.clubId;
    const isFavorite = favorites.has(id);
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);

    updateFavoriteButtons();
    renderFavoriteClubs();
    try {
      localStorage.setItem(storageKey, JSON.stringify([...favorites]));
      favoriteStatus.textContent = '';
    } catch (error) {
      console.error('Preferuara u ndryshua, por nuk u ruajt dot lokalisht.', error);
      favoriteStatus.textContent = 'Ndryshimi u bë, por shfletuesi nuk mund ta ruajë pas rifreskimit.';
    }
    showToast(isFavorite ? 'Klubi u hoq nga të preferuarat.' : 'Klubi u shtua te të preferuarat.');
    applyFilters();
  }

  updateFavoriteButtons();
  renderFavoriteClubs();

  async function shareClub() {
    const clubId = clubDialog.dataset.clubId;
    if (!clubId) return;

    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('club', clubId);
    shareUrl.hash = 'klubet';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl.href);
      } else {
        const temporaryInput = document.createElement('textarea');
        temporaryInput.value = shareUrl.href;
        temporaryInput.setAttribute('readonly', '');
        temporaryInput.style.position = 'fixed';
        temporaryInput.style.opacity = '0';
        document.body.append(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand('copy');
        temporaryInput.remove();
        if (!copied) throw new Error('Clipboard copy command was rejected.');
      }
      showToast('Linku i klubit u kopjua!');
    } catch (error) {
      console.error('Lidhja e klubit nuk u kopjua dot.', error);
      showToast('Nuk u kopjua lidhja. Provo përsëri.');
    }
  }

  const searchInput = document.querySelector('#club-search');
  const categorySelect = document.querySelector('#club-category');
  const sortSelect = document.querySelector('#club-sort');
  const favoritesOnly = document.querySelector('#favorites-only');
  const filterStatus = document.querySelector('#filter-status');
  const emptyState = document.querySelector('#empty-state');
  const clubItems = [...document.querySelectorAll('.club-grid > li')];
  const clubGrid = document.querySelector('#club-list');
  const showClubsButton = document.querySelector('#show-clubs');
  let showAllClubs = false;

  function applyFilters() {
    const query = searchInput.value.trim().toLocaleLowerCase('sq');
    const category = categorySelect.value;
    const hasActiveFilters = Boolean(query || category || favoritesOnly.checked);
    let matchingCount = 0;

    const sortedItems = [...clubItems].sort((first, second) => {
      const firstCard = first.querySelector('.club-card');
      const secondCard = second.querySelector('.club-card');
      if (sortSelect.value === 'alphabetical') {
        return firstCard.querySelector('h3').textContent.localeCompare(
          secondCard.querySelector('h3').textContent,
          'sq'
        );
      }
      if (sortSelect.value === 'newest') {
        return Number(secondCard.dataset.addedOrder) - Number(firstCard.dataset.addedOrder);
      }
      return Number(secondCard.dataset.rating) - Number(firstCard.dataset.rating);
    });

    sortedItems.forEach((item, index) => {
      clubGrid.append(item);
      const card = item.querySelector('.club-card');
      const name = card.querySelector('h3').textContent.toLocaleLowerCase('sq');
      const cardCategory = card.querySelector('.category').textContent.trim();
      const matches = name.includes(query)
        && (!category || cardCategory === category)
        && (!favoritesOnly.checked || favorites.has(card.dataset.clubId));
      const shouldShow = matches && (showAllClubs || hasActiveFilters || index < 3);
      item.hidden = !shouldShow;
      if (matches) matchingCount += 1;
    });

    clubGrid.classList.toggle('is-collapsed', !showAllClubs && !hasActiveFilters);
    showClubsButton.hidden = hasActiveFilters || clubItems.length <= 3;
    showClubsButton.setAttribute('aria-expanded', String(showAllClubs));
    showClubsButton.firstChild.textContent = showAllClubs ? 'Shfaq më pak klube ' : 'Shiko më shumë klube ';
    showClubsButton.querySelector('span').textContent = showAllClubs ? '↑' : '↓';
    emptyState.hidden = matchingCount !== 0;
    filterStatus.textContent = `${matchingCount} ${matchingCount === 1 ? 'klub u gjet' : 'klube u gjetën'}.`;
  }

  showClubsButton.addEventListener('click', () => {
    showAllClubs = !showAllClubs;
    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  favoritesOnly.addEventListener('change', applyFilters);
  applyFilters();

  const sharedClubId = new URLSearchParams(window.location.search).get('club');
  if (sharedClubId) {
    const sharedCard = [...document.querySelectorAll('.club-card')]
      .find((card) => card.dataset.clubId === sharedClubId);
    if (sharedCard) {
      showAllClubs = true;
      applyFilters();
      window.setTimeout(() => {
        sharedCard.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        openDetails(sharedCard);
      }, 180);
    }
  }

  const header = document.querySelector('.site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const navigationLinks = [...document.querySelectorAll('.main-nav a')];
  const navigationTargets = navigationLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const navigationCollapse = document.querySelector('#clubhub-navigation');

  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200 && navigationCollapse.classList.contains('show')) {
        window.bootstrap.Collapse.getOrCreateInstance(navigationCollapse).hide();
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });

    navigationTargets.forEach((target) => sectionObserver.observe(target));
  }

  const revealTargets = document.querySelectorAll(
    '.hero-copy, .section-heading, .about-copy, .club-card, .benefit-item, .team-card, .step, .contact-panel, .stat-card, .favorite-club-card'
  );
  revealTargets.forEach((target) => target.classList.add('reveal'));
  document.querySelectorAll('.club-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 55}ms`;
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else {
    document.body.classList.add('reveal-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  const counters = [...document.querySelectorAll('[data-count]')];
  function animateCounter(counter) {
    const target = Number(counter.dataset.count);
    const duration = 1000;
    const startTime = performance.now();

    function updateCount(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - ((1 - progress) ** 3);
      counter.textContent = String(Math.round(target * easedProgress));
      if (progress < 1) window.requestAnimationFrame(updateCount);
    }

    window.requestAnimationFrame(updateCount);
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.count;
    });
  } else {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  if (!reduceMotion) {
    window.setInterval(() => {
      galleries.forEach((gallery) => {
        const isPaused = gallery.element.matches(':hover, :focus-within');
        const isFilteredOut = gallery.card.closest('li').hidden;
        if (!isPaused && !isFilteredOut && !clubDialog.open && !lightbox.open) {
          showImage(gallery, gallery.index + 1);
        }
      });
    }, 5200);
  }
})();
