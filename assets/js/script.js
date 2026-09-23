const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const reveals = document.querySelectorAll('.reveal');
const cursorGlow = document.querySelector('.cursor-glow');


menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', open);
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('nav-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((element) => observer.observe(element));

window.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(pointer: fine)').matches) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});


document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('pointermove', (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const box = element.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    element.style.transform = `translate(${x * .2}px, ${y * .2}px)`;
  });
  element.addEventListener('pointerleave', () => {
    element.style.transform = '';
  });
});

function showFullImage(text) {
  let projectType = text;
  switch (projectType) {
    case "banner":
      imgUrl = "assets/images/banner.jpg";
      break;
    case "social":
      imgUrl = "assets/images/sm-design.png";
      break;
    case "b-card":
      imgUrl = "assets/images/b-card.png";
      break;
    case "calendar":
      imgUrl = "assets/images/calendar-designs.png";
      break;
    case "flyer-1":
      imgUrl = "assets/images/con-img1.jpg";
      break;
    case "flyer-2":
      imgUrl = "assets/images/con-img2.jpg";
      break;
    case "flyer-3":
      imgUrl = "assets/images/con-img3.jpg";
      break;
    case "flyer-4":
      imgUrl = "assets/images/con-img4.jpg";
      break;
    case "flyer-5":
      imgUrl = "assets/images/con-img5.jpg";
      break;
    case "flyer-6":
      imgUrl = "assets/images/con-img6.jpg";
      break;
    case "logo1":
      imgUrl = "assets/images/logo1.jpg";
      break;
    case "logo2":
      imgUrl = "assets/images/logo2.png";
      break;
    case "logo3":
      imgUrl = "assets/images/logo3.jpg";
      break;
    case "logo4":
      imgUrl = "assets/images/logo4.jpg";
      break;
  
    default:
      break;
  }
  const dialog = document.getElementById('dialog');
  const fullImage = document.getElementById('fullImage');
  fullImage.src = imgUrl;

  dialog.classList.toggle('d-none');
}

function closeImage() {
  const dialog = document.getElementById('dialog');
  dialog.classList.toggle('d-none');
}

const testimonialTrack = document.getElementById('testimonialTrack');
const testimonials = document.querySelectorAll('.testimonial-item');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

//determine visible cards
function getVisibleCards() {
  return 1;
}

//update carousel
function updateCarousel() {
  const visibleCards = getVisibleCards();
  const cardWidth = testimonials[0].offsetWidth;
  const gap = 24;
  const movement = currentIndex * (cardWidth + gap);
  
  testimonialTrack.style.transform = `translateX(-${movement}px)`;

  //updateDots
  const maxIndex = testimonials.length - visibleCards;

  const dotIndex = Math.round(currentIndex / Math.max(1, maxIndex / (dots.length - 1)));

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === dotIndex);
  });
}

//Next 
next.addEventListener("click", () => {
  const visibleCards = getVisibleCards();
  const maxIndex = testimonials.length - visibleCards;

  if(currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
});

//Previous
prev.addEventListener("click", () => {
  const visibleCards = getVisibleCards();
  const maxIndex = testimonials.length - visibleCards;

  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;
  }
  updateCarousel();
});

//dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const visibleCards = getVisibleCards();
    const maxIndex = testimonials.length - visibleCards;

    currentIndex = Math.round(index * maxIndex / (dots.length - 1));
    updateCarousel();
  });
});

updateCarousel();