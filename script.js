const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let currentIndex = 0;

function isMobile() {
  return window.matchMedia && window.matchMedia('(max-width: 576px)').matches;
}

function showSlide(index) {
  if (!slides || slideItems.length === 0) return;

  if (index < 0) currentIndex = slideItems.length - 1;
  else if (index >= slideItems.length) currentIndex = 0;
  else currentIndex = index;

  slides.style.transform = translateX(-${currentIndex * 100}%);
}

function lockMobileSecondSlide() {
  if (!slides || slideItems.length < 2) return;
  currentIndex = 1;
  slides.style.transform = 'translateX(0)';
}

if (prev && next && slides && slideItems.length) {
  if (!isMobile()) {
    prev.addEventListener('click', () => showSlide(currentIndex - 1));
    next.addEventListener('click', () => showSlide(currentIndex + 1));
  } else {
    lockMobileSecondSlide();
  }
}

window.addEventListener('resize', () => {
  if (isMobile()) lockMobileSecondSlide();
});

const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-content a');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.mobile-nav')) {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.reveal');
  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: 0.1 });
    sections.forEach((sec) => observer.observe(sec));
  }

  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  if (isMobile()) lockMobileSecondSlide();
});