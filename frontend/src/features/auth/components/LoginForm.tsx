// LoginForm.tsx
"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { login } from "../api/auth.api";

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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* --- Shared MUI Input Styling --- */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    background: "var(--surface)",
    borderRadius: "6px",
    fontFamily: "inherit",
    fontSize: "14px",
    color: "var(--text)",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border)",
    borderWidth: "1.5px",
    transition: "border-color 0.15s ease",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border-strong)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--ember)",
    borderWidth: "2px",
    boxShadow: "0 0 0 3px rgba(227, 90, 48, 0.1)",
  },
  "& .MuiOutlinedInput-input": {
    padding: "12px 14px",
    fontFamily: "inherit",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "var(--text-tertiary)",
    opacity: 0.7,
    fontSize: "14px",
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

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
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
    <div className="auth-shell">
      {/* --- Hero Section (Left) --- */}
      <section className="auth-hero">
        <div className="auth-hero-content">
          {/* Brand */}
          <div className="auth-brand">
            <div className="auth-brand-logo">
              <span className="auth-logo-dot" />
              <span className="auth-logo-wordmark">ForgeFlow</span>
            </div>
            <p className="auth-brand-tagline">Enterprise workforce operations</p>
          </div>

          {/* Hero Text */}
          <div className="auth-hero-text">
            <h1 className="auth-hero-title">
              The platform teams<br />
              <span className="auth-hero-highlight">actually use</span>
            </h1>
            <p className="auth-hero-description">
              From project kickoff to delivery, ForgeFlow gives your team the 
              tools to plan, track, and ship work with confidence.
            </p>
          </div>

          {/* Social Proof */}
          <div className="auth-social-proof">
            <div className="auth-avatars">
              {["JD", "MK", "SR", "AL", "TW"].map((initials, i) => (
                <span 
                  key={i} 
                  className="auth-avatar" 
                  style={{ 
                    background: ["var(--ember)", "var(--steel)", "var(--patina)", "var(--gold)", "var(--violet)"][i],
                    marginLeft: i > 0 ? "-8px" : "0",
                    zIndex: 5 - i
                  }}
                >
                  {initials}
                </span>
              ))}
              <span className="auth-avatar-more">+2k</span>
            </div>
            <div className="auth-proof-text">
              <span className="auth-proof-number">12,847</span>
              <span className="auth-proof-label">teams trust ForgeFlow</span>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="auth-feature-grid">
            <div className="auth-feature-item">
              <div className="auth-feature-icon" style={{ background: "var(--ember-tint)", color: "var(--ember)" }}>
                <BriefcaseIcon />
              </div>
              <div>
                <div className="auth-feature-title">Project Management</div>
                <div className="auth-feature-desc">Agile, Kanban, and more</div>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon" style={{ background: "var(--steel-tint)", color: "var(--steel)" }}>
                <UsersIcon />
              </div>
              <div>
                <div className="auth-feature-title">Team Collaboration</div>
                <div className="auth-feature-desc">Real-time sync and updates</div>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon" style={{ background: "var(--patina-tint)", color: "var(--patina)" }}>
                <ClockIcon />
              </div>
              <div>
                <div className="auth-feature-title">Time Tracking</div>
                <div className="auth-feature-desc">Billable hours & reporting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Compact Bar (Mobile) --- */}
      <div className="auth-compact-bar">
        <div className="auth-compact-brand">
          <span className="auth-logo-dot" />
          <span className="auth-compact-wordmark">ForgeFlow</span>
        </div>
        <Link href="/register" className="auth-compact-signup">
          Sign up free
        </Link>
      </div>

      {/* --- Login Section (Right) --- */}
      <section className="auth-login">
        <div className="auth-login-container">
          {/* Login Header */}
          <div className="auth-login-header">
            <h2 className="auth-login-title">Welcome back</h2>
            <p className="auth-login-subtitle">
              Sign in to continue managing your projects
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} noValidate className="auth-login-form">
            <div className="auth-form-field">
              <label className="auth-label" htmlFor={emailId}>
                Work email
              </label>
              <TextField
                id={emailId}
                type="email"
                placeholder="you@company.com"
                fullWidth
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={inputSx}
              />
            </div>

            <div className="auth-form-field">
              <div className="auth-field-row">
                <label className="auth-label" htmlFor={passwordId}>
                  Password
                </label>
                <Link href="/forgot-password" className="auth-forgot-link">
                  Forgot password?
                </Link>
              </div>
              <TextField
                id={passwordId}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                fullWidth
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={inputSx}
                InputProps={{
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

            {/* Remember me */}
            <div className="auth-remember-row">
              <label className="auth-checkbox-label">
                <input type="checkbox" className="auth-checkbox" />
                <span className="auth-checkbox-custom">
                  <CheckIcon />
                </span>
                Remember me
              </label>
            </div>

            {error && (
              <div className="auth-error" role="alert">
                <AlertIcon />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
              {loading ? (
                <>
                  <span className="auth-spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <span className="auth-divider-line" />
          </div>

          {/* SSO Options */}
          <div className="auth-sso-options">
            <button type="button" className="auth-sso-btn">
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <path d="M24 9.5C20.5 9.5 17.5 10.7 15.2 12.8C12.9 14.9 11.5 17.7 11.5 21C11.5 24.3 12.9 27.1 15.2 29.2C17.5 31.3 20.5 32.5 24 32.5C27.5 32.5 30.5 31.3 32.8 29.2C35.1 27.1 36.5 24.3 36.5 21C36.5 17.7 35.1 14.9 32.8 12.8C30.5 10.7 27.5 9.5 24 9.5Z" fill="#4285F4" />
                <path d="M24 32.5V43" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 43L19 38" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 43L29 38" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Continue with Google
            </button>
            <button type="button" className="auth-sso-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5" aria-hidden="true">
                <path d="M22.23 0H1.77C0.79 0 0 0.79 0 1.77v20.46C0 23.21 0.79 24 1.77 24h20.46c0.98 0 1.77-0.79 1.77-1.77V1.77C24 0.79 23.21 0 22.23 0zM7.08 20.31H3.56V8.97h3.52v11.34zM5.32 7.46c-1.12 0-2.03-0.91-2.03-2.03s0.91-2.03 2.03-2.03 2.03 0.91 2.03 2.03-0.91 2.03-2.03 2.03zM20.31 20.31h-3.52v-5.63c0-1.34-0.48-2.26-1.68-2.26s-1.94 0.89-1.94 2.26v5.63H9.65V8.97h3.38v1.55c0.47-0.73 1.32-1.55 2.82-1.55s3.45 0.88 3.45 3.42v5.92z" />
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          {/* Sign up link */}
          <div className="auth-signup-block">
            <p className="auth-signup-text">
              New to ForgeFlow? <Link href="/register">Start your free trial</Link>
            </p>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <Link href="/" className="auth-footer-link">
              <GlobeIcon />
              English
            </Link>
            <span className="auth-footer-divider">•</span>
            <Link href="/privacy" className="auth-footer-link">Privacy</Link>
            <span className="auth-footer-divider">•</span>
            <Link href="/terms" className="auth-footer-link">Terms</Link>
            <span className="auth-footer-divider">•</span>
            <span className="auth-footer-copy">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </section>
    </div>
  );
}