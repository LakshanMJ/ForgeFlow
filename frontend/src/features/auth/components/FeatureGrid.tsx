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
		title: "Your workday, already sorted.",
		description:
			"Every morning, Flint reads your board, finds what's overdue, blocked, and urgent, and tells you exactly what to do first. No dashboards to check. No status meetings to sit through.",
		imageAlt: "Task creation screenshot",
		imageSrc: "/flint.png",
		imageScale: 1.00,
	},
	{
		title: "One truth. Three perspectives",
		description:
			"See exactly what matters to you. Whether you're executing tasks, managing projects, or tracking progress, ForgeFlow shapes your view around your role. No clutter. Just clarity.",
		imageAlt: "Workspace activity screenshot",
		imageSrc: "/dashboards.png",
		imageScale: 1.45,
	},
	{
		title: "Every project. One home.",
		description:
			"Dive into any project and see everything at once. Tasks, timelines, team, and health. No more jumping between tools. The full picture, always one click away.",
		imageAlt: "Chat to task screenshot",
		// imageSrc: "/proj-det.png",
		// imageSrc: "/half-left.png",
		imageSrc: "/dark-proj-half left.png",
		imageScale: 1.60,
	},
	{
		title: "Move work forward.",
		description:
			"Every task has a place. Every person knows theirs. ForgeFlow turns scattered work into a steady, visible flow, so progress stops being a guess and starts being a given.",
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
