(function () {
  const body = document.body;
  const siteHeader = document.querySelector('.siteHeader');
  const menuToggle = document.querySelector('.menuToggle');
  const navLinks = Array.from(document.querySelectorAll('.siteNav a'));
  const statusToast = document.getElementById('statusToast');
  const copyEmailButton = document.getElementById('copyEmail');
  const printPageButton = document.getElementById('printPage');
  const emailAddress = 'lopresttiboni@gmail.com';
  const langButtons = Array.from(document.querySelectorAll('.langButton'));
  const storageKey = 'rugbyProfileLang';
  let toastTimeout;

  const getTexts = (selector) => Array.from(document.querySelectorAll(selector)).map((element) => element.textContent.trim());
  const setTexts = (selector, values) => Array.from(document.querySelectorAll(selector)).forEach((element, index) => {
    if (typeof values[index] === 'string') {
      element.textContent = values[index];
    }
  });
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && typeof value === 'string') {
      element.textContent = value;
    }
  };

  const base = {
    brandKicker: document.querySelector('.brandKicker').textContent.trim(),
    menu: menuToggle ? menuToggle.textContent.trim() : 'Menu',
    nav: getTexts('.siteNav a'),
    navCta: document.querySelector('.navCta').textContent.trim(),
    heroEyebrow: document.querySelector('.eyebrow').textContent.trim(),
    heroLead: document.querySelector('.heroLead').textContent.trim(),
    heroTags: getTexts('.heroTagline span'),
    heroButtons: [document.querySelector('.ctaRow a:nth-of-type(1)').textContent.trim(), document.querySelector('.ctaRow a:nth-of-type(2)').textContent.trim(), copyEmailButton.textContent.trim()],
    heroMetricLabels: getTexts('.heroStats .metricLabel'),
    heroMetricSubs: getTexts('.heroStats .metricSub'),
    sectionKickers: getTexts('.sectionHeading .sectionKicker'),
    sectionTitles: getTexts('.sectionHeading .sectionTitle'),
    sectionLeads: getTexts('.sectionHeading .sectionLead'),
    profileSummary: getTexts('#profile .summaryText'),
    detailLabels: getTexts('#profile .detailLabel'),
    currentLevel: document.querySelector('.profileQuote p').textContent.trim(),
    quickNotes: getTexts('#profile .list li'),
    chips: getTexts('#profile .chipRow .chip'),
    filmSidebar: [document.querySelector('.filmTag').textContent.trim(), document.querySelector('.filmSidebar h3').textContent.trim(), document.querySelector('.filmSidebar p').textContent.trim()],
    filmItemTitles: getTexts('.filmListItem strong'),
    filmItemCopy: getTexts('.filmListItem span'),
    filmButtons: getTexts('.filmActions a'),
    educationHeading: [document.querySelector('.educationCard .sectionKicker').textContent.trim(), document.querySelector('.educationCard h3').textContent.trim(), document.querySelector('.educationCard p').textContent.trim()],
    contactHeading: [document.querySelector('.contactCard .sectionKicker').textContent.trim(), document.querySelector('.contactCard h3').textContent.trim(), document.querySelector('.contactCard p').textContent.trim()],
    contactLabels: getTexts('.contactCard .contactLabel'),
    contactButtons: [document.querySelector('.contactActions .btnPrimary').textContent.trim(), document.querySelector('.contactActions .btnSecondary').textContent.trim()],
    pathLabels: getTexts('.pathLabel'),
    pathCopy: getTexts('.pathwayStrip .pathwayItem div span:not(.pathLabel), #journey .pathMeta span:not(.pathLabel), #journey .clubItem span'),
    positionKickers: getTexts('#positions .positionCard .sectionKicker'),
    positionPills: getTexts('#positions .positionPill'),
    positionCopy: getTexts('#positions .positionCard p'),
    positionItems: getTexts('#positions .positionList li'),
    positionNotes: getTexts('#positions .positionNote'),
    achievementLabels: getTexts('#achievements .achievementLabel'),
    achievementTitles: getTexts('#achievements .achievementCard h3'),
    achievementCopy: getTexts('#achievements .achievementCard p'),
    galleryCaptions: getTexts('#gallery figcaption'),
    educationStatTitles: getTexts('.educationStat strong'),
    educationStatCopy: getTexts('.educationStat span'),
    contactValues: getTexts('.contactCard .contactValue'),
    referencesNote: document.querySelector('.referencesNote').textContent.trim(),
    footer: 'Rocco Loprestti. Perfil de rugby.',
    toast: 'Mail copiado'
  };

  const translations = {
    en: {
      brandKicker: 'Rugby Profile',
      menu: 'Menu',
      nav: ['Profile', 'Positions', 'Experience', 'Achievements', 'Video', 'Gallery', 'Contact'],
      navCta: 'Contact',
      heroEyebrow: 'U17 competing in U19',
      heroLead: 'Rugby player developed in Salta, with experience in Argentina, Italy, and the United States. He currently plays for Charlotte Cardinals Rugby Club, 2026 U.S. High School U19 national champion, and was selected for USA U18.',
      heroTags: ['Hooker', 'No. 8', 'USA U18'],
      heroButtons: ['Watch video', 'Send email', 'Copy email'],
      heroMetricLabels: ['Height / Weight', 'Positions', 'Selection', 'School'],
      heroMetricSubs: ['6\'1" and 220 lb.', 'Hooker and No. 8.', 'Selected for the U18 national team.', 'Current GPA.'],
      sectionKickers: ['Profile', 'Positions', 'Experience', 'Achievements', 'Video', 'Gallery', 'Contact'],
      sectionTitles: ['Profile', 'Positions', 'Experience', 'Achievements', 'Video', 'Photos', 'Contact'],
      sectionLeads: ['Main player details.', 'Primary positions.', 'Argentina, Italy, and the United States.', 'Clubs, selections, and tournaments.', 'Highlights.', 'Match moments.', 'Academics and contact.'],
      profileSummary: ['Physical, direct, competitive forward. Strong in contact, defense, and set piece.', 'Plays U19 as a U17, won the U.S. High School U19 national title with Cardinals, and was selected for USA U18.'],
      detailLabels: ['Full name', 'Date of birth', 'Primary positions', 'Current level', 'Current school', 'Current club'],
      currentLevel: 'U.S. High School U19 national champion and USA U18 selection.',
      quickNotes: ['Primary positions: 2 and 8.', 'Strong in contact, defense, and set piece.', 'Competes in U19 as a U17.', 'Played in Argentina, Italy, and the United States.', 'Speaks Spanish, English, and Italian.'],
      chips: ['USA U18', 'Hooker', 'No. 8', '4.081 / 4.0 GPA'],
      pathLabels: ['Argentina', 'Italy', 'United States', 'Argentina', 'Italy', 'United States'],
      pathCopy: ['2012 to 2024. Salta U17 selection.', '2024 season. Benetton U16 champion.', '2026 U.S. High School U19 national champion. Selected for USA U18.', 'Development in Salta.', 'Benetton Rugby.', 'Current club, school, and national selection.', 'Base development, competition, and M15 provincial champion.', 'Selected for Salta U17.', 'Champion with Benetton U16.', '2026 U.S. High School U19 national champion.', 'Selected for the USA U18 national team.', 'Current school.'],
      positionKickers: ['Hooker', 'No. 8'],
      positionPills: ['Set piece + contact', 'Work rate + carrying'],
      positionCopy: ['Strong profile at hooker.', 'Brings carrying, defense, and mobility from the back row.'],
      positionItems: ['Reliable in contact and set piece.', 'Comfortable in close play, tackling, and repeat efforts.', 'Good fit for a physical, hard-working pack.', 'Direct carries, tackling, and repeat efforts.', 'Useful when the game needs mobility and physical presence.', 'Strong option to impact open play.'],
      positionNotes: ['Primary position.', 'Primary position.'],
      achievementLabels: ['United States', 'Selection', 'Salta, Argentina', 'Treviso, Italy', 'Selection', 'Charlotte, United States'],
      achievementTitles: ['U.S. High School U19 national champion', 'USA U18', 'Provincial champion', 'Benetton U16 champion', 'Salta U17', 'U17 playing U19'],
      achievementCopy: ['2026 U.S. High School U19 national champion with Charlotte Cardinals Rugby Club.', 'Selected for the USA U18 national team.', 'M15 champion, captain, and best player in the final.', 'Champion during the 2024 season in Italy.', 'Selected for Salta U17.', 'Competes one age group up with Charlotte Cardinals Rugby Club.'],
      filmSidebar: ['Video', 'Highlights', 'Contact, defense, set piece, and competition level.'],
      filmItemTitles: ['Contact', 'Defense', 'Set piece and short game', 'Competition level'],
      filmItemCopy: ['Direct carries and physical presence.', 'Tackles and repeat efforts.', 'Useful work in tight phases.', 'U17 player competing in U19.'],
      filmButtons: ['Open on YouTube'],
      galleryCaptions: ['Phase involvement and field presence.', 'Focus before the next action.', 'Physicality and confidence in contact.', 'Direct running and intensity in open play.', 'Repeat efforts and involvement across phases.', 'Match context and competitive pace.'],
      educationHeading: ['Student-athlete', 'Academics', 'School and GPA.'],
      educationStatTitles: ['Ardrey Kell High School', '4.081 / 4.0 GPA', 'U17 playing U19', 'Languages'],
      educationStatCopy: ['Current school in the United States.', 'Current GPA.', 'Competes above his age group.', 'Spanish, English, and Italian.'],
      contactHeading: ['Contact', 'Direct contact', 'Availability, academic profile, and parent contact.'],
      contactLabels: ['Primary email', 'Current status', 'Parent contact', 'Best fit'],
      contactValues: ['lopresttiboni@gmail.com', 'Open to athletic opportunities and trials', 'Agustin Loprestti', 'Hooker or No. 8'],
      contactButtons: ['Send email', 'Save PDF'],
      referencesNote: 'References available on request.',
      toast: 'Email copied'
    },
    fr: {
      brandKicker: 'Profil rugby',
      menu: 'Menu',
      nav: ['Profil', 'Postes', 'Expérience', 'Palmarès', 'Vidéo', 'Galerie', 'Contact'],
      navCta: 'Contact',
      heroEyebrow: 'U17 en compétition U19',
      heroLead: 'Joueur formé à Salta, avec expérience en Argentine, en Italie et aux États-Unis. Il joue actuellement avec Charlotte Cardinals Rugby Club, champion national High School U19 des États-Unis en 2026, et il a été sélectionné avec USA U18.',
      heroTags: ['Talonneur', 'No. 8', 'USA U18'],
      heroButtons: ['Voir la vidéo', 'Envoyer un mail', 'Copier le mail'],
      heroMetricLabels: ['Taille / Poids', 'Postes', 'Sélection', 'École'],
      heroMetricSubs: ['6\'1" et 220 lb.', 'Talonneur et No. 8.', 'Sélectionné en U18.', 'GPA actuel.'],
      sectionKickers: ['Profil', 'Postes', 'Expérience', 'Palmarès', 'Vidéo', 'Galerie', 'Contact'],
      sectionTitles: ['Profil', 'Postes', 'Expérience', 'Palmarès', 'Vidéo', 'Photos', 'Contact'],
      sectionLeads: ['Données principales du joueur.', 'Postes principaux.', 'Argentine, Italie et États-Unis.', 'Clubs, sélections et tournois.', 'Actions marquantes.', 'Moments de match.', 'Études et contact.'],
      profileSummary: ['Forward physique, direct et compétitif. Fort au contact, en défense et sur phases fixes.', 'Il joue en U19 alors qu’il est U17, a gagné le titre national High School U19 avec Cardinals et a été sélectionné avec USA U18.'],
      detailLabels: ['Nom complet', 'Date de naissance', 'Postes principaux', 'Niveau actuel', 'École actuelle', 'Club actuel'],
      currentLevel: 'Champion national High School U19 et sélectionné avec USA U18.',
      quickNotes: ['Postes principaux : 2 et 8.', 'Fort au contact, en défense et sur phases fixes.', 'Joue en U19 en étant U17.', 'A joué en Argentine, en Italie et aux États-Unis.', 'Parle espagnol, anglais et italien.'],
      chips: ['USA U18', 'Talonneur', 'No. 8', '4.081 / 4.0 GPA'],
      pathLabels: ['Argentine', 'Italie', 'États-Unis', 'Argentine', 'Italie', 'États-Unis'],
      pathCopy: ['2012 à 2024. Sélection de Salta U17.', 'Saison 2024. Champion avec Benetton U16.', 'Champion national High School U19 2026. Sélectionné avec USA U18.', 'Formation à Salta.', 'Benetton Rugby.', 'Club actuel, école et sélection.', 'Formation de base, compétition et champion provincial M15.', 'Sélectionné avec Salta U17.', 'Champion avec Benetton U16.', 'Champion national High School U19 des États-Unis en 2026.', 'Sélectionné avec USA U18.', 'École actuelle.'],
      positionKickers: ['Talonneur', 'No. 8'],
      positionPills: ['Phases fixes + contact', 'Volume + porteur'],
      positionCopy: ['Profil solide au poste de talonneur.', 'Apporte portés de balle, défense et mobilité depuis la troisième ligne.'],
      positionItems: ['Fiable au contact et sur phases fixes.', 'À l’aise dans le jeu fermé, le plaquage et les efforts répétés.', 'Bon profil pour un pack physique et travailleur.', 'Courses directes, plaquage et efforts répétés.', 'Utile quand le match demande mobilité et présence physique.', 'Bonne option pour peser dans le jeu ouvert.'],
      positionNotes: ['Poste principal.', 'Poste principal.'],
      achievementLabels: ['États-Unis', 'Sélection', 'Salta, Argentine', 'Trévise, Italie', 'Sélection', 'Charlotte, États-Unis'],
      achievementTitles: ['Champion national High School U19', 'USA U18', 'Champion provincial', 'Champion avec Benetton U16', 'Salta U17', 'U17 jouant en U19'],
      achievementCopy: ['Champion national High School U19 des États-Unis avec Charlotte Cardinals Rugby Club en 2026.', 'Sélectionné avec USA U18.', 'Champion M15, capitaine et meilleur joueur de la finale.', 'Champion pendant la saison 2024 en Italie.', 'Sélectionné avec Salta U17.', 'Joue une catégorie au-dessus avec Charlotte Cardinals Rugby Club.'],
      filmSidebar: ['Vidéo', 'Highlights', 'Contact, défense, phases fixes et niveau de compétition.'],
      filmItemTitles: ['Contact', 'Défense', 'Phases fixes et jeu court', 'Niveau de compétition'],
      filmItemCopy: ['Courses directes et présence physique.', 'Plaquages et efforts répétés.', 'Travail utile dans les phases fermées.', 'Joueur U17 en compétition U19.'],
      filmButtons: ['Ouvrir sur YouTube'],
      galleryCaptions: ['Implication dans les phases et présence sur le terrain.', 'Concentration avant l’action suivante.', 'Physique et confiance au contact.', 'Course directe et intensité dans le jeu ouvert.', 'Efforts répétés et implication sur plusieurs phases.', 'Contexte de match et rythme compétitif.'],
      educationHeading: ['Étudiant sportif', 'Études', 'École et GPA.'],
      educationStatTitles: ['Ardrey Kell High School', '4.081 / 4.0 GPA', 'U17 jouant en U19', 'Langues'],
      educationStatCopy: ['École actuelle aux États-Unis.', 'GPA actuel.', 'Joue au-dessus de sa catégorie.', 'Espagnol, anglais et italien.'],
      contactHeading: ['Contact', 'Contact direct', 'Disponibilité, profil académique et contact parent.'],
      contactLabels: ['Mail principal', 'Statut actuel', 'Contact du père', 'Meilleur profil'],
      contactValues: ['lopresttiboni@gmail.com', 'Ouvert aux opportunités sportives et aux essais', 'Agustin Loprestti', 'Talonneur ou No. 8'],
      contactButtons: ['Envoyer un mail', 'Sauvegarder PDF'],
      referencesNote: 'Références disponibles sur demande.',
      toast: 'Mail copié'
    },
    it: {
      brandKicker: 'Profilo rugby',
      menu: 'Menu',
      nav: ['Profilo', 'Ruoli', 'Esperienza', 'Risultati', 'Video', 'Galleria', 'Contatto'],
      navCta: 'Contatto',
      heroEyebrow: 'U17 che compete in U19',
      heroLead: 'Giocatore formato a Salta, con esperienza in Argentina, Italia e Stati Uniti. Attualmente gioca con Charlotte Cardinals Rugby Club, campione nazionale High School U19 degli Stati Uniti nel 2026, ed è stato selezionato per USA U18.',
      heroTags: ['Hooker', 'No. 8', 'USA U18'],
      heroButtons: ['Guarda video', 'Invia email', 'Copia email'],
      heroMetricLabels: ['Altezza / Peso', 'Ruoli', 'Selezione', 'Scuola'],
      heroMetricSubs: ['6\'1" e 220 lb.', 'Hooker e No. 8.', 'Selezionato in U18.', 'GPA attuale.'],
      sectionKickers: ['Profilo', 'Ruoli', 'Esperienza', 'Risultati', 'Video', 'Galleria', 'Contatto'],
      sectionTitles: ['Profilo', 'Ruoli', 'Esperienza', 'Risultati', 'Video', 'Foto', 'Contatto'],
      sectionLeads: ['Dati principali del giocatore.', 'Ruoli principali.', 'Argentina, Italia e Stati Uniti.', 'Club, selezioni e tornei.', 'Azioni in evidenza.', 'Momenti di partita.', 'Studio e contatto.'],
      profileSummary: ['Forward fisico, diretto e competitivo. Forte nel contatto, in difesa e nelle fasi statiche.', 'Gioca U19 da U17, ha vinto il titolo nazionale High School U19 con Cardinals ed è stato selezionato per USA U18.'],
      detailLabels: ['Nome completo', 'Data di nascita', 'Ruoli principali', 'Livello attuale', 'Scuola attuale', 'Club attuale'],
      currentLevel: 'Campione nazionale High School U19 e selezionato per USA U18.',
      quickNotes: ['Ruoli principali: 2 e 8.', 'Forte nel contatto, in difesa e nelle fasi statiche.', 'Compete in U19 da U17.', 'Ha giocato in Argentina, Italia e Stati Uniti.', 'Parla spagnolo, inglese e italiano.'],
      chips: ['USA U18', 'Hooker', 'No. 8', '4.081 / 4.0 GPA'],
      pathLabels: ['Argentina', 'Italia', 'Stati Uniti', 'Argentina', 'Italia', 'Stati Uniti'],
      pathCopy: ['Dal 2012 al 2024. Selezione Salta U17.', 'Stagione 2024. Campione con Benetton U16.', 'Campione nazionale High School U19 2026. Selezionato per USA U18.', 'Formazione a Salta.', 'Benetton Rugby.', 'Club attuale, scuola e selezione.', 'Formazione di base, competizione e campione provinciale M15.', 'Selezionato con Salta U17.', 'Campione con Benetton U16.', 'Campione nazionale High School U19 degli Stati Uniti nel 2026.', 'Selezionato per USA U18.', 'Scuola attuale.'],
      positionKickers: ['Hooker', 'No. 8'],
      positionPills: ['Fasi statiche + contatto', 'Lavoro + portatore'],
      positionCopy: ['Profilo forte per giocare hooker.', 'Porta avanzamento, difesa e mobilità dalla terza linea.'],
      positionItems: ['Affidabile nel contatto e nelle fasi statiche.', 'A suo agio nel gioco stretto, nel tackle e negli sforzi ripetuti.', 'Buon profilo per un pack fisico e lavoratore.', 'Corse dirette, tackle e sforzi ripetuti.', 'Utile quando la partita richiede mobilità e presenza fisica.', 'Buona opzione per incidere nel gioco aperto.'],
      positionNotes: ['Ruolo principale.', 'Ruolo principale.'],
      achievementLabels: ['Stati Uniti', 'Selezione', 'Salta, Argentina', 'Treviso, Italia', 'Selezione', 'Charlotte, Stati Uniti'],
      achievementTitles: ['Campione nazionale High School U19', 'USA U18', 'Campione provinciale', 'Campione con Benetton U16', 'Salta U17', 'U17 che gioca U19'],
      achievementCopy: ['Campione nazionale High School U19 degli Stati Uniti con Charlotte Cardinals Rugby Club nel 2026.', 'Selezionato per USA U18.', 'Campione M15, capitano e miglior giocatore della finale.', 'Campione nella stagione 2024 in Italia.', 'Selezionato con Salta U17.', 'Compete una categoria sopra con Charlotte Cardinals Rugby Club.'],
      filmSidebar: ['Video', 'Highlights', 'Contatto, difesa, fasi statiche e livello competitivo.'],
      filmItemTitles: ['Contatto', 'Difesa', 'Fasi statiche e gioco corto', 'Livello competitivo'],
      filmItemCopy: ['Corse dirette e presenza fisica.', 'Tackle e sforzi ripetuti.', 'Lavoro utile nelle fasi strette.', 'Giocatore U17 che compete in U19.'],
      filmButtons: ['Apri su YouTube'],
      galleryCaptions: ['Partecipazione nelle fasi e presenza in campo.', 'Concentrazione prima dell’azione successiva.', 'Fisicità e fiducia nel contatto.', 'Corsa diretta e intensità nel gioco aperto.', 'Sforzi ripetuti e partecipazione in più fasi.', 'Contesto partita e ritmo competitivo.'],
      educationHeading: ['Studente atleta', 'Studio', 'Scuola e GPA.'],
      educationStatTitles: ['Ardrey Kell High School', '4.081 / 4.0 GPA', 'U17 che gioca U19', 'Lingue'],
      educationStatCopy: ['Scuola attuale negli Stati Uniti.', 'GPA attuale.', 'Compete sopra la sua categoria.', 'Spagnolo, inglese e italiano.'],
      contactHeading: ['Contatto', 'Contatto diretto', 'Disponibilità, profilo scolastico e contatto del padre.'],
      contactLabels: ['Email principale', 'Stato attuale', 'Contatto del padre', 'Miglior ruolo'],
      contactValues: ['lopresttiboni@gmail.com', 'Aperto a opportunità sportive e provini', 'Agustin Loprestti', 'Hooker o No. 8'],
      contactButtons: ['Invia email', 'Salva PDF'],
      referencesNote: 'Referenze disponibili su richiesta.',
      toast: 'Email copiata'
    }
  };

  const showToast = (message) => {
    if (!statusToast) return;
    statusToast.textContent = message;
    statusToast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => statusToast.classList.remove('is-visible'), 2200);
  };

  const getHeaderOffset = () => {
    if (!siteHeader) return 20;
    return Math.ceil(siteHeader.getBoundingClientRect().height) + 18;
  };

  const scrollToAnchor = (hash, smooth) => {
    if (!hash) return;
    if (hash === '#top') {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }

    const target = document.querySelector(hash);
    if (!target) return;

    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - getHeaderOffset());
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const nextState = body.dataset.navOpen !== 'true';
      body.dataset.navOpen = String(nextState);
      menuToggle.setAttribute('aria-expanded', String(nextState));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        event.preventDefault();
        scrollToAnchor(hash, true);
        window.history.pushState(null, '', hash);
      }
      body.dataset.navOpen = 'false';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  if (copyEmailButton) {
    copyEmailButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        showToast((translations[activeLanguage] || base).toast || base.toast);
      } catch (error) {
        window.location.href = 'mailto:' + emailAddress;
      }
    });
  }

  if (printPageButton) {
    printPageButton.addEventListener('click', () => window.print());
  }

  let activeLanguage = 'es';
  const applyLanguage = (language) => {
    activeLanguage = language;
    const pack = language === 'es' ? base : { ...base, ...(translations[language] || {}) };
    document.documentElement.lang = language === 'es' ? 'es-AR' : language;
    setText('.brandKicker', pack.brandKicker); setText('.menuToggle', pack.menu); setTexts('.siteNav a', pack.nav); setText('.navCta', pack.navCta);
    setText('.eyebrow', pack.heroEyebrow); setText('.heroLead', pack.heroLead); setTexts('.heroTagline span', pack.heroTags); setTexts('.ctaRow > *', pack.heroButtons); setTexts('.heroStats .metricLabel', pack.heroMetricLabels); setTexts('.heroStats .metricSub', pack.heroMetricSubs);
    setTexts('.sectionHeading .sectionKicker', pack.sectionKickers); setTexts('.sectionHeading .sectionTitle', pack.sectionTitles); setTexts('.sectionHeading .sectionLead', pack.sectionLeads);
    setTexts('#profile .summaryText', pack.profileSummary); setTexts('#profile .detailLabel', pack.detailLabels); setText('.profileQuote p', pack.currentLevel); setTexts('#profile .list li', pack.quickNotes); setTexts('#profile .chipRow .chip', pack.chips);
    setTexts('.pathLabel', pack.pathLabels); setTexts('.pathwayStrip .pathwayItem div span:not(.pathLabel), #journey .pathMeta span:not(.pathLabel), #journey .clubItem span', pack.pathCopy);
    setTexts('#positions .positionCard .sectionKicker', pack.positionKickers); setTexts('#positions .positionPill', pack.positionPills); setTexts('#positions .positionCard p', pack.positionCopy); setTexts('#positions .positionList li', pack.positionItems); setTexts('#positions .positionNote', pack.positionNotes);
    setTexts('#achievements .achievementLabel', pack.achievementLabels); setTexts('#achievements .achievementCard h3', pack.achievementTitles); setTexts('#achievements .achievementCard p', pack.achievementCopy);
    setText('.filmTag', pack.filmSidebar[0]); setText('.filmSidebar h3', pack.filmSidebar[1]); setText('.filmSidebar p', pack.filmSidebar[2]); setTexts('.filmListItem strong', pack.filmItemTitles); setTexts('.filmListItem span', pack.filmItemCopy); setTexts('.filmActions a', pack.filmButtons);
    setTexts('#gallery figcaption', pack.galleryCaptions);
    setText('.educationCard .sectionKicker', pack.educationHeading[0]); setText('.educationCard h3', pack.educationHeading[1]); setText('.educationCard p', pack.educationHeading[2]); setTexts('.educationStat strong', pack.educationStatTitles); setTexts('.educationStat span', pack.educationStatCopy);
    setText('.contactCard .sectionKicker', pack.contactHeading[0]); setText('.contactCard h3', pack.contactHeading[1]); setText('.contactCard p', pack.contactHeading[2]); setTexts('.contactCard .contactLabel', pack.contactLabels); setTexts('.contactCard .contactValue', pack.contactValues); setTexts('.contactActions > *', pack.contactButtons); setText('.referencesNote', pack.referencesNote);
    langButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.lang === language));
  };

  langButtons.forEach((button) => button.addEventListener('click', () => {
    const nextLanguage = button.dataset.lang || 'en';
    window.localStorage.setItem(storageKey, nextLanguage);
    applyLanguage(nextLanguage);
  }));

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentId = '#' + entry.target.id;
        navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === currentId));
      });
    }, { rootMargin: '-38% 0px -48% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const savedLanguage = window.localStorage.getItem(storageKey);
  applyLanguage(['en', 'es', 'fr', 'it'].includes(savedLanguage) ? savedLanguage : 'es');
  const syncHashPosition = () => {
    if (!window.location.hash) return;
    window.setTimeout(() => scrollToAnchor(window.location.hash, false), 80);
  };

  window.addEventListener('load', syncHashPosition);
  window.addEventListener('hashchange', syncHashPosition);
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());
