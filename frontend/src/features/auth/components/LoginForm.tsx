"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { login } from "../api/auth.api";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await login({
        email,
        password,
      });

      // Store tokens
      localStorage.setItem(
        "accessToken",
        response.accessToken,
      );

      localStorage.setItem(
        "refreshToken",
        response.refreshToken,
      );

      // Go to dashboard
      router.push("/dashboard");

    } catch (error) {
      console.error(error);

      setError(
        "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Card
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Stack spacing={3}>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                ForgeFlow
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Sign in to continue
              </Typography>
            </Box>

            <TextField
              label="Email"
              type="email"
              fullWidth
              autoComplete="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              autoComplete="current-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
              >
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              sx={{
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Don't have an account?{" "}

              <Link
                href="/register"
                style={{
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </Typography>

          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}