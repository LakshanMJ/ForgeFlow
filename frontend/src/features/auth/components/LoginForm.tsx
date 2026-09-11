// LoginForm.tsx
"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { login } from "../api/auth.api";
import "./LoginForm.css";

/* --- Icons --- */
function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10.5 7 10.5 7a17.6 17.6 0 0 1-3.14 4.24M6.2 6.2C3.36 8.1 1.5 11 1.5 11s3.5 7 10.5 7a10.9 10.9 0 0 0 5.3-1.36" />
			<path d="M9.9 14.1a3 3 0 0 0 4.2-4.2M1.5 1.5l21 21" />
		</svg>
	);
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="8" x2="12" y2="13" />
			<line x1="12" y1="16" x2="12.01" y2="16" />
		</svg>
	);
}

/* --- Shared MUI Input Styling --- */
const inputSx = {
	"& .MuiOutlinedInput-root": {
		background: "var(--surface)",
		borderRadius: "7px",
		fontFamily: "inherit",
		fontSize: "13px",
		color: "var(--text)",
		transition: "border-color 0.15s ease, box-shadow 0.15s ease",
	},
	"& .MuiOutlinedInput-notchedOutline": {
		borderColor: "var(--border)",
		borderWidth: "1px",
		transition: "border-color 0.15s ease",
	},
	"& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "var(--border-strong)",
	},
	"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "var(--violet)",
		borderWidth: "1.5px",
		boxShadow: "0 0 0 3px rgba(108, 92, 231, 0.12)",
	},
	"& .MuiOutlinedInput-input": {
		padding: "9px 12px",
		fontFamily: "inherit",
		fontSize: "13px",
		lineHeight: "1.5",
	},
	"& .MuiOutlinedInput-input::placeholder": {
		color: "var(--text-tertiary)",
		opacity: 0.7,
		fontSize: "13px",
	},
} as const;

export default function LoginForm() {
	const router = useRouter();
	const emailId = useId();
	const passwordId = useId();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [attempted, setAttempted] = useState(false);

	const isEmailValid = /\S+@\S+\.\S+/.test(email);
	const canSubmit = isEmailValid && password.length > 0;
	const showEmailError = attempted && !isEmailValid;

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAttempted(true);
		setError("");

		if (!canSubmit) return;

		setLoading(true);
		try {
			const response = await login({ email, password });
			localStorage.setItem("accessToken", response.accessToken);
			localStorage.setItem("refreshToken", response.refreshToken);
			router.push("/dashboard");
		} catch (error) {
			console.error(error);
			setError("Invalid email or password. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-page">
			{/* Soft blurred color blobs behind the card */}
			<div className="auth-backdrop" aria-hidden="true">
				<span className="auth-blob auth-blob-violet" />
				<span className="auth-blob auth-blob-yellow" />
				<span className="auth-blob auth-blob-coral" />
			</div>

			<div className="auth-card">
				{/* Logo mark */}
				<div className="auth-logo-mark" aria-hidden="true">
					<svg width="44" height="40" viewBox="0 0 44 40" fill="none">
						<path d="M22 0L44 22H30L22 14L14 22H0L22 0Z" fill="#F2795A" />
						<path d="M22 15L38 31C34 36 28 39 22 39C16 39 10 36 6 31L22 15Z" fill="#4F8CF0" />
					</svg>
				</div>

				{/* Heading */}
				<h1 className="auth-title-lg">Welcome back!</h1>
				<p className="auth-signup-line">
					Don&apos;t have an account? <Link href="/register">Sign up</Link>
				</p>

				{/* SSO buttons */}
				<button type="button" className="auth-block-btn">
					<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
						<path fill="#FFC107" d="M43.6 20.5H42V20.4H24v7.2h11.3C33.7 32 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5.1-5.1C33.3 8 28.9 6 24 6 14.1 6 6 14.1 6 24s8.1 18 18 18 18-8.1 18-18c0-1.2-.1-2.4-.4-3.5z" />
						<path fill="#FF3D00" d="M9.3 14.7l5.9 4.3C16.9 15.6 20.2 13 24 13c2.8 0 5.3 1 7.3 2.7l5.1-5.1C33.3 8 28.9 6 24 6c-6.5 0-12.1 3.7-14.7 8.7z" />
						<path fill="#4CAF50" d="M24 42c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 33.4 26.7 34 24 34c-5.3 0-9.6-3-11.3-7.5l-6.2 4.8C9.7 37.9 16.3 42 24 42z" />
						<path fill="#1976D2" d="M43.6 20.5H42V20.4H24v7.2h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C40.9 35.7 44 30.4 44 24c0-1.2-.1-2.4-.4-3.5z" />
					</svg>
					Continue with Google
				</button>

				<button type="button" className="auth-block-btn">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
						<path d="M17.5 19H6.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.6-1.8A3.9 3.9 0 0 1 17.5 19Z" />
					</svg>
					Continue with SSO
				</button>

				{/* Divider */}
				<div className="auth-divider">
					<span className="auth-divider-line" />
					<span className="auth-divider-text">or</span>
					<span className="auth-divider-line" />
				</div>

				{/* Form */}
				<form onSubmit={handleLogin} noValidate className="auth-form">
					<div className="auth-field">
						<TextField
							id={emailId}
							type="email"
							placeholder="Work email"
							fullWidth
							autoFocus
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={showEmailError}
							sx={inputSx}
						/>
						{showEmailError && <span className="auth-field-error">Email required</span>}
					</div>

					<div className="auth-field">
						<TextField
							id={passwordId}
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							fullWidth
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							sx={inputSx}
							inputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											className="auth-eye-btn"
											type="button"
											size="small"
											aria-label={showPassword ? "Hide password" : "Show password"}
											onClick={() => setShowPassword((v) => !v)}
											edge="end"
										>
											{showPassword ? <EyeOffIcon /> : <EyeIcon />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>

					{error && (
						<div className="auth-error" role="alert">
							<AlertIcon />
							<span>{error}</span>
						</div>
					)}

					<button
						type="submit"
						className="auth-submit-lg"
						disabled={loading || !canSubmit}
						aria-busy={loading}
					>
						{loading ? (
							<>
								<span className="auth-spinner" />
								Signing in…
							</>
						) : (
							"Log In"
						)}
					</button>
				</form>

				<Link href="/forgot-password" className="auth-forgot-link-center">
					Forgot Password?
				</Link>

				<p className="auth-need-help">
					<Link href="/help">Need help?</Link>
				</p>
			</div>
		</div>
	);
}
