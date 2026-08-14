"use client";

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

export default function LoginForm() {
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
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              autoComplete="current-password"
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Sign In
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