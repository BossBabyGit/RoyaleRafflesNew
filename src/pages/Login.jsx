import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as ${email}`);
  };

  return (
    <main className="main">
      <div className="container">
        <section className="section">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <button className="button button-primary" type="submit">Login</button>
          </form>
        </section>
      </div>
    </main>
  );
}
