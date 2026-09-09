import React from "react";
import "./HomePage.css";

const BOARD_COLUMNS = [
  {
    name: "Backlog",
    count: 3,
    cards: [
      { title: 'Optimize "Recipe Discovery" grid', tag: "PD-47", color: "violet" },
      { title: "Audit checkout accessibility", tag: "PD-48", color: "yellow" },
    ],
  },
  {
    name: "In Progress",
    count: 3,
    cards: [
      { title: 'Standardize mobile "Organic" badges', tag: "PD-39", color: "yellow" },
      { title: 'Finalize "Back-to-School" landing page', tag: "PD-10", color: "violet" },
    ],
  },
  {
    name: "Ready for Dev",
    count: 1,
    cards: [{ title: 'Implement "Sustainability" video streaming', tag: "PD-8", color: "violet" }],
  },
  {
    name: "Review",
    count: 2,
    cards: [
      { title: "Refactor real-time inventory reporting", tag: "PD-3", color: "yellow" },
      { title: "Sync cross-region inventory caches", tag: "PD-45", color: "violet" },
    ],
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
      <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-a" />
        <span className="brand-mark-b" />
      </span>
      Flowdeck
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="page">
      {/* Nav */}
      <header className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-brand">
            <BrandMark />
          </a>
          <div className="nav-actions">
            <a href="/login" className="nav-link">
              Log in
            </a>
            <a href="/signup" className="btn btn-solid btn-small">
              Sign up free
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-heading">The project management tool you won't outgrow</h1>
          <p className="hero-sub">
            One workspace for tasks, docs, and goals — built to scale from your first project to
            your five-hundredth, without switching tools along the way.
          </p>
          <div className="hero-actions">
            <a href="/signup" className="btn btn-solid btn-large">
              Get started free
            </a>
            <a href="/demo" className="btn btn-ghost btn-large">
              Watch overview
            </a>
          </div>
        </div>
      </section>

      {/* Board / video mockup */}
      <section className="showcase">
        <div className="browser-card">
          <div className="browser-chrome">
            <span className="chrome-dot" />
            <span className="chrome-dot" />
            <span className="chrome-dot" />
            <div className="chrome-address">app.flowdeck.io/product-development</div>
          </div>

          <div className="board">
            {BOARD_COLUMNS.map((col) => (
              <div className="board-col" key={col.name}>
                <div className="board-col-header">
                  <span>{col.name}</span>
                  <span className="board-col-count">{col.count}</span>
                </div>
                {col.cards.map((card) => (
                  <div className="board-card" key={card.tag}>
                    <p className="board-card-title">{card.title}</p>
                    <div className="board-card-footer">
                      <span className={`board-card-tag tag-${card.color}`}>{card.tag}</span>
                      <span className="board-card-avatar" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button type="button" className="play-button" aria-label="Play product overview video">
            <PlayIcon />
          </button>
        </div>
      </section>

      {/* Agents banner */}
      <section className="banner">
        <div className="banner-inner">
          <h2 className="banner-heading">
            Ship faster with <span className="banner-accent">agents in Flowdeck</span>
          </h2>
          <p className="banner-sub">Get started for free — no credit card required.</p>
          <a href="/signup" className="btn btn-solid btn-large">
            Get Flowdeck free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-copy">Copyright © 2026 Flowdeck</span>
          <nav className="footer-links">
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms</a>
            <a href="/impressum">Impressum</a>
            <button type="button" className="footer-lang">
              English <ChevronDown />
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
}