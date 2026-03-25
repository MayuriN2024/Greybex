// Initialize Lucide Icons
lucide.createIcons();

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-quad',
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between menu and x
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.setAttribute('data-lucide', 'x');
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'white';
      navLinks.style.padding = '2rem';
      navLinks.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
      navLinks.style.zIndex = '1001';
    } else {
      icon.setAttribute('data-lucide', 'menu');
      navLinks.style.display = 'none';
    }
    lucide.createIcons();
  });
}

// Contact Form Submission (Formspree Integration)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    const formData = new FormData(contactForm);
    
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#2ecc71';
        contactForm.reset();
      } else {
        const data = await response.json();
        btn.textContent = 'Error Occurred';
        btn.style.backgroundColor = '#e74c3c';
        console.error('Formspree Error:', data);
      }
    } catch (error) {
      btn.textContent = 'Connection Error';
      btn.style.backgroundColor = '#e74c3c';
      console.error('Fetch Error:', error);
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
      btn.disabled = false;
    }, 4000);
  });
}

// Navbar Scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '1.25rem 0';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          menuBtn.click();
        }
      }
    }
  });
});
