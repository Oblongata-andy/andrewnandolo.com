const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const cursorGlow = document.querySelector('.cursor-glow');


menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', open);
});
 
navLinks.forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('nav-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

// menuButton.addEventListener('click', () => {
//   alert('clicked');
// })

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

//  const stackEl = document.querySelector('.services-stack');
//   const items = Array.from(document.querySelectorAll('.service-item'));
//   if (!stackEl || !items.length) return;
 
//   const stackTop = parseFloat(getComputedStyle(stackEl).getPropertyValue('--stack-top')) || 0;
//   const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
//   items.forEach((item, i) => item.style.setProperty('--i', i));
 
//   if (reduceMotion) return; // sticky stacking still works fine without the extra shrink/recede polish
 
//   let ticking = false;
 
//   function update() {
//     const vh = window.innerHeight;
//     items.forEach((item, i) => {
//       const next = items[i + 1];
//       let progress = 0;
//       if (next) {
//         // How close is the *next* card to reaching the stack top?
//         // That's what tells us how "covered" the current card is —
//         // a sticky element's own rect.top never changes while it's
//         // pinned, so we can't measure progress from itself.
//         const nextTop = next.getBoundingClientRect().top;
//         progress = (vh - nextTop) / (vh - stackTop);
//         progress = Math.min(Math.max(progress, 0), 1);
//       }
//       item.style.setProperty('--card-scale', (1 - progress * 0.06).toFixed(3));
//       item.style.setProperty('--card-y', (-progress * 14).toFixed(2) + 'px');
//     });
//     ticking = false;
//   }
 
//   function onScroll() {
//     if (!ticking) {
//       requestAnimationFrame(update);
//       ticking = true;
//     }
//   }
 
//   window.addEventListener('scroll', onScroll, { passive: true });
//   window.addEventListener('resize', onScroll);
//   update();