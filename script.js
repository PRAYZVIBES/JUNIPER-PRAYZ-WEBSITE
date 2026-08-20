const copy = {
  en: {
    'a11y.skip':'Skip to content','a11y.menu':'Open menu','nav.about':'About','nav.live':'Live','nav.formats':'Formats','nav.shop':'Shop','nav.book':'Booking',
    'hero.label':'Live duo / Franconia','hero.intro':'Voice, guitar and rhythm. Live on streets, in cafés and gardens, at private gatherings and in small venues.','hero.watch':'Watch live clips','hero.book':'Booking <span aria-hidden="true">↘</span>','hero.caption':'Live duo from Franconia',
    'about.label':'The duo','about.title':'Live music for streets<br><em>and small venues.</em>','about.body':'Juniper & Prayz perform as a compact duo with voice, guitar and rhythm. The setup stays light and can be adapted to the place and occasion.','about.note':'Based in Franconia. Available by arrangement.',
    'live.label':'Live clips','live.title':'Recent<br><em>performances.</em>','live.intro':'Four short clips from streets, festivals and outdoor shows.','live.play':'Play Instagram reel','live.card1':'Live at Annafest','live.card2Title':'Love for music','live.card2':'Outdoor performance','live.card3Title':'In motion','live.card3':'Between live sets','live.card4':'Live at Rudolstadt Festival','live.privacy':'Instagram connects only after you choose a reel.',
    'formats.label':'Formats','formats.title':'Where we<br><em>play.</em>','formats.intro':'For booking, send the date, location, occasion and approximate audience size.','formats.streetTitle':'Street & square','formats.streetBody':'A compact setup for public spaces and busking.','formats.cafeTitle':'Café & garden','formats.cafeBody':'Acoustic or lightly amplified, depending on the space.','formats.privateTitle':'Private gathering','formats.privateBody':'Music for celebrations and informal events.','formats.venueTitle':'Small venue','formats.venueBody':'A duo set for clubs, cultural spaces and small stages.',
    'shop.label':'Shop','shop.title':'Merch will<br><em>follow later.</em>','shop.body':'The shop is on hold until the right production and fulfilment partner has been selected. This section will connect directly to the finished store when it is ready.','shop.status':'Store integration not active',
    'book.label':'Booking','book.title':'Invite<br><em>JUNIPER & PRAYZ.</em>','book.body':'Please send the date, location, occasion, expected audience and available sound setup.','book.cta':'Send booking request','footer.line':'Live duo from Franconia.','footer.imprint':'Imprint','footer.privacy':'Privacy','media.notice':'Playing this reel connects your browser to Instagram. Instagram’s privacy terms then apply.','media.open':'Open on Instagram ↗'
  },
  de: {
    'a11y.skip':'Zum Inhalt springen','a11y.menu':'Menü öffnen','nav.about':'Über uns','nav.live':'Live','nav.formats':'Formate','nav.shop':'Shop','nav.book':'Booking',
    'hero.label':'Live-Duo / Franken','hero.intro':'Stimme, Gitarre und Rhythmus. Live auf Straßen, in Cafés und Gärten, bei privaten Feiern und in kleinen Clubs.','hero.watch':'Live-Clips ansehen','hero.book':'Booking <span aria-hidden="true">↘</span>','hero.caption':'Live-Duo aus Franken',
    'about.label':'Das Duo','about.title':'Live-Musik für Straßen<br><em>und kleine Bühnen.</em>','about.body':'Juniper & Prayz spielen als kompaktes Duo mit Stimme, Gitarre und Rhythmus. Das Setup bleibt leicht und lässt sich an Ort und Anlass anpassen.','about.note':'Aus Franken. Buchbar nach Absprache.',
    'live.label':'Live-Clips','live.title':'Aktuelle<br><em>Auftritte.</em>','live.intro':'Vier kurze Clips von Straßen, Festivals und Open-Air-Auftritten.','live.play':'Instagram-Reel abspielen','live.card1':'Live auf dem Annafest','live.card2Title':'Love for music','live.card2':'Open-Air-Auftritt','live.card3Title':'Unterwegs','live.card3':'Zwischen zwei Auftritten','live.card4':'Live beim Rudolstadt Festival','live.privacy':'Instagram wird erst verbunden, wenn du ein Reel auswählst.',
    'formats.label':'Formate','formats.title':'Wo wir<br><em>spielen.</em>','formats.intro':'Für eine Anfrage brauchen wir Datum, Ort, Anlass und die ungefähre Gästezahl.','formats.streetTitle':'Straße & Platz','formats.streetBody':'Ein kompaktes Setup für öffentliche Plätze und Straßenmusik.','formats.cafeTitle':'Café & Garten','formats.cafeBody':'Akustisch oder leicht verstärkt – je nach Raum.','formats.privateTitle':'Private Feier','formats.privateBody':'Musik für Feiern und persönliche Veranstaltungen.','formats.venueTitle':'Kleine Bühne','formats.venueBody':'Ein Duo-Set für Clubs, Kulturorte und kleine Bühnen.',
    'shop.label':'Shop','shop.title':'Merch kommt<br><em>später.</em>','shop.body':'Der Shop bleibt geschlossen, bis Produktion und Versand mit einem passenden Partner geklärt sind. Sobald alles steht, wird dieser Bereich direkt mit dem fertigen Store verbunden.','shop.status':'Shop-Anbindung noch nicht aktiv',
    'book.label':'Booking','book.title':'JUNIPER & PRAYZ<br><em>anfragen.</em>','book.body':'Schickt uns bitte Datum, Ort, Anlass, ungefähre Gästezahl und Informationen zur vorhandenen Tontechnik.','book.cta':'Booking-Anfrage senden','footer.line':'Live-Duo aus Franken.','footer.imprint':'Impressum','footer.privacy':'Datenschutz','media.notice':'Beim Abspielen verbindet sich dein Browser mit Instagram. Dann gelten die Datenschutzbedingungen von Instagram.','media.open':'Auf Instagram öffnen ↗'
  }
};

