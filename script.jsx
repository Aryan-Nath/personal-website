// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.getAttribute('href').substring(1);
    document.getElementById(target).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade up animation on scroll
const fadeElements = document.querySelectorAll('.fade-up');

function checkFade() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
