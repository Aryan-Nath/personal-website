// Smooth scrolling for navigation links and active link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(navLinks).map(link => {
  const id = link.getAttribute('href').substring(1);
  return document.getElementById(id);
});

function onScroll() {
  // Add background to header on scroll
  const header = document.getElementById('header');
  if(window.scrollY > 50){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Highlight nav link based on scroll position
  let fromTop = window.scrollY + 60;
  navLinks.forEach(link => link.classList.remove('active'));
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop <= fromTop && (i === sections.length-1 || sections[i+1].offsetTop > fromTop)) {
      navLinks[i].classList.add('active');
      break;
    }
  }
}

function smoothScroll(e) {
  e.preventDefault();
  const id = this.getAttribute('href').substring(1);
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

navLinks.forEach(link => link.addEventListener('click', smoothScroll));
window.addEventListener('scroll', () => {
  onScroll();
  fadeInSections();
});

// Fade-in function for sections
const fadeElements = document.querySelectorAll('.fade-in');
function fadeInSections() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.85){
      el.classList.add('visible');
    }
  });
}

window.addEventListener('load', () => {
  fadeInSections();
  onScroll();
});