const languageButtons = document.querySelectorAll('[data-language]');
const applyLanguage = (language) => {
  const lang = copy[language] ? language : 'en';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-copy]').forEach((node) => {
    const value = copy[lang][node.dataset.copy];
    if (value) node.innerHTML = value;
  });
  languageButtons.forEach((button) => {
    const active = button.dataset.language === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('juniper-prayz-language', lang); } catch (_) {}
};

let initialLanguage = 'en';
try { initialLanguage = localStorage.getItem('juniper-prayz-language') || (navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'); } catch (_) {}
applyLanguage(initialLanguage);
languageButtons.forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.language)));

const header = document.querySelector('[data-header]');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const nav = document.querySelector('[data-nav]');
const menuButton = document.querySelector('[data-menu-toggle]');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('[data-reveal]').forEach((node) => node.classList.add('is-visible'));
} else {
  const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
  }), { threshold: .08, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('[data-reveal]').forEach((node) => reveal.observe(node));
}

const dialog = document.querySelector('[data-media-dialog]');
const frame = document.querySelector('[data-media-frame]');
const mediaTitle = document.querySelector('[data-media-title]');
const mediaLink = document.querySelector('[data-media-link]');
let lastTrigger = null;
document.querySelectorAll('[data-open-reel]').forEach((button) => button.addEventListener('click', () => {
  lastTrigger = button;
  const id = button.dataset.reelId;
  const title = button.dataset.reelTitle || 'Live clip';
  const url = `https://www.instagram.com/reel/${id}/`;
  mediaTitle.textContent = title;
  mediaLink.href = url;
  frame.innerHTML = `<iframe title="${title}" src="${url}embed" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="eager"></iframe>`;
  dialog.showModal();
}));
const closeMedia = () => {
  frame.innerHTML = '';
  if (dialog?.open) dialog.close();
  lastTrigger?.focus();
};
document.querySelector('[data-close-media]')?.addEventListener('click', closeMedia);
dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeMedia(); });
dialog?.addEventListener('cancel', (event) => { event.preventDefault(); closeMedia(); });
document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
