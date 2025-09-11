import React from 'react';
import { Link } from 'react-router-dom';
import { raffles, faq } from '../data.js';
import RaffleCard from '../components/RaffleCard.jsx';

export default function Home() {
  const topRaffles = raffles.slice(0, 3);
  return (
    <main className="main">
      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">🏆 UK's Most Trusted Raffle Platform</div>
            <h1>Win <span className="highlight">Luxury Prizes</span> from £2</h1>
            <p>Join thousands of winners. Cars, tech, cash & more — your dream prize is just a ticket away.</p>
            <div className="hero-buttons">
              <Link className="button button-primary" to="/raffles">Browse All</Link>
              <a className="button button-ghost" href="#how-it-works">How It Works</a>
            </div>
          </div>
          <div className="hero-visual">
            <img src="/images/luxury.png" alt="Luxury prizes" className="hero-image" />
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Top Raffles</h2>
          </div>
          <div className="raffles-grid">
            {topRaffles.map(r => <RaffleCard key={r.id} raffle={r} />)}
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <h2>How the raffles work</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Pick a raffle</h3>
              <p>Choose any live raffle and select your number of tickets.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Ticket limits</h3>
              <p>Each user can buy up to <strong>50% of total tickets</strong> for a raffle — keeping things fair.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Fair draws</h3>
              <p>When the timer ends or tickets sell out, a winner is auto-drawn using a <strong>random.org</strong> bot and verified.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq">
          <h2>FAQ</h2>
          <div>
            {faq.map((f, i) => (
              <div key={i} className="faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
