"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { IconButton, InputAdornment, TextField } from "@mui/material";

import { login } from "../api/auth.api";

/* Small inline icons — kept local so this component has no new dependency
   beyond what the app already uses (MUI). */

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 10.5 7 10.5 7a17.6 17.6 0 0 1-3.14 4.24M6.2 6.2C3.36 8.1 1.5 11 1.5 11s3.5 7 10.5 7a10.9 10.9 0 0 0 5.3-1.36" />
      <path d="M9.9 14.1a3 3 0 0 0 4.2-4.2M1.5 1.5l21 21" />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/** Shared MUI skin so inputs match the app's existing `.form-field` inputs
 *  (see globals.css) instead of MUI's default outlined theme. */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    background: "var(--surface)",
    borderRadius: "6px",
    fontFamily: "inherit",
    fontSize: "14px",
    color: "var(--text)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border)",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border-strong)",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--ember)",
    borderWidth: "1.5px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "11px 12px",
    fontFamily: "inherit",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "var(--text-tertiary)",
    opacity: 1,
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

    try {
      setLoading(true);
      setError("");

      const response = await login({
        email,
        password,
      });

      // Store tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      // Go to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      {/* Left panel — brand identity + a real glimpse of the product.
          Hidden below 1024px in favor of the compact bar. */}
      <aside className="auth-visual" aria-hidden="true">
        <div>
          <div className="auth-visual-brand">
            <span className="auth-visual-dot" />
            <span className="auth-visual-wordmark">ForgeFlow</span>
          </div>
          <p className="auth-visual-tagline">Workforce operations platform</p>
        </div>

        <div className="auth-glimpse">
          <div className="auth-glimpse-bar">
            <span className="auth-glimpse-bar-label">Field Ops — Today</span>
            <div className="auth-glimpse-legend">
              <span
                className="auth-glimpse-legend-dot"
                style={{ background: "var(--steel)" }}
              />
              <span
                className="auth-glimpse-legend-dot"
                style={{ background: "var(--ember)" }}
              />
              <span
                className="auth-glimpse-legend-dot"
                style={{ background: "var(--patina)" }}
              />
            </div>
          </div>

          <div className="auth-glimpse-body">
            <div className="task-card">
              <div className="task-card-top-row">
                <span className="task-card-title">
                  Inspect substation relay panel
                </span>
              </div>
              <div className="task-card-meta-row">
                <span
                  className="task-card-priority"
                  style={{ color: "var(--ember)" }}
                >
                  P1 · BLOCKED
                </span>
              </div>
              <div className="task-card-bottom-row">
                <div className="task-card-assignee">
                  <span
                    className="avatar"
                    style={{ width: 22, height: 22, fontSize: 10 }}
                  >
                    JR
                  </span>
                  <span className="task-card-assignee-name">J. Reyes</span>
                </div>
              </div>
            </div>

            <div className="task-card">
              <div className="task-card-top-row">
                <span className="task-card-title">
                  Confirm crew certifications — Site 4
                </span>
              </div>
              <div className="task-card-meta-row">
                <span
                  className="task-card-priority"
                  style={{ color: "var(--steel)" }}
                >
                  P2 · IN PROGRESS
                </span>
              </div>
              <div className="task-card-bottom-row">
                <div className="task-card-assignee">
                  <span
                    className="avatar"
                    style={{ width: 22, height: 22, fontSize: 10 }}
                  >
                    MK
                  </span>
                  <span className="task-card-assignee-name">M. Khan</span>
                </div>
              </div>
              <div className="task-card-progress-row">
                <div className="task-card-progress-track">
                  <div
                    className="task-card-progress-fill"
                    style={{ width: "62%" }}
                  />
                </div>
                <span className="task-card-progress-pct">62%</span>
              </div>
            </div>
          </div>
        </div>

        <p className="auth-visual-quote">
          Every shift, task, and handoff — tracked in one place.
        </p>
      </aside>

      {/* Compact identity bar — shown instead of the panel above on
          tablet/mobile, so the form stays the visual priority. */}
      <div className="auth-compact-bar" aria-hidden="true">
        <span className="auth-visual-dot" />
        <span className="auth-compact-wordmark">ForgeFlow</span>
        <span className="auth-compact-tagline">Workforce Ops</span>
      </div>

      {/* Right panel — the actual sign-in form */}
      <main className="auth-form-panel">
        <div className="auth-form-container">
          <h1 className="auth-heading">Sign in</h1>
          <p className="auth-subtitle">Sign in to your ForgeFlow workspace.</p>

          <form onSubmit={handleLogin} noValidate>
            <div className="form-field">
              <label className="form-label" htmlFor={emailId}>
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

            <div className="form-field">
              <div className="auth-field-row">
                <label className="form-label" htmlFor={passwordId}>
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
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
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
              className="auth-submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading && <span className="auth-spinner" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="auth-signup">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </p>

          <p className="auth-footer">© {new Date().getFullYear()} ForgeFlow</p>
        </div>
      </main>
    </div>
  );
}
