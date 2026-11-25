import { useState } from "react";
import api from "../api"

import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [collegeName, setCollegeName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [idCard, setIdCard] = useState(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    // Check password confirmation before calling the API.
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!role) {
        setMessage("Please select your role.");
        return;
      }


      // Validate student verification details
      if (role === "STUDENT") {
        if (!collegeName || !collegeId || !idCard) {
          setMessage("Please provide all college verification details.");
          return;
        }
      }

    setLoading(true);


    const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      // Add college details only for students
      if (role === "STUDENT") {
        formData.append("collegeName", collegeName);
        formData.append("collegeId", collegeId);
        formData.append("idCard", idCard);
      }


    try {
      const response = await api.post(
              "/users/register",
              formData
      );

      const userId = response.data.userId;
      const role = response.data.role

      if (role === "STUDENT") {
        navigate("/api/student-profiles", {
          state: { userId },
        });
      } else if (role === "CLIENT") {
        navigate("/client-profiles", {
          state: { userId },
        });
      }
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
              "Registration failed. Please try again."
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
        boxSizing: "border-box",
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
        onSubmit={handleRegister}
        sx={{
          width: "100%",
          maxWidth: 480,
          boxSizing: "border-box",
          my: 2,
          padding: { xs: 3, sm: 4 },
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
          }}
        >
          Your Skills. Your Opportunities.
        </Typography>

        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 750,
            color: "#0B1F2A",
            mt: 3,
            mb: 1,
          }}
        >
          Create Account
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#607782",
            fontSize: 14,
            mb: 3,
          }}
        >
          Join OpenReach and start your journey
        </Typography>

        {/* Full name */}
        <TextField
          fullWidth
          required
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          sx={inputStyle}
          slotProps={{
              input:{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon sx={{ color: "#607782" }} />
              </InputAdornment>
            ),
          }}}
        />

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
          sx={{ ...inputStyle, mt: 2 }}
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
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          sx={{ ...inputStyle, mt: 2 }}
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

        {/* Confirm password */}
        <TextField
          fullWidth
          required
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          error={
            confirmPassword.length > 0 &&
            password !== confirmPassword
          }
          helperText={
            confirmPassword.length > 0 &&
            password !== confirmPassword
              ? "Passwords do not match"
              : ""
          }
          sx={{ ...inputStyle, mt: 2 }}
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
                  aria-label="Toggle confirm password visibility"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}}
        />

        {/* Role selection */}
        <Typography
          sx={{
            color: "#0B1F2A",
            fontWeight: 550,
            mt: 2.5,
            mb: 1,
          }}
        >
          Register as :
        </Typography>

        <RadioGroup
          row
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{
            display: "flex",
            gap: 1,
            "& .MuiFormControlLabel-root": {
              flex: 1,
              m: 0,
              px: 1,
              py: 0.5,
              borderRadius: "12px",
              border: "1px solid rgba(96, 119, 130, 0.25)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
            "& .MuiFormControlLabel-root:has(.Mui-checked)": {
              border: "1px solid #00AFC1",
              backgroundColor: "rgba(0, 175, 193, 0.08)",
            },
            "& .MuiRadio-root.Mui-checked": {
              color: "#00AFC1",
            },
          }}
        >
          <FormControlLabel
            value="STUDENT"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <SchoolOutlinedIcon fontSize="small" />
                <Typography fontSize={14}>Student</Typography>
              </Box>
            }
          />

          <FormControlLabel
            value="CLIENT"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <BusinessCenterOutlinedIcon fontSize="small" />
                <Typography fontSize={14}>Client</Typography>
              </Box>
            }
          />
        </RadioGroup>

        {role === "STUDENT" && (
          <Box sx={{ mt: 2 }}>

            <TextField
              fullWidth
              required
              label="College Name"
              placeholder="Enter your college name"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              sx={inputStyle}
            />

            <TextField
              fullWidth
              required
              label="College ID"
              placeholder="Enter your college ID"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              sx={{ ...inputStyle, mt: 2 }}
            />

            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{ mt: 2, py: 1.5, borderRadius: "12px" }}
            >
              Upload College ID Card

              <input
                type="file"
                hidden
                accept="image/png,image/jpeg,application/pdf"
                onChange={(e) => {
                  setIdCard(e.target.files[0] || null);
                }}
              />
            </Button>

            { idCard && (
              <Typography sx={{ mt: 1, fontSize: 13 }}>
                Selected File: {idCard.name}
              </Typography>
            )}

          </Box>
        )}





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

        {/* Register button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
          sx={buttonStyle}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
          ) : (
            "CREATE ACCOUNT"
          )}
        </Button>

        {/* Login link */}
        <Typography
          sx={{
            textAlign: "center",
            color: "#455A64",
            fontSize: 14,
            mt: 3,
          }}
        >
          Already have an account?{" "}
          <Box
            component={RouterLink}
            to="/login"
            sx={{
              color: "#009FB0",
              fontWeight: 700,
              textDecoration: "none",
              ml: 0.5,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

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