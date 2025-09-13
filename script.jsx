// Smooth scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior: "smooth"});
}

// Animated form feedback (faux, for demo only)
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const btn = form.querySelector('.send-btn');
    btn.textContent = "Sent!";
    btn.style.background = "#38b000";
    setTimeout(() => {
      btn.textContent = "Send";
      btn.style.background = "";
      form.reset();
    }, 2100);
  });
});
