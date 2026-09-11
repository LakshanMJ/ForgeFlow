import React from "react";
import "./HomePage.css";
import HeroVideo from "./HeroVideo";
import FeatureGrid from "./FeatureGrid";
import AnimatedLogo from "@/shared/components/AnimatedLogo";
// import YourIcon from "./YourIcon"; // <- swap in your own icon component

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
						<a href="/login" className="login-button">
							Log in
						</a>
						<a href="/signup" className="btn btn-solid btn-small">
							Sign Up
						</a>
					</div>
				</div>
			</header>

			{/* Hero */}
			<section className="hero">
				<div className="hero-inner">
					<h1 className="hero-heading">The project management tool you won't outgrow</h1>
					<p className="hero-sub">
						One workspace for tasks, docs, and goals. built to scale from your first project to
						your five-hundredth, without switching tools along the way.
					</p>
					<div className="hero-actions">
						<a href="/signup" className="btn btn-solid btn-large">
							Get started free
						</a>
						<a href="/demo" className="overview-btn">
							Watch overview
						</a>
					</div>
				</div>
			</section>

			{/* Board / video mockup */}
			<div className='video'>
				<HeroVideo />
			</div>

			<h1 className="second-heading">Meet Flint. </h1>
			<div className="animated-logo-wrapper">
				<AnimatedLogo animateOnView />
			</div>
			<h1 className="second-heading">Your projects. On autopilot</h1>
			
			<FeatureGrid />

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
