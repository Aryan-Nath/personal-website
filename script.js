document.addEventListener("DOMContentLoaded", () => {
  const sailboat = document.getElementById("sailboat");
  const path = document.getElementById("wavePath");
  const careerSection = document.getElementById("career");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute("href")));

  // Scroll related for sailboat
  const pathLength = path.getTotalLength();

  function positionSailboat() {
    const rect = careerSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress through career section (0 to 1)
    let progress = 0;

    if(rect.top < viewportHeight && rect.bottom > 0) {
      progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
    }

    // Get SVG point along path at scroll progress
    const pointAtLength = path.getPointAtLength(progress * pathLength);
    
    // Position the sailboat
    sailboat.style.top = `${pointAtLength.y - 20}px`;
    sailboat.style.left = `${pointAtLength.x - 20}px`;
    
    // Optional: slight rotation for bobbing effect
    const rotation = Math.sin(progress * Math.PI * 4) * 10; // oscillates between -10 and 10
    sailboat.style.transform = `rotate(${rotation}deg)`;
  }

  window.addEventListener("scroll", () => {
    positionSailboat();
    highlightNav();
    fadeInSections();
  });

  // Initial position on load
  positionSailboat();

  // Fade in sections on scroll
  const fadeElements = document.querySelectorAll(".fade-in");
  function fadeInSections() {
    fadeElements.forEach(el => {
      if(el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add("visible");
      }
    });
  }
  fadeInSections();

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({behavior: "smooth"});
    });
  });

  // Highlight nav link based on scroll position
  function highlightNav() {
    let scrollPos = window.scrollY + window.innerHeight / 4;
    sections.forEach((section, index) => {
      if(section.offsetTop <= scrollPos && (index === sections.length - 1 || sections[index + 1].offsetTop > scrollPos)) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  }

  highlightNav();
});
