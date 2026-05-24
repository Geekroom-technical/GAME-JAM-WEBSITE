// Generate stars
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  let size = Math.random() < 0.7 ? 1 : 2;
  const isPixelStar = Math.random() < 0.12; // ~12% are larger, golden pixel stars
  if (isPixelStar) {
    s.className = 'star pixel-star';
    size = Math.random() < 0.5 ? 8 : 12;
  } else {
    s.className = 'star';
  }
  s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;--d:${(Math.random()*4+1).toFixed(1)}s;--dl:${(Math.random()*3).toFixed(1)}s`;
  starsEl.appendChild(s);
}

// Marquee
const marqueeItems = [
  '🎮 GAME JAM', '✦ BUILD FROM SCRATCH', '⚡ ONE MONTH', '◈ INVERTED THEME',
  '🏆 PRIZES COMING', '🎯 ALL ENGINES', '✦ PORTFOLIO-READY', '◆ PAN-INDIA',
  '🎮 GAME JAM', '✦ BUILD FROM SCRATCH', '⚡ ONE MONTH', '◈ INVERTED THEME',
  '🏆 PRIZES COMING', '🎯 ALL ENGINES', '✦ PORTFOLIO-READY', '◆ PAN-INDIA'
];
const inner = document.getElementById('marquee');
inner.innerHTML = marqueeItems.map(t => `<span class="marquee-item"><span>▶</span>${t}</span>`).join('') +
                  marqueeItems.map(t => `<span class="marquee-item"><span>▶</span>${t}</span>`).join('');

// Intersection observer for fade-up
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Smooth scroll for anchor link
document.querySelector('[href="#details"]').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('details').scrollIntoView({ behavior: 'smooth' });
});

// Tabs behavior: simple, accessible
;(function(){
  const tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;
  function activate(targetId, setFocus){
    tabs.forEach(b=>{
      const sel = b.getAttribute('data-target')===targetId;
      b.setAttribute('aria-selected', sel? 'true':'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p=>{
      if (p.id===targetId) p.removeAttribute('hidden'); else p.setAttribute('hidden','');
    });
    if (setFocus) document.querySelector(`[data-target="${targetId}"]`).focus();
    try { localStorage.setItem('geeknjam.activeTab', targetId); } catch(e){}
  }
  tabs.forEach(btn=> btn.addEventListener('click', ()=> activate(btn.getAttribute('data-target'), false)));
  // keyboard navigation (left/right)
  tabs.forEach((btn,i)=> btn.addEventListener('keydown', e=>{
    if (e.key === 'ArrowRight') tabs[(i+1)%tabs.length].focus();
    if (e.key === 'ArrowLeft') tabs[(i-1+tabs.length)%tabs.length].focus();
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
  }));
  const saved = (function(){ try{ return localStorage.getItem('geeknjam.activeTab'); }catch(e){return null;} })();
  const initial = saved && document.getElementById(saved) ? saved : tabs[0].getAttribute('data-target');
  activate(initial, false);
})();

// Countdown timers
(function(){
  const start = new Date(2026, 4, 30, 0, 0, 0); // May 30, 2026 (months 0-indexed)
  const end = new Date(2026, 6, 25, 23, 59, 59); // July 25, 2026
  const elStart = document.getElementById('timer-to-start');
  const elEnd = document.getElementById('timer-to-end');

  function fmt(ms){
    if (ms <= 0) return '0d 0h 0m 0s';
    const s = Math.floor(ms/1000);
    const days = Math.floor(s/86400);
    const hrs = Math.floor((s%86400)/3600);
    const mins = Math.floor((s%3600)/60);
    const secs = s%60;
    return `${days}d ${hrs}h ${mins}m ${secs}s`;
  }

  function tick(){
    const now = new Date();
    const toStart = start - now;
    const toEnd = end - now;

    if (elStart) {
      if (toStart > 0) elStart.querySelector('.t-val').textContent = fmt(toStart);
      else elStart.querySelector('.t-val').textContent = 'Started';
    }
    if (elEnd) {
      if (toEnd > 0) elEnd.querySelector('.t-val').textContent = fmt(toEnd);
      else elEnd.querySelector('.t-val').textContent = 'Ended';
    }
  }
  tick();
  setInterval(tick, 1000);
})();

// Dynamic Random Driving Car Manager
;(function(){
  const car1 = document.querySelector('.scene-car-1');
  const car2 = document.querySelector('.scene-car-2');

  function initCar(carEl, isCar1) {
    // Clear any existing transition
    carEl.style.transition = 'none';

    // Choose random direction: true for Left-to-Right, false for Right-to-Left
    const isL2R = Math.random() < 0.5;

    // Choose random duration: 18s to 26s (natural and steady speed)
    const duration = Math.random() * 8 + 18;

    // Choose random bottom position (depth): 6px to 14px
    const bottom = Math.random() * 8 + 6;

    // Set z-index based on depth (closer elements in front)
    const zIndex = bottom < 10 ? 13 : 12;

    carEl.style.bottom = `${bottom}px`;
    carEl.style.zIndex = zIndex;

    // Shift colors dynamically each time they drive using a random CSS hue-rotate filter!
    const hueShift = Math.floor(Math.random() * 360);
    carEl.style.filter = `hue-rotate(${hueShift}deg)`;

    // Set face direction based on movement direction and default orientation
    // car_1.png (Red Sports) faces right by default.
    // car_2.png (Blue Retro) faces left by default.
    if (isL2R) {
      carEl.style.left = '-120px';
      carEl.style.transform = isCar1 ? 'scaleX(1)' : 'scaleX(-1)';
    } else {
      carEl.style.left = '100%';
      carEl.style.transform = isCar1 ? 'scaleX(-1)' : 'scaleX(1)';
    }

    // Force a reflow so the browser registers the initial position before transition
    carEl.offsetHeight;

    // Apply transition and target position
    carEl.style.transition = `left ${duration}s linear`;
    carEl.style.left = isL2R ? '100%' : '-120px';
  }

  if (car1) {
    car1.addEventListener('transitionend', () => {
      // Stagger next drive with a random delay (2s to 6s)
      setTimeout(() => initCar(car1, true), Math.random() * 4000 + 2000);
    });
    // First drive starts soon
    setTimeout(() => initCar(car1, true), 1000);
  }

  if (car2) {
    car2.addEventListener('transitionend', () => {
      // Stagger next drive with a random delay (3s to 8s)
      setTimeout(() => initCar(car2, false), Math.random() * 5000 + 3000);
    });
    // First drive starts staggered
    setTimeout(() => initCar(car2, false), 7000);
  }
})();

// Periodically flip the Dev Boy (man) randomly between 7 and 15 seconds
;(function(){
  const man = document.querySelector('.scene-man');
  if (!man) return;
  
  let isFlipped = false;
  
  function queueFlip() {
    const delay = Math.random() * 8000 + 7000; // 7s to 15s
    setTimeout(() => {
      isFlipped = !isFlipped;
      man.style.transform = isFlipped ? 'scaleX(-1)' : 'scaleX(1)';
      man.style.transition = 'transform 0.15s ease-in-out'; // smooth 2D flip animation!
      queueFlip();
    }, delay);
  }
  
  queueFlip();
})();
