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

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
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
      {/* --- Left Panel: Brand Identity & Visual Context --- */}
      <aside className="auth-visual" aria-hidden="true">
        <div className="auth-visual-content">
          {/* Brand */}
          <div className="auth-brand-block">
            <div className="auth-brand-logo">
              <span className="auth-logo-dot" />
              <span className="auth-logo-wordmark">ForgeFlow</span>
            </div>
            <p className="auth-brand-tagline">Workforce operations platform</p>
          </div>

          {/* Product Preview — A subtle, context-rich glimpse */}
          <div className="auth-preview-card">
            <div className="auth-preview-header">
              <span className="auth-preview-label">Today's priorities</span>
              <div className="auth-preview-dots">
                <span style={{ background: "var(--steel)" }} />
                <span style={{ background: "var(--ember)" }} />
                <span style={{ background: "var(--patina)" }} />
              </div>
            </div>
            <div className="auth-preview-body">
              <div className="auth-preview-item">
                <div className="preview-item-marker" style={{ background: "var(--ember)" }} />
                <div className="preview-item-content">
                  <span className="preview-item-title">Inspect relay panel — Site 7</span>
                  <span className="preview-item-meta">Blocked · J. Reyes</span>
                </div>
              </div>
              <div className="auth-preview-item">
                <div className="preview-item-marker" style={{ background: "var(--steel)" }} />
                <div className="preview-item-content">
                  <span className="preview-item-title">Confirm crew certifications</span>
                  <span className="preview-item-meta">In progress · M. Khan</span>
                </div>
                <div className="preview-item-progress">
                  <div className="preview-progress-track">
                    <div className="preview-progress-fill" style={{ width: "62%" }} />
                  </div>
                  <span className="preview-progress-pct">62%</span>
                </div>
              </div>
              <div className="auth-preview-item">
                <div className="preview-item-marker" style={{ background: "var(--patina)" }} />
                <div className="preview-item-content">
                  <span className="preview-item-title">Submit EOD report — Region 4</span>
                  <span className="preview-item-meta">Review · S. Chen</span>
                </div>
              </div>
            </div>
          </div>

          <p className="auth-visual-quote">
            “Every shift, task, and handoff — tracked in one place.”
          </p>
        </div>
      </aside>

      {/* --- Compact Bar (Tablet/Mobile) --- */}
      <div className="auth-compact-bar" aria-hidden="true">
        <span className="auth-logo-dot" />
        <span className="auth-compact-wordmark">ForgeFlow</span>
        <span className="auth-compact-tagline">Workforce Ops</span>
      </div>

      {/* --- Right Panel: Sign-in Form --- */}
      <main className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h1 className="auth-heading">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your workspace to continue.</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
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
                  Forgot?
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
                  Sign in <ArrowIcon style={{ marginLeft: "4px" }} />
                </>
              )}
            </button>
          </form>

          <div className="auth-signup-block">
            <p className="auth-signup-text">
              Don't have an account? <Link href="/register">Create one</Link>
            </p>
            <p className="auth-footer-text">
              © {new Date().getFullYear()} ForgeFlow. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}