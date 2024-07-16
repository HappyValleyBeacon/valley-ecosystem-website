import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Email is required');
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.status === 201) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="main">
      <section className="hero">
        <div className="hero-content">
          <Image src="/valley-ecosystem-logo.webp" alt="Valley Ecosystem Logo" width={500} height={500} />
          <p>Valley connects you to the Blockchain via our physical arcade cabinets.</p>
        </div>
        <div className="content">
          <h2>Stay connected</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email here *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Our Games</h2>
          <div className="games">
            <div className="game">
              <h3>Alien Influencer</h3>
              <p>Q4 2024</p>
              <Image src="/alien-influencer.gif" alt="Alien Influencer" width={200} height={200} />
            </div>
            <div className="game">
              <h3>Flutter</h3>
              <p>Q4 2024</p>
              <Image src="/flutter.gif" alt="Flutter" width={200} height={200} />
            </div>
          </div>
          <div className="game-info">
            <p>Valley develops games for PC, mobile and arcade cabinets. Weekly and monthly high score boards. All games earn $VALLEY. All NFTs are cosmetic and earn at a higher rate. NFTs offer no in-game benefit. NO pay to win!</p>
            <p>Two games launching in 2024. Four games launching in 2025.</p>
          </div>
        </div>
      </section>

      <section className="cabinet">
        <div className="container">
          <h2>Our Cabinet</h2>
          <div className="cabinet-content">
            <Image src="/arcade-cabinet.webp" alt="Arcade Cabinet" width={200} height={200} />
            <div className="cabinet-info">
              <p>Our unique cabinet is your portal to the blockchain. Players seamlessly connect to their Web3 account in the arcade setting. Web2 users can easily sign up for an account from the arcade.</p>
            </div>
            <Image src="/arcade.webp" alt="Arcade Cabinet" width={200} height={200} />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Galachain</h2>
          <p>We’re building on the fastest L1 blockchain. Most energy efficient. Lowest fees.</p>
          <Image src="/galachain.webp" alt="Galachain" width={1200} height={400} />
        </div>
      </section>
    </div>
  );
}
