/* ====== DATA (sample) ====== */
const raffles = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: 2.00,
    image: "images/iphone17.png",
    category: "electronics",
    totalTickets: 1000,
    soldTickets: 743,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    description: "Latest iPhone 15 Pro Max with 256GB storage in Space Black"
  },
  {
    id: 2,
    title: "Designer Handbag",
    price: 2.00,
    image: "images/designerhandbag.png",
    category: "fashion",
    totalTickets: 500,
    soldTickets: 320,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    description: "Luxury designer handbag in classic black"
  },
  {
    id: 3,
    title: "BMW M3 - 2024 Model",
    price: 2.00,
    image: "images/bmwm3.png",
    category: "cars",
    totalTickets: 5000,
    soldTickets: 1200,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: "Brand new BMW M3 with full warranty and delivery"
  },
  {
    id: 4,
    title: "Ultimate Gaming PC + 49\" UltraWide",
    price: 2.00,
    image: "images/gamingsetup.png",
    category: "electronics",
    totalTickets: 2500,
    soldTickets: 900,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    description: "4090, Ryzen 9, 64GB RAM and a stunning 49\" monitor."
  }
];

const winners = [
  { name: "Sarah M.", prize: "iPhone 15 Pro", date: "2024-06-15", icon: "🎉" },
  { name: "James T.", prize: "BMW M3", date: "2024-06-08", icon: "🚗" },
  { name: "Emma L.", prize: "Diamond Necklace", date: "2024-06-02", icon: "💎" },
  { name: "Ryan K.", prize: "PS5 + Games", date: "2024-05-28", icon: "🎮" }
];

const faq = [
  { q: "How do the raffles work?", a: "Pick a raffle, select tickets (£2 each), and enter. When it ends, we draw a winner randomly and notify them immediately." },
  { q: "When do raffles end?", a: "Either when all tickets sell out or the timer reaches zero — whichever comes first." },
  { q: "How do I know if I've won?", a: "We notify winners by email/SMS and publish results in the Winners section." },
  { q: "Is there a cash alternative?", a: "Most prizes offer a cash alternative. We'll discuss it with you after you win." },
  { q: "Free entry option?", a: "Yes — a no-purchase route exists as required by UK law. See T&Cs for details." }
];

/* ====== UTIL ====== */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

function showPage(pageId) {
  $$('.page').forEach(p => p.classList.remove('active'));
  $('#' + pageId).classList.add('active');
  $$('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatEndTime(endTime) {
  const now = new Date();
  const diff = endTime - now;
  if (diff <= 0) return 'Ended';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/* ====== RENDER ====== */
function createRaffleCard(raffle) {
  const progress = (raffle.soldTickets / raffle.totalTickets) * 100;
  const card = document.createElement('div');
  card.className = 'raffle-card';
  card.innerHTML = `
    <img src="${raffle.image}" alt="${raffle.title}" class="raffle-image">
    <div class="raffle-content">
      <h3 class="raffle-title">${raffle.title}</h3>
      <div class="raffle-price">${raffle.price.toFixed(2)}</div>
      <div class="raffle-progress"><div class="progress-fill" style="width:${progress}%"></div></div>
      <div class="raffle-stats">
        <span>${raffle.soldTickets} / ${raffle.totalTickets} tickets</span>
        <span>${progress.toFixed(1)}% sold</span>
      </div>
      <div class="raffle-timer">${formatEndTime(raffle.endTime)}</div>
      <button class="enter-button" data-enter="${raffle.id}">Enter Now</button>
    </div>
  `;
  return card;
}

function renderAllRaffles() {
  const grid = $('#currentRafflesGrid');
  grid.innerHTML = '';
  raffles.forEach(r => grid.appendChild(createRaffleCard(r)));
}

function renderTop3(mode='popular') {
  const grid = $('#topRafflesGrid');
  grid.innerHTML = '';
  let sorted = [...raffles];
  if (mode === 'popular') {
    sorted.sort((a,b) => (b.soldTickets/b.totalTickets) - (a.soldTickets/a.totalTickets));
  } else if (mode === 'ending') {
    sorted.sort((a,b) => a.endTime - b.endTime);
  }
  sorted.slice(0,3).forEach(r => grid.appendChild(createRaffleCard(r)));
}

function renderBigRaffles() {
  const grid = $('#bigRafflesGrid');
  grid.innerHTML = '';
  const big = raffles.filter(r => r.totalTickets >= 2000 || r.category === 'cars');
  big.forEach(r => grid.appendChild(createRaffleCard(r)));
}

function renderWinners() {
  const grid = $('#winnersGrid');
  grid.innerHTML = '';
  winners.forEach(w => {
    const card = document.createElement('div');
    card.className = 'winner-card';
    card.innerHTML = `
      <div class="winner-image">${w.icon}</div>
      <h3>${w.name}</h3>
      <p><strong>Won:</strong> ${w.prize}</p>
      <small>Won on: ${new Date(w.date).toLocaleDateString()}</small>
    `;
    grid.appendChild(card);
  });
}

function renderFAQ() {
  const box = $('#faqItems');
  box.innerHTML = '';
  faq.forEach(item => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `<div class="q">${item.q}</div><div class="a">${item.a}</div>`;
    box.appendChild(el);
  });
}

/* ====== FILTERS (All Raffles) ====== */
function attachFilters() {
  $('#categoryFilter').addEventListener('change', filterRaffles);
  $('#sortFilter').addEventListener('change', filterRaffles);
  $('#searchInput').addEventListener('input', filterRaffles);
}
function filterRaffles() {
  const category = $('#categoryFilter').value;
  const sort = $('#sortFilter').value;
  const search = $('#searchInput').value.toLowerCase();
  let filtered = raffles.filter(r => (!category || r.category === category) && r.title.toLowerCase().includes(search));
  switch (sort) {
    case 'popular': filtered.sort((a,b) => (b.soldTickets/b.totalTickets) - (a.soldTickets/a.totalTickets)); break;
    case 'ending': filtered.sort((a,b) => a.endTime - b.endTime); break;
    case 'new': filtered.sort((a,b) => b.id - a.id); break;
    case 'price': filtered.sort((a,b) => a.price - b.price); break;
  }
  const grid = $('#currentRafflesGrid');
  grid.innerHTML = '';
  filtered.forEach(r => grid.appendChild(createRaffleCard(r)));
}

/* ====== ENTRY MODAL + RULES ====== */
let currentRaffleId = null;
function openModal(raffleId) {
  const raffle = raffles.find(r => r.id === raffleId);
  if (!raffle) return;
  currentRaffleId = raffleId;
  $('#modalTitle').textContent = raffle.title;
  $('#modalImage').src = raffle.image;
  $('#modalImage').alt = raffle.title;
  $('#modalDescription').textContent = raffle.description;
  $('#ticketCount').value = 1;
  $('#totalCost').textContent = raffle.price.toFixed(2);

  // Rule hint for max 50%
  const maxTickets = Math.floor(raffle.totalTickets * 0.5);
  $('#maxHint').textContent = `Rule: You may purchase up to ${maxTickets} tickets for this raffle (50% cap).`;

  $('#entryModal').style.display = 'flex';
}
function closeModals() {
  $('#entryModal').style.display = 'none';
  $('#drawModal').style.display = 'none';
}
function updateTotal() {
  const raffle = raffles.find(r => r.id === currentRaffleId);
  if (!raffle) return;
  const count = parseInt($('#ticketCount').value) || 1;
  $('#totalCost').textContent = (raffle.price * count).toFixed(2);
}
function changeTickets(delta) {
  const input = $('#ticketCount');
  let v = parseInt(input.value) || 1;
  v = Math.max(parseInt(input.min), Math.min(v + delta, parseInt(input.max)));
  input.value = v;
  updateTotal();
}

// LocalStorage helper for per-user per-raffle purchases
function getUsername() {
  return localStorage.getItem('rr_username') || 'guest';
}
function getUserTicketsFor(raffleId) {
  const key = `rr_entries_${raffleId}_${getUsername()}`;
  return parseInt(localStorage.getItem(key) || '0');
}
function addUserTicketsFor(raffleId, n) {
  const key = `rr_entries_${raffleId}_${getUsername()}`;
  const cur = getUserTicketsFor(raffleId);
  localStorage.setItem(key, String(cur + n));
}

function completeEntry() {
  const raffle = raffles.find(r => r.id === currentRaffleId);
  if (!raffle) return;
  const count = parseInt($('#ticketCount').value) || 1;
  const maxPerUser = Math.floor(raffle.totalTickets * 0.5);
  const already = getUserTicketsFor(raffle.id);

  if (count < 1 || count > 10) {
    alert('Please select between 1–10 tickets per transaction.');
    return;
  }
  if (already + count > maxPerUser) {
    alert(`Limit reached: You can hold a maximum of ${maxPerUser} tickets for this raffle. You currently hold ${already}.`);
    return;
  }

  // Payment method selected?
  const paySelected = $('.payment-btn.selected');
  if (!paySelected) {
    alert('Please select a payment method.');
    return;
  }

  // Simulate entry
  addUserTicketsFor(raffle.id, count);
  raffle.soldTickets = Math.min(raffle.totalTickets, raffle.soldTickets + count);

  closeModals();
  $('#drawModal').style.display = 'flex';
  setTimeout(() => { $('#drawModal').style.display = 'none'; }, 1800);

  // Re-render cards to update progress
  renderTop3();
  filterRaffles();
  renderBigRaffles();
}

/* ====== EVENTS ====== */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  $('#mobileMenu').addEventListener('click', () => {
    $('#navLinks').classList.toggle('active');
  });

  // Nav link clicks
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
      $('#navLinks').classList.remove('active');
    });
  });
  $$('[data-go]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(btn.dataset.go);
    });
  });

  // Theme toggle
  const themeToggle = $('#themeToggle');
  const setTheme = (theme) => {
    if (theme === 'light') { document.body.classList.add('light-mode'); themeToggle.textContent = '🌞'; }
    else { document.body.classList.remove('light-mode'); themeToggle.textContent = '🌙'; }
  };
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    setTheme(newTheme); localStorage.setItem('theme', newTheme);
  });

  // Chips for Top 3
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      renderTop3(chip.dataset.top);
    });
  });

  // Payment method select
  $$('.payment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.payment-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Modal controls
  document.body.addEventListener('click', (e) => {
    const enterId = e.target.getAttribute('data-enter');
    if (enterId) openModal(Number(enterId));
    if (e.target.hasAttribute('data-close')) closeModals();
  });
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) closeModals();
  });

  // Ticket controls
  $$('.ticket-btn').forEach(btn => btn.addEventListener('click', () => changeTickets(Number(btn.dataset.delta))));
  $('#ticketCount').addEventListener('input', updateTotal);
  $('#completeEntry').addEventListener('click', completeEntry);

  // Initial renders
  renderTop3();
  renderAllRaffles();
  renderBigRaffles();
  renderWinners();
  renderFAQ();
  attachFilters();
});
