"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={login.isPending}
              sx={{
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {login.isPending
                ? "Signing In..."
                : "Sign In"}
            </Button>

            {login.isError && (
              <Typography
                color="error"
                variant="body2"
                textAlign="center"
              >
                Invalid email or password
              </Typography>
            )}

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