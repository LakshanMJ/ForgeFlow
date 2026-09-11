"use client";

import AnimatedLogo from "@/shared/components/AnimatedLogo";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
	const videoRef = useRef(null);

	useEffect(() => {
		const video = videoRef.current;

		if (!video) return;

		video.play().catch(() => {
			// Browser blocked autoplay.
			// Muted autoplay should normally be allowed.
		});
	}, []);

	return (
		<>
			{/* <AnimatedLogo /> */}
			<div className="hero-video">
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					poster="/images/forgeflow-video-poster.png"
				>
					<source
						src="/videos/demo.mp4"
						type="video/mp4"
					/>

					Your browser does not support video playback.
				</video>
			</div>
			
		</>
	);
}