const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const reveals = document.querySelectorAll('.reveal');
const cursorGlow = document.querySelector('.cursor-glow');

const dialog = document.getElementById('dialog');
const fullImage = document.getElementById('fullImage');
const closeButton = dialog.querySelector(".close-btn");


if (menuButton && header) {
  menuButton.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".sr-only").textContent =
      open ? "Close navigation" : "Open navigation";
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header?.classList.remove('nav-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header?.classList.contains("nav-open")) {
    header.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.focus();
  }
});

const mobileBreakpoint = window.matchMedia("(max-width: 992px)");

mobileBreakpoint.addEventListener("change", (event) => {
  if (!event.matches) {
    header?.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12
  });

  reveals.forEach((element) => {
    observer.observe(element);
  });
} else {
  reveals.forEach((element) => {
    element.classList.add("is-visible");
  });
}
const finePointer = window.matchMedia('(pointer: fine)');

window.addEventListener("pointermove", (event) => {
  if (!finePointer.matches || !cursorGlow) {
    return;
  }

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
}, { passive: true });

document.querySelectorAll('.magnetic').forEach((element) => {

  let box;

  element.addEventListener('pointerenter', () => {
    if (!finePointer.matches) return;

    box = element.getBoundingClientRect();
  });

  element.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || !box) return;

    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;

    element.style.transform =
      `translate(${x * .2}px, ${y * .2}px)`;
  });

  element.addEventListener('pointerleave', () => {
    element.style.transform = '';
    box = null;
  });

});

let lastFocusedElement = null;
closeButton.addEventListener("click", () => {
  dialog.close();
});
function showFullImage(text) {
  lastFocusedElement = document.activeElement;
  let imgUrl;
  switch (text) {
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
 
  // const dialog = document.getElementById('dialog');
  const fullImage = document.getElementById('fullImage');
  fullImage.src = imgUrl;
  fullImage.alt = "Expanded project preview";

  // dialog.classList.remove('d-none');
  dialog.showModal();
}

function closeImage() {
  const dialog = document.getElementById('dialog');
  // dialog.classList.add('d-none');
  if (dialog.open) {
    dialog.close();
  }
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

dialog.addEventListener("close", () => {
  fullImage.src = "";
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }

  lastFocusedElement = null;
});

const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-item");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const currentNumber = document.querySelector(".progress-current");
const progressBar = document.querySelector(".progress-bar");
const carousel = document.querySelector(".testimonials-container");
const carouselStatus = document.querySelector(".carousel-status");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let currentIndex = 0;
let autoPlay = null;
let isAutoplayRunning = false;
let isHovered = false;
let isTouching = false;
let isPageHidden = document.hidden;
let isFocused = false;
let isCarouselVisible = false;


const carouselObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    isCarouselVisible = entry.intersectionRatio >= 0.35;

    updateAutoplayState();
  },
  {
    threshold: 0.35
  }
);

//update Carousel
function updateCarousel(userInitiated = false) {
  const totalSlides = cards.length;

  //move one card
  track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

  //update number
  currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");

  //carousel status
  carouselStatus.setAttribute(
    "aria-live",
    userInitiated ? "polite" : "off"
  );

  carouselStatus.textContent =
    `Testimonial ${currentIndex + 1} of ${cards.length}`;

  //update progress
  const progress = ((currentIndex + 1) / totalSlides) * 100;
  progressBar.style.width = `${progress}%`;
}

//Next
function nextSlide(userInitiated = false) {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel(userInitiated);
}
//Previous
function previousSlide(userInitiated = false) {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel(userInitiated);
}

//Buttons
nextButton.addEventListener("click", () => {
  nextSlide(true);
  resetAutoplayTimer();
});

prevButton.addEventListener("click", () => {
  previousSlide(true);
  resetAutoplayTimer();
});

function updateAutoplayState() {
  const shouldRun =
    isCarouselVisible &&
    !isHovered &&
    !isTouching &&
    !isPageHidden &&
    !isFocused &&
    !prefersReducedMotion.matches;

  if (shouldRun) {
    startAutoPlay();
  } else {
    stopAutoplay();
  }
}

function resetAutoplayTimer() {
  if (!isAutoplayRunning) {
    return;
  }

  stopAutoplay();
  updateAutoplayState();
}

prefersReducedMotion.addEventListener("change", () => {
  updateAutoplayState();
});

//Autoplay
function startAutoPlay() {
  if (isAutoplayRunning) {
    return;
  }

  isAutoplayRunning = true;
  scheduleNextSlide();
}

function scheduleNextSlide() {
  if (!isAutoplayRunning) {
    return;
  }

  autoPlay = setTimeout(() => {
    autoPlay = null;

    if (!isAutoplayRunning) {
      return;
    }

    nextSlide();

    scheduleNextSlide();
  }, 7000);
}



function stopAutoplay() {
  if (!isAutoplayRunning) {
    return;
  }

  clearTimeout(autoPlay);
  autoPlay = null;
  isAutoplayRunning = false;
}


carousel.addEventListener("mouseenter", () => {
  isHovered = true;
  updateAutoplayState();
});

carousel.addEventListener("mouseleave", () => {
  isHovered = false;
  updateAutoplayState();
});

//Keyboard Navigation
carousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();

    nextSlide(true);
    resetAutoplayTimer();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    previousSlide(true);
    resetAutoplayTimer();
  }
});

carousel.addEventListener("focusin", (event) => {
  isFocused = event.target.matches(":focus-visible");
  updateAutoplayState();
});

carousel.addEventListener("focusout", (event) => {
  if (!carousel.contains(event.relatedTarget)) {
    isFocused = false;
    updateAutoplayState();
  }
});


//Touch/Swipe
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;

  isTouching = true;
  updateAutoplayState();
}, { passive: true });

carousel.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;

  const distance = touchStartX - touchEndX;

  if (Math.abs(distance) > 50) {
    if (distance > 0) {
      nextSlide(true);
    } else {
      previousSlide(true);
    }
  }

  isTouching = false;
  updateAutoplayState();
}, { passive: true });

carousel.addEventListener("touchcancel", () => {
  isTouching = false;
  updateAutoplayState();
}, { passive: true });

//pause when browser tab is not visible
document.addEventListener("visibilitychange", () => {
  isPageHidden = document.hidden;

  updateAutoplayState();
});

carouselObserver.observe(carousel);

//initialize
updateCarousel();
updateAutoplayState();
