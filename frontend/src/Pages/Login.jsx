import { useState } from "react";
import api from "../api"
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      const response = await api.post(
         "/users/login",
        loginData
      );

      const userId = response.data.userId;
      const role = response.data.role;
      const token = response.data.token;
      localStorage.setItem("token",token);

      if (role === "STUDENT") {
        try {
          await api.get(`/api/student-profiles/${userId}`);

          // Student profile already exists.
          navigate("/");
        } catch (error) {
          if (error.response?.status === 404) {
            // Student profile does not exist yet.
            navigate("/api/student-profiles", {
              state: { userId },
            });
          } else {
            setMessage("Unable to check your student profile.");
          }
        }
      } else if (role === "CLIENT") {
        navigate("/");
      } else {
        setMessage("Unable to identify your account role.");
      }
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
              "Login failed. Please check your credentials."
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
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: 2, sm: 3 },
        backgroundImage: `
          linear-gradient(
            rgba(243, 252, 253, 0.12),
            rgba(243, 252, 253, 0.12)
          ),
          url("/openreach-bg.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: 460,
          boxSizing: "border-box",
          padding: { xs: 3, sm: 5 },
          borderRadius: "28px",
          backgroundColor: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.85)",
          boxShadow: "0 20px 60px rgba(8, 127, 140, 0.15)",
        }}
      >
        {/* OpenReach branding */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 800,
            color: "#0B1F2A",
            letterSpacing: "-1px",
          }}
        >
          Open
          <Box component="span" sx={{ color: "#00AFC1" }}>
            Reach
          </Box>
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#607782",
            fontSize: 14,
            mt: 0.5,
            mb: 3,
          }}
        >
          Your Skills. Your Opportunities.
        </Typography>

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 750,
            color: "#0B1F2A",
            mb: 3,
          }}
        >
          Login
        </Typography>

        {/* Email */}
        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          sx={inputStyle}
          slotProps={{
              input:{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon sx={{ color: "#607782" }} />
              </InputAdornment>
            ),
          }}}
        />

        {/* Password */}
        <TextField
          fullWidth
          required
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          sx={{ ...inputStyle, mt: 2.2 }}
          slotProps={{
              input:{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: "#607782" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}}
        />

        {/* Error message */}
        {message && (
          <Typography
            role="alert"
            sx={{
              color: "#C62828",
              fontSize: 14,
              mt: 2,
              textAlign: "center",
            }}
          >
            {message}
          </Typography>
        )}

        {/* Login button */}
        <Button
          fullWidth
          type="submit"
          disabled={loading}
          variant="contained"
          sx={buttonStyle}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
          ) : (
            "LOGIN"
          )}
        </Button>

        {/* Sign-up link */}
        <Typography
          sx={{
            textAlign: "center",
            color: "#455A64",
            fontSize: 14,
            mt: 3,
          }}
        >
          Don't have an account?{" "}
          <Box
            component={RouterLink}
            to="/register"
            sx={{
              color: "#009FB0",
              fontWeight: 700,
              textDecoration: "none",
              ml: 0.5,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign Up
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

// Shared input styling
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    "& fieldset": {
      borderColor: "rgba(96, 119, 130, 0.25)",
    },
    "&:hover fieldset": {
      borderColor: "#00AFC1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00AFC1",
      borderWidth: "2px",
    },
  },
};

// Teal button styling
const buttonStyle = {
  mt: 3,
  py: 1.5,
  borderRadius: "12px",
  background: "linear-gradient(135deg, #19C5D2, #009FB5)",
  fontWeight: 700,
  fontSize: 15,
  boxShadow: "0 6px 16px rgba(0, 175, 193, 0.22)",
  "&:hover": {
    background: "linear-gradient(135deg, #087F8C, #006B78)",
    boxShadow: "0 8px 20px rgba(8, 127, 140, 0.25)",
  },
};