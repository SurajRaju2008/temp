// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu if open
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
});

// Modal functionality
const modal = document.getElementById('emailModal');

function openModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

let isFormSubmitted = false;

function closeModal() {
  if (!isFormSubmitted) return; 
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal && isFormSubmitted) {
    closeModal();
  }
});

// Auto-open modal after 3 seconds
setTimeout(() => {
  if (!localStorage.getItem('hawthornModalShown')) {
    openModal();
    localStorage.setItem('hawthornModalShown', 'true');
  }
}, 3000);

// Form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  console.log('Form submitted:', data);
  
  // Show success message
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = `
    <span class="close" onclick="closeModal()">&times;</span>
    <div class="modal-header">
      <h2>Thank You!</h2>
      <p>We've received your information and will be in touch soon with exclusive details about Hawthorn Place.</p>
      <button class="btn btn-primary" onclick="closeModal()">Continue Exploring</button>
    </div>
  `;
  
  isFormSubmitted = true;

  setTimeout(() => {
    closeModal();
  }, 3000);
}

// Scroll to section utility function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature-card, .home-card, .contact-item');
  animateElements.forEach(el => observer.observe(el));
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    if (this.type !== 'submit') {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    }
  });
});
// Reviews Slider
const reviews = [
  { img: "/temp/pictures/pic1.png" },
  { img: "/temp/pictures/pic12.png" },
  { img: "/temp/pictures/pic2.png" },
  { img: "/temp/pictures/pic22.png" },
  { img: "/temp/pictures/pic3.png" },
  { img: "/temp/pictures/pic32.png" }
];

const reviewsTrack = document.querySelector('.reviews-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// Create review cards
reviews.forEach(review => {
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';
  reviewCard.innerHTML = `
    <img src="${review.img}" alt="Client Review" class="review-img" />
  `;
  reviewsTrack.appendChild(reviewCard);
});


// Slider controls

reviews.forEach(review => {
  if (!review.image || !review.name) return; // Skip if data is missing

  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';
  reviewCard.innerHTML = `
    <img src="${review.image}" alt="${review.name}" style="width:100%; height:auto;">
    <h3 style="text-align:center; padding:0.5rem 0;">${review.name}</h3>
  `;
  reviewsTrack.appendChild(reviewCard);
});
// Make functions globally accessible for inline event handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.handleFormSubmit = handleFormSubmit;
window.scrollToSection = scrollToSection;