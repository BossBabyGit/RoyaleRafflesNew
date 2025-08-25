/* ====== DATA (sample) ====== */
const raffles = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: 2.00,
    value: 1200,
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
    value: 1800,
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
    value: 70000,
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
    value: 4500,
    image: "images/gamingsetup.png",
    category: "electronics",
    totalTickets: 2500,
    soldTickets: 900,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    description: "4090, Ryzen 9, 64GB RAM and a stunning 49\" monitor."
  }
];

const winners = [
  { name: "Sarah Miles", prize: "iPhone 15 Pro", value: 1200, chance: 5, date: "2024-06-15", icon: "🎉" },
  { name: "James Tully", prize: "BMW M3", value: 70000, chance: 0.5, date: "2024-06-08", icon: "🚗" },
  { name: "Emma Lane", prize: "Diamond Necklace", value: 5000, chance: 1, date: "2024-06-02", icon: "💎" },
  { name: "Ryan King", prize: "PS5 + Games", value: 600, chance: 10, date: "2024-05-28", icon: "🎮" },
  { name: "Sarah Miles", prize: "£100 Gift Card", value: 100, chance: 20, date: "2024-05-15", icon: "💷" }
];

function maskName(name) {
  if (!name) return '';
  const parts = name.split(' ');
  const first = parts[0];
  const maskedFirst = first[0] + first.slice(1, -1).replace(/./g, '*') + first.slice(-1);
  const last = parts[1] ? ` ${parts[1][0]}.` : '';
  return maskedFirst + last;
}

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

// simple auth helpers
function isLoggedIn() {
  return localStorage.getItem('rr_logged_in') === 'true';
}
function getBalance() {
  return parseFloat(localStorage.getItem('rr_balance') || '0');
}
function setBalance(v) {
  localStorage.setItem('rr_balance', v.toFixed(2));
}
function getSpent() {
  return parseFloat(localStorage.getItem('rr_spent') || '0');
}
function addSpent(v) {
  localStorage.setItem('rr_spent', (getSpent() + v).toFixed(2));
}

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
      <h3>${maskName(w.name)}</h3>
      <p><strong>Won:</strong> ${w.prize} (£${w.value})</p>
      <small>Chance: ${w.chance}% | ${new Date(w.date).toLocaleDateString()}</small>
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
  const cat = $('#categoryFilter');
  const sort = $('#sortFilter');
  const search = $('#searchInput');
  if (cat) cat.addEventListener('change', filterRaffles);
  if (sort) sort.addEventListener('change', filterRaffles);
  if (search) search.addEventListener('input', filterRaffles);
}
function filterRaffles() {
  if (!$('#currentRafflesGrid')) return;
  const category = $('#categoryFilter') ? $('#categoryFilter').value : '';
  const sort = $('#sortFilter') ? $('#sortFilter').value : 'newest';
  const search = $('#searchInput') ? $('#searchInput').value.toLowerCase() : '';
  let filtered = raffles.filter(r => (!category || r.category === category) && r.title.toLowerCase().includes(search));
  switch (sort) {
    case 'price_low': filtered.sort((a,b) => a.price - b.price); break;
    case 'price_high': filtered.sort((a,b) => b.price - a.price); break;
    case 'value_high': filtered.sort((a,b) => b.value - a.value); break;
    case 'value_low': filtered.sort((a,b) => a.value - b.value); break;
    case 'newest': filtered.sort((a,b) => b.id - a.id); break;
    case 'oldest': filtered.sort((a,b) => a.id - b.id); break;
  }
  const grid = $('#currentRafflesGrid');
  grid.innerHTML = '';
  filtered.forEach(r => grid.appendChild(createRaffleCard(r)));
}

function renderUrgentPopup() {
  const popup = $('#urgentPopup');
  if (!popup) return;
  const soon = raffles.filter(r => {
    const remaining = r.totalTickets - r.soldTickets;
    const timeLeft = r.endTime - new Date();
    return remaining / r.totalTickets < 0.1 || timeLeft < 2 * 60 * 60 * 1000;
  });
  if (soon.length === 0) return;
  popup.innerHTML = `<h4>Ending Soon</h4><ul>${soon.map(r => `<li>${r.title}</li>`).join('')}</ul>`;
  popup.classList.add('active');
}

function renderHallOfFame() {
  const bigEl = $('#fameBiggest');
  if (!bigEl) return;
  const biggest = winners.reduce((max, w) => w.value > max.value ? w : max, winners[0]);
  const luckiest = winners.reduce((min, w) => w.chance < min.chance ? w : min, winners[0]);
  const counts = winners.reduce((map, w) => { map[w.name] = (map[w.name] || 0) + 1; return map; }, {});
  const topName = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  bigEl.innerHTML = `<h3>Biggest Win</h3><p>${maskName(biggest.name)} won ${biggest.prize} (£${biggest.value})</p>`;
  $('#fameLuckiest').innerHTML = `<h3>Luckiest Player</h3><p>${maskName(luckiest.name)} won with ${luckiest.chance}% chance</p>`;
  $('#fameTop').innerHTML = `<h3>Top Winner</h3><p>${maskName(topName)} has ${counts[topName]} win${counts[topName] > 1 ? 's' : ''}</p>`;
}

/* ====== ENTRY MODAL + RULES ====== */
let currentRaffleId = null;
function openModal(raffleId) {
  if (!isLoggedIn()) { window.location.href = 'login.html'; return; }
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
  // Hide any open modal
  $$('.modal').forEach(m => (m.style.display = 'none'));
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

// demo past data for account page
const demoPast = [
  { title: 'PS5 Bundle', spent: 4, won: false, image: 'images/gamingsetup.png' },
  { title: '£100 Gift Card', spent: 2, won: true, prize: 100, image: 'images/spaweekend.png' }
];

function renderProfile() {
  const balEl = $('#modalBalance');
  if (!balEl) return;
  balEl.textContent = getBalance().toFixed(2);

  const currentList = $('#modalCurrentEntries');
  currentList.innerHTML = '';
  raffles.forEach(r => {
    const t = getUserTicketsFor(r.id);
    if (t > 0) {
      const card = document.createElement('div');
      card.className = 'profile-card';
      card.innerHTML = `<img src="${r.image}" alt="${r.title}"><div class="info"><h4>${r.title}</h4><div class="tickets">${t} ticket${t>1?'s':''}</div></div>`;
      currentList.appendChild(card);
    }
  });

  const pastList = $('#modalPastRaffles');
  pastList.innerHTML = '';
  demoPast.forEach(r => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    const status = r.won ? `Won £${r.prize}` : 'Lost';
    card.innerHTML = `<img src="${r.image}" alt="${r.title}"><div class="info"><h4>${r.title}</h4><div class="tickets">${status} (spent £${r.spent})</div></div>`;
    pastList.appendChild(card);
  });

  const wonList = $('#modalWonRaffles');
  wonList.innerHTML = '';
  demoPast.filter(r => r.won).forEach(r => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `<img src="${r.image}" alt="${r.title}"><div class="info"><h4>${r.title}</h4><div class="tickets">£${r.prize}</div></div>`;
    wonList.appendChild(card);
  });

  const spent = getSpent() + demoPast.reduce((s, r) => s + r.spent, 0);
  const wonAmt = demoPast.filter(r => r.won).reduce((s, r) => s + (r.prize || 0), 0);
  $('#modalSpent').textContent = spent.toFixed(2);
  $('#modalWon').textContent = wonAmt.toFixed(2);
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

  const cost = raffle.price * count;
  if (getBalance() < cost) {
    alert('Insufficient balance.');
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
  setBalance(getBalance() - cost);
  addSpent(cost);

  closeModals();
  $('#drawModal').style.display = 'flex';
  setTimeout(() => { $('#drawModal').style.display = 'none'; }, 1800);

  // Re-render cards to update progress
  if ($('#topRafflesGrid')) renderTop3();
  if ($('#currentRafflesGrid')) filterRaffles();
  if ($('#bigRafflesGrid')) renderBigRaffles();
  if ($('#modalBalance')) renderProfile();
}

/* ====== EVENTS ====== */
document.addEventListener('DOMContentLoaded', () => {
  const loginLink = $('#loginLink');
  const profileBtn = $('#profileBtn');
  if (loginLink && profileBtn) {
    if (isLoggedIn()) {
      profileBtn.style.display = 'inline-block';
      loginLink.textContent = 'Logout';
      loginLink.removeAttribute('href');
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        ['rr_logged_in','rr_username','rr_balance','rr_spent'].forEach(k => localStorage.removeItem(k));
        window.location.href = 'index.html';
      });
      renderProfile();
    } else {
      profileBtn.style.display = 'none';
    }
    profileBtn.addEventListener('click', () => {
      renderProfile();
      $('#profileModal').style.display = 'flex';
    });
  }

  if ($('#mobileMenu')) {
    $('#mobileMenu').addEventListener('click', () => {
      $('#navLinks').classList.toggle('active');
    });
  }

  $$('.nav-link').forEach(link => {
    if (link.dataset.page) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(link.dataset.page);
        $('#navLinks').classList.remove('active');
      });
    }
  });

  const themeToggle = $('#themeToggle');
  if (themeToggle) {
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
  }

  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      renderTop3(chip.dataset.top);
    });
  });

  $$('.payment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.payment-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  document.body.addEventListener('click', (e) => {
    const enterId = e.target.getAttribute('data-enter');
    if (enterId) {
      if (!isLoggedIn()) { window.location.href = 'login.html'; return; }
      openModal(Number(enterId));
    }
    if (e.target.closest('[data-close]')) {
      closeModals();
    }
  });
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) closeModals();
  });

  if ($('#ticketCount')) {
    $$('.ticket-btn').forEach(btn => btn.addEventListener('click', () => changeTickets(Number(btn.dataset.delta))));
    $('#ticketCount').addEventListener('input', updateTotal);
    $('#completeEntry').addEventListener('click', completeEntry);
  }

  if ($('#topRafflesGrid')) renderTop3();
  if ($('#currentRafflesGrid')) {
    renderAllRaffles();
    filterRaffles();
    attachFilters();
    renderUrgentPopup();
    setInterval(renderUrgentPopup, 60000);
  }
  if ($('#bigRafflesGrid')) renderBigRaffles();
  if ($('#winnersGrid')) renderWinners();
  if ($('#faqItems')) renderFAQ();
  if ($('#hallOfFame')) renderHallOfFame();
});
