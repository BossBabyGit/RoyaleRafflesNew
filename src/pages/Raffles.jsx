import React from 'react';
import { raffles } from '../data.js';
import RaffleCard from '../components/RaffleCard.jsx';

export default function Raffles() {
  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2>All Raffles</h2>
          <div className="raffles-grid">
            {raffles.map(r => <RaffleCard key={r.id} raffle={r} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
