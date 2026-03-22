(function () {
  const body = document.body;
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
    referencesNote: document.querySelector('.referencesNote').textContent.trim(),
    footer: 'Rocco Loprestti. Rugby highlights and recruiting profile.',
    toast: 'Email copied to clipboard'
  };

  const translations = {
    es: {
      brandKicker: 'Perfil Internacional de Rugby', nav: ['Perfil', 'Posiciones', 'Experiencia', 'Logros', 'Video', 'Galeria', 'Contacto'], navCta: 'Contacto Recruiting', heroEyebrow: 'Forward U17 Jugando en U19', heroLead: 'Jugador U17 compitiendo en U19, actualmente en Charlotte Cardinals Rugby Club y Ardrey Kell High School. Posiciones principales: 1, 2, 3, 6, 7 y 8. El goal-kicking es una habilidad extra.', heroTags: ['1 / 2 / 3 / 6 / 7 / 8', 'U17 Jugando U19', 'Goal-Kicking Extra'], heroButtons: ['Ver Highlights', 'Email a Rocco', 'Copiar Email'], heroMetricLabels: ['Altura / Peso', 'Posiciones', 'Competencia', 'Academico'], heroMetricSubs: ['6\'1\" y 220 lb.', 'Tambien juega 6, 7 y 8.', 'Juega por encima de su edad.', 'GPA actual.'],
      sectionKickers: ['Perfil', 'Posiciones', 'Experiencia', 'Logros', 'Video', 'Contacto'], sectionTitles: ['Perfil', 'Posiciones', 'Experiencia', 'Logros', 'Video', 'Contacto'], sectionLeads: ['Vista rapida para coaches y recruiters.', 'Posiciones principales y habilidad extra.', 'Argentina, Italia y Estados Unidos.', 'Lista corta de resultados clave.', 'Reel corto con contacto, carries y defensa.', 'Contacto y academico.'],
      profileSummary: ['Forward fisico con buen contacto, set-piece solido y capacidad para jugar por encima de su edad.', 'Jugador U17 compitiendo actualmente en U19. Posiciones principales: 1, 2, 3, 6, 7 y 8.'], detailLabels: ['Nombre Completo', 'Fecha de Nacimiento', 'Rango Principal', 'Patada', 'Escuela Actual', 'Club Actual'], currentLevel: 'Jugador U17 compitiendo en U19.', quickNotes: ['Posiciones principales: 1, 2, 3, 6, 7 y 8.', 'Fuerte en contacto, defensa y set-piece.', 'Puede patear a los palos si hace falta.', 'Jugo en Argentina, Italia y Estados Unidos.', 'Habla espanol, ingles e italiano.'], chips: ['U17 Jugando U19', '1 / 2 / 3 / 6 / 7 / 8', 'Goal-Kicking Extra', '4.081 / 4.0 GPA'],
      filmSidebar: ['Notas del Video', 'Que Mirar', 'Puntos cortos para que un coach los escanee rapido.'], filmItemTitles: ['Carry al Contacto', 'Work Rate Defensivo', 'Set-Piece y Juego Corto', 'Nivel de Competencia'], filmItemCopy: ['Carrera directa y fisica.', 'Tackles y esfuerzo repetido.', 'Trabajo util en fases cerradas.', 'Jugador U17 compitiendo contra U19.'], filmButtons: ['Abrir en YouTube', 'Abrir Reel Local'],
      educationHeading: ['Student-Athlete', 'Academico', 'Escuela actual y GPA.'], contactHeading: ['Contacto', 'Abierto a Oportunidades', 'Para coaches, academias, clubes y recruiters.'], contactLabels: ['Email Principal', 'Estado Actual', 'Mejor Encaje'], contactButtons: ['Enviar Email', 'Guardar en PDF'], referencesNote: 'Referencias disponibles a pedido.', footer: 'Rocco Loprestti. Highlights de rugby y perfil recruiting.', toast: 'Email copiado'
    },
    fr: {
      brandKicker: 'Profil International Rugby', nav: ['Profil', 'Postes', 'Experience', 'Distinctions', 'Video', 'Galerie', 'Contact'], navCta: 'Contact Recruiting', heroEyebrow: 'Avant U17 Jouant en U19', heroLead: 'Joueur U17 evoluant en U19, actuellement avec Charlotte Cardinals Rugby Club et Ardrey Kell High School. Postes principaux : 1, 2, 3, 6, 7 et 8. Le tir au but est une competence supplementaire.', heroTags: ['1 / 2 / 3 / 6 / 7 / 8', 'U17 Jouant U19', 'Option Tirs au But'], heroButtons: ['Voir les Highlights', 'Envoyer un Email', 'Copier l\'Email'], heroMetricLabels: ['Taille / Poids', 'Postes', 'Competition', 'Academique'], heroMetricSubs: ['6\'1\" et 220 lb.', 'Joue aussi 6, 7 et 8.', 'Joue au-dessus de son age.', 'GPA actuel.'],
      sectionKickers: ['Profil', 'Postes', 'Experience', 'Distinctions', 'Video', 'Contact'], sectionTitles: ['Profil', 'Postes', 'Experience', 'Distinctions', 'Video', 'Contact'], sectionLeads: ['Vue rapide pour coaches et recruteurs.', 'Postes principaux et competence supplementaire.', 'Argentine, Italie et Etats-Unis.', 'Courte liste de resultats clefs.', 'Reel court avec contact, carries et defense.', 'Contact et academique.'],
      profileSummary: ['Avant physique avec un bon contact, un set-piece solide et la capacite de jouer au-dessus de sa categorie d\'age.', 'Joueur U17 evoluant actuellement en U19. Postes principaux : 1, 2, 3, 6, 7 et 8.'], detailLabels: ['Nom Complet', 'Date de Naissance', 'Gamme Principale', 'Jeu au Pied', 'Ecole Actuelle', 'Club Actuel'], currentLevel: 'Joueur U17 evoluant en U19.', quickNotes: ['Postes principaux : 1, 2, 3, 6, 7 et 8.', 'Fort dans le contact, la defense et le set-piece.', 'Peut tirer au but si besoin.', 'A joue en Argentine, en Italie et aux Etats-Unis.', 'Parle espagnol, anglais et italien.'], chips: ['U17 Jouant U19', '1 / 2 / 3 / 6 / 7 / 8', 'Option Tirs au But', '4.081 / 4.0 GPA'],
      filmSidebar: ['Notes Video', 'A Regarder', 'Points courts que les coaches peuvent lire vite.'], filmItemTitles: ['Carry dans le Contact', 'Volume Defensif', 'Set-Piece et Jeu Court', 'Niveau de Competition'], filmItemCopy: ['Course directe et physique.', 'Plaquages et efforts repetes.', 'Travail utile dans les phases serrees.', 'Joueur U17 jouant contre U19.'], filmButtons: ['Ouvrir sur YouTube', 'Ouvrir le Reel Local'],
      educationHeading: ['Student-Athlete', 'Academique', 'Ecole actuelle et GPA.'], contactHeading: ['Contact', 'Ouvert aux Opportunites', 'Pour coaches, academies, clubs et recruteurs.'], contactLabels: ['Email Principal', 'Statut Actuel', 'Meilleur Profil'], contactButtons: ['Envoyer un Email', 'Enregistrer en PDF'], referencesNote: 'References disponibles sur demande.', footer: 'Rocco Loprestti. Highlights rugby et profil de recrutement.', toast: 'Email copie'
    },
    it: {
      brandKicker: 'Profilo Rugby Internazionale', nav: ['Profilo', 'Ruoli', 'Esperienza', 'Riconoscimenti', 'Video', 'Galleria', 'Contatto'], navCta: 'Contatto Recruiting', heroEyebrow: 'Forward U17 che Gioca in U19', heroLead: 'Giocatore U17 che compete in U19, attualmente con Charlotte Cardinals Rugby Club e Ardrey Kell High School. Ruoli principali: 1, 2, 3, 6, 7 e 8. Il goal-kicking e una skill extra.', heroTags: ['1 / 2 / 3 / 6 / 7 / 8', 'U17 che Gioca U19', 'Goal-Kicking Extra'], heroButtons: ['Guarda Highlights', 'Email a Rocco', 'Copia Email'], heroMetricLabels: ['Altezza / Peso', 'Ruoli', 'Competizione', 'Accademico'], heroMetricSubs: ['6\'1\" e 220 lb.', 'Gioca anche 6, 7 e 8.', 'Gioca sopra la sua categoria.', 'GPA attuale.'],
      sectionKickers: ['Profilo', 'Ruoli', 'Esperienza', 'Riconoscimenti', 'Video', 'Contatto'], sectionTitles: ['Profilo', 'Ruoli', 'Esperienza', 'Riconoscimenti', 'Video', 'Contatto'], sectionLeads: ['Vista rapida per coach e recruiter.', 'Ruoli principali e skill extra.', 'Argentina, Italia e Stati Uniti.', 'Lista breve di risultati chiave.', 'Reel corto con contatto, carries e difesa.', 'Contatto e accademico.'],
      profileSummary: ['Forward fisico con buon contatto, set-piece solido e capacita di giocare sopra la sua fascia d\'eta.', 'Giocatore U17 che compete attualmente in U19. Ruoli principali: 1, 2, 3, 6, 7 e 8.'], detailLabels: ['Nome Completo', 'Data di Nascita', 'Ruoli Principali', 'Calcio', 'Scuola Attuale', 'Club Attuale'], currentLevel: 'Giocatore U17 che compete in U19.', quickNotes: ['Ruoli principali: 1, 2, 3, 6, 7 e 8.', 'Forte nel contatto, nella difesa e nel set-piece.', 'Puo calciare ai pali se necessario.', 'Ha giocato in Argentina, Italia e Stati Uniti.', 'Parla spagnolo, inglese e italiano.'], chips: ['U17 che Gioca U19', '1 / 2 / 3 / 6 / 7 / 8', 'Goal-Kicking Extra', '4.081 / 4.0 GPA'],
      filmSidebar: ['Note Video', 'Cosa Guardare', 'Punti brevi che un coach puo leggere velocemente.'], filmItemTitles: ['Carry nel Contatto', 'Work Rate Difensivo', 'Set-Piece e Gioco Corto', 'Livello di Competizione'], filmItemCopy: ['Corsa diretta e fisica.', 'Tackle e sforzo ripetuto.', 'Lavoro utile nelle fasi strette.', 'Giocatore U17 contro U19.'], filmButtons: ['Apri su YouTube', 'Apri Reel Locale'],
      educationHeading: ['Student-Athlete', 'Accademico', 'Scuola attuale e GPA.'], contactHeading: ['Contatto', 'Aperto a Opportunita', 'Per coach, academy, club e recruiter.'], contactLabels: ['Email Principale', 'Stato Attuale', 'Profilo Migliore'], contactButtons: ['Invia Email', 'Salva in PDF'], referencesNote: 'Referenze disponibili su richiesta.', footer: 'Rocco Loprestti. Highlights rugby e profilo recruiting.', toast: 'Email copiato'
    }
  };

  const showToast = (message) => {
    if (!statusToast) return;
    statusToast.textContent = message;
    statusToast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => statusToast.classList.remove('is-visible'), 2200);
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const nextState = body.dataset.navOpen !== 'true';
      body.dataset.navOpen = String(nextState);
      menuToggle.setAttribute('aria-expanded', String(nextState));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
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

  let activeLanguage = 'en';
  const applyLanguage = (language) => {
    activeLanguage = language;
    const pack = language === 'en' ? base : { ...base, ...(translations[language] || {}) };
    document.documentElement.lang = language;
    setText('.brandKicker', pack.brandKicker); setText('.menuToggle', pack.menu); setTexts('.siteNav a', pack.nav); setText('.navCta', pack.navCta);
    setText('.eyebrow', pack.heroEyebrow); setText('.heroLead', pack.heroLead); setTexts('.heroTagline span', pack.heroTags); setTexts('.ctaRow > *', pack.heroButtons); setTexts('.heroStats .metricLabel', pack.heroMetricLabels); setTexts('.heroStats .metricSub', pack.heroMetricSubs);
    setTexts('.sectionHeading .sectionKicker', pack.sectionKickers); setTexts('.sectionHeading .sectionTitle', pack.sectionTitles); setTexts('.sectionHeading .sectionLead', pack.sectionLeads);
    setTexts('#profile .summaryText', pack.profileSummary); setTexts('#profile .detailLabel', pack.detailLabels); setText('.profileQuote p', pack.currentLevel); setTexts('#profile .list li', pack.quickNotes); setTexts('#profile .chipRow .chip', pack.chips);
    setText('.filmTag', pack.filmSidebar[0]); setText('.filmSidebar h3', pack.filmSidebar[1]); setText('.filmSidebar p', pack.filmSidebar[2]); setTexts('.filmListItem strong', pack.filmItemTitles); setTexts('.filmListItem span', pack.filmItemCopy); setTexts('.filmActions a', pack.filmButtons);
    setText('.educationCard .sectionKicker', pack.educationHeading[0]); setText('.educationCard h3', pack.educationHeading[1]); setText('.educationCard p', pack.educationHeading[2]); setText('.contactCard .sectionKicker', pack.contactHeading[0]); setText('.contactCard h3', pack.contactHeading[1]); setText('.contactCard p', pack.contactHeading[2]); setTexts('.contactCard .contactLabel', pack.contactLabels); setTexts('.contactActions > *', pack.contactButtons); setText('.referencesNote', pack.referencesNote);
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
  const browserLanguage = (navigator.language || 'en').slice(0, 2).toLowerCase();
  applyLanguage(translations[savedLanguage] ? savedLanguage : (translations[browserLanguage] ? browserLanguage : 'en'));
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());
