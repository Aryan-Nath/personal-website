// Smooth scrolling and highlight nav link for section
const navLinks = document.querySelectorAll('.nav-link');
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href').substring(1));
const sections = sectionIds.map(id => document.getElementById(id));

function onScroll() {
  // Navigation highlight
  let fromTop = window.scrollY + 60;
  navLinks.forEach(link => link.classList.remove('active'));
  for(let i=0;i<sections.length;i++) {
    const sec = sections[i];
    if (sec.offsetTop <= fromTop && (i === sections.length-1 || sections[i+1].offsetTop > fromTop)) {
      navLinks[i].classList.add('active');
      break;
    }
  }
  // Fade-in sections
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', onScroll);

// Smooth scroll
navLinks.forEach(link => link.addEventListener('click',function(e){
  e.preventDefault();
  const id = this.getAttribute('href').substring(1);
  document.getElementById(id).scrollIntoView({behavior: "smooth"});
}));

window.addEventListener('load', onScroll);

// Optional: Prevent form reload on submit for demo
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector(".contact-form");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      form.reset();
      alert('Message sent! (demo only)');
    });
  }
});
