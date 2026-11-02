import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

function StudentProfile() {

    const location = useLocation();
    const navigate = useNavigate();

    // Get the userId passed from Register/Login
    const userId = location.state?.userId;

    // Store student profile details
    const [profile, setProfile] = useState({
        college: "",
        course: "",
        skills: "",
        experience: "",
        bio: "",
        github: "",
        portfolio: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Update form values when user types
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit student profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!userId) {
            setMessage("User ID is missing. Please register or log in again.");
            return;
        }

        setLoading(true);

        const profileData = {
            userId: userId,
            college: profile.college,
            course: profile.course,
            skills: profile.skills,
            experience: profile.experience,
            bio: profile.bio,
            github: profile.github,
            portfolio: profile.portfolio,
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/student-profiles",
                profileData
            );

            console.log("Profile created:", response.data);

            navigate("/find-work");

        } catch (error) {
            console.error("Profile creation error:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to create profile. Please try again."
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
                backgroundColor: "#F3FCFD",
                padding: 2,

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
                onSubmit={handleSubmit}
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    padding: { xs: 3, sm: 4 },
                    borderRadius: "24px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 10px 35px rgba(8,127,140,0.12)",
                }}
            >
                {/* Heading */}
                <Box textAlign="center" mb={3}>
                    <SchoolOutlinedIcon
                        sx={{ fontSize: 45, color: "#00AFC1" }}
                    />

                    <Typography
                        variant="h4"
                        fontWeight={800}
                        color="#0B1F2A"
                        sx={{marginBottom:4}}
                    >
                        Complete Your Profile
                    </Typography>

                    <Typography color="#607782" sx={{marginBottom:2}}>
                        Tell us about yourself and your skills.
                    </Typography>
                </Box>

                {/* College */}
                <TextField
                    fullWidth
                    required
                    label="College / University"
                    name="college"
                    value={profile.college}
                    onChange={handleChange}
                    placeholder="Enter your college name"
                    sx={{ mb: 2 }}
                />

                {/* Course */}
                <TextField
                    fullWidth
                    required
                    label="Course"
                    name="course"
                    value={profile.course}
                    onChange={handleChange}
                    placeholder="e.g. BE Information Technology"
                    sx={{ mb: 2 }}
                />

                {/* Skills */}
                <TextField
                    fullWidth
                    required
                    label="Skills"
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    placeholder="Java, React, Spring Boot"
                    helperText="Separate your skills using commas."
                    sx={{ mb: 2 }}
                />


                {/* Bio */}
                <TextField
                    fullWidth
                    required
                    label="About You"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Write a short introduction"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />

                {/* GitHub */}
                <TextField
                    fullWidth
                    label="GitHub URL"
                    name="github"
                    value={profile.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    sx={{ mb: 2 }}
                />

                {/* Portfolio */}
                <TextField
                    fullWidth
                    label="Portfolio URL"
                    name="portfolio"
                    value={profile.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    sx={{ mb: 2 }}
                />

                {/* Error message */}
                {message && (
                    <Typography
                        color="error"
                        textAlign="center"
                        mb={2}
                    >
                        {message}
                    </Typography>
                )}

                {/* Submit button */}
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: "12px",
                        backgroundColor: "#00AFC1",
                        fontWeight: 700,
                        "&:hover": {
                            backgroundColor: "#087F8C",
                        },
                    }}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            sx={{ color: "#FFFFFF" }}
                        />
                    ) : (
                        "CREATE PROFILE"
                    )}
                </Button>
            </Box>
        </Box>
    );
}

export default StudentProfile;