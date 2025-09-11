export const raffles = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: 2.0,
    value: 1200,
    image: "/images/iphone17.png",
    category: "electronics",
    totalTickets: 1000,
    soldTickets: 743,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    description: "Latest iPhone 15 Pro Max with 256GB storage in Space Black",
  },
  {
    id: 2,
    title: "Designer Handbag",
    price: 2.0,
    value: 1800,
    image: "/images/designerhandbag.png",
    category: "fashion",
    totalTickets: 500,
    soldTickets: 320,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    description: "Luxury designer handbag in classic black",
  },
  {
    id: 3,
    title: "BMW M3 - 2024 Model",
    price: 2.0,
    value: 70000,
    image: "/images/bmwm3.png",
    category: "cars",
    totalTickets: 5000,
    soldTickets: 1200,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    description: "Brand new BMW M3 with full warranty and delivery",
  },
  {
    id: 4,
    title: "Ultimate Gaming PC + 49\" UltraWide",
    price: 2.0,
    value: 4500,
    image: "/images/gamingsetup.png",
    category: "electronics",
    totalTickets: 2500,
    soldTickets: 900,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    description: "4090, Ryzen 9, 64GB RAM and a stunning 49\" monitor.",
  },
];

export const winners = [
  { name: "Sarah Miles", prize: "iPhone 15 Pro", value: 1200, chance: 5, date: "2024-06-15", image: "/images/iphone17.png" },
  { name: "James Tully", prize: "BMW M3", value: 70000, chance: 0.5, date: "2024-06-08", image: "/images/bmwm3.png" },
  { name: "Emma Lane", prize: "Diamond Necklace", value: 5000, chance: 1, date: "2024-06-02", image: "/images/rolex.png" },
  { name: "Ryan King", prize: "PS5 + Games", value: 600, chance: 10, date: "2024-05-28", image: "/images/gamingsetup.png" },
  { name: "Sarah Miles", prize: "£100 Gift Card", value: 100, chance: 20, date: "2024-05-15", image: "/images/spaweekend.png" },
];

export const faq = [
  { q: "How do the raffles work?", a: "Pick a raffle, select tickets (£2 each), and enter. When it ends, we draw a winner randomly and notify them immediately." },
  { q: "When do raffles end?", a: "Either when all tickets sell out or the timer reaches zero — whichever comes first." },
  { q: "How do I know if I've won?", a: "We notify winners by email/SMS and publish results in the Winners section." },
  { q: "Is there a cash alternative?", a: "Most prizes offer a cash alternative. We'll discuss it with you after you win." },
  { q: "Free entry option?", a: "Yes — a no-purchase route exists as required by UK law. See T&Cs for details." },
];

export function formatEndTime(endTime) {
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

export function maskName(name) {
  if (!name) return '';
  const parts = name.split(' ');
  const first = parts[0];
  const maskedFirst = first[0] + first.slice(1, -1).replace(/./g, '*') + first.slice(-1);
  const last = parts[1] ? ` ${parts[1][0]}.` : '';
  return maskedFirst + last;
}
