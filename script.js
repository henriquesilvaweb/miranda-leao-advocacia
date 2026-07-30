'use strict';

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-navigation]');
const navigationLinks = navigation?.querySelectorAll('a');
const faqButtons = document.querySelectorAll('.faq-item button');
const currentYear = document.querySelector('[data-current-year]');
const desktopMedia = window.matchMedia('(min-width: 64rem)');

function setMenuState(isOpen) {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

menuToggle?.addEventListener('click', () => {
  setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navigationLinks?.forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

desktopMedia.addEventListener('change', (event) => {
  if (event.matches) setMenuState(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenuState(false);
    menuToggle.focus();
  }
});

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answerId = button.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);
    const willOpen = button.getAttribute('aria-expanded') !== 'true';

    button.setAttribute('aria-expanded', String(willOpen));
    if (answer) answer.hidden = !willOpen;
  });
});

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
