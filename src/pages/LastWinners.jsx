import React from 'react';
import { winners, maskName } from '../data.js';

export default function LastWinners() {
  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2>Past Winners</h2>
          <div className="winners-grid">
            {winners.map((w, i) => (
              <div key={i} className="winner-card">
                <img src={w.image} alt={w.prize} className="winner-img" />
                <h3>{w.prize}</h3>
                <p>{maskName(w.name)} • {w.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
