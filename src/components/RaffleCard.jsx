import React from 'react';
import { formatEndTime } from '../data.js';

export default function RaffleCard({ raffle }) {
  const progress = (raffle.soldTickets / raffle.totalTickets) * 100;
  return (
    <div className="raffle-card">
      <img src={raffle.image} alt={raffle.title} className="raffle-img" />
      <h3>{raffle.title}</h3>
      <p className="raffle-time">Ends in {formatEndTime(raffle.endTime)}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <button className="button button-gradient">Enter (£{raffle.price.toFixed(2)})</button>
    </div>
  );
}
