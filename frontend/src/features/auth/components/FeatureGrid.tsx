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
	imageScale?: number;
	imageOffsetY?:number;
	imageOffsetX?:number
};

const FEATURES: Feature[] = [
	{
		title: "Turn any project into a clear plan in minutes",
		description:
			"Create tasks with owners, due dates, and priorities in seconds. Flowdeck AI fills in the details so your team can skip the setup and get straight to work.",
		imageAlt: "Task creation screenshot",
		imageSrc: "/flint.png",
		imageScale: 1.00,
	},
	{
		title: "Know who's doing what, without asking",
		description:
			"Comments, @mentions, and real-time updates keep everyone aligned without another status meeting. Flowdeck AI flags what's overdue and what's at risk so nothing slips through.",
		imageAlt: "Workspace activity screenshot",
		imageSrc: "/dashboards.png",
		imageScale: 1.45,
	},
	{
		title: "Turn conversations into tasks instantly",
		description:
			"Catch action items straight from chat and docs. Flowdeck AI drafts the task, assignee, and due date before you finish the sentence.",
		imageAlt: "Chat to task screenshot",
		// imageSrc: "/proj-det.png",
		imageSrc: "/half-left.png",
		imageScale: 1.30,
	},
	{
		title: "See exactly where every project stands",
		description:
			"Live dashboards roll up status across every team and project. Flowdeck AI summarizes risk and progress so leaders don't have to ask for updates.",
		imageAlt: "Dashboard screenshot",
		imageSrc: "/444.png",
		imageScale: 1.25,
		imageOffsetX: 45,
		imageOffsetY: 35,
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
										// <img src={feature.imageSrc} alt={feature.imageAlt} />
										<img
											src={feature.imageSrc}
											alt={feature.imageAlt}
											style={{
												transform: `translate(${feature.imageOffsetX ?? 0}px, ${feature.imageOffsetY ?? 0}px) scale(${feature.imageScale ?? 1})`,
											}}
										/>
									) : (
										<span className="feature-image-placeholder">
											{/* {feature.imageAlt} */}
											{/* <img src={feature.imageSrc} alt={feature.imageAlt} /> */}
											<img
												src={feature.imageSrc}
												alt={feature.imageAlt}
												style={{
													transform: `translate(${feature.imageOffsetX ?? 0}px, ${feature.imageOffsetY ?? 0}px) scale(${feature.imageScale ?? 1})`,
												}}
											/>
										</span>
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
