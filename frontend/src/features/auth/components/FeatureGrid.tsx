import React from "react";
import "./FeatureGrid.css";
import { BsArrowRight } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi2";
import { HiMiniArrowRight } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

type Feature = {
	title: string;
	description: string;
	imageAlt: string;
	imageSrc?: string;
};

const FEATURES: Feature[] = [
	{
		title: "Turn any project into a clear plan in minutes",
		description:
			"Create tasks with owners, due dates, and priorities in seconds. Flowdeck AI fills in the details so your team can skip the setup and get straight to work.",
		imageAlt: "Task creation screenshot",
	},
	{
		title: "Know who's doing what, without asking",
		description:
			"Comments, @mentions, and real-time updates keep everyone aligned without another status meeting. Flowdeck AI flags what's overdue and what's at risk so nothing slips through.",
		imageAlt: "Workspace activity screenshot",
	},
	{
		title: "Turn conversations into tasks instantly",
		description:
			"Catch action items straight from chat and docs. Flowdeck AI drafts the task, assignee, and due date before you finish the sentence.",
		imageAlt: "Chat to task screenshot",
	},
	{
		title: "See exactly where every project stands",
		description:
			"Live dashboards roll up status across every team and project. Flowdeck AI summarizes risk and progress so leaders don't have to ask for updates.",
		imageAlt: "Dashboard screenshot",
	},
];

export default function FeatureGrid() {
	return (
		<section className="feature-grid-section">
			<div className="feature-grid-wrap">
				{FEATURES.map((feature) => (
					<div className="feature-row" key={feature.title}>
						<div className="feature-row-text">
							<h3 className="feature-title">{feature.title}</h3>
							<p className="feature-desc">{feature.description}</p>
							{/* <a href="/signup" className="feature-cta"> */}
							{/* <a href="/signup" className="get-started-button">
								Get started
								<span aria-hidden="true">→</span>
							</a> */}
							<button className="get-started-button">
								Get Started
								{/* <svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									aria-hidden="true"
									focusable="false"
								>

									<FaArrowRightLong />
								</svg> */}
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										d="M1 12H18M11 5L18 12L11 19"
										stroke="#202020"
										strokeWidth="1.7"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>

						<div className="feature-row-media">
							<div className="feature-media-frame">
								<div className="feature-media-window">
									{feature.imageSrc ? (
										<img src={'/public/bell.png'} alt={feature.imageAlt} />
									) : (
										<span className="feature-image-placeholder">{feature.imageAlt}</span>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
