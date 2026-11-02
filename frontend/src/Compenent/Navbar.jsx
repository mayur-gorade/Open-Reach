
import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // Navigation function
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (

    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#0B1F2A",
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "70px",
        }}
      >

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/")}
        >

          <img
            src="/log.PNG"
            alt="OpenReach logo"
            style={{
              width: "50px",
              height: "40px",
              objectFit: "contain",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            OpenReach
          </Typography>

        </Box>


        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            marginLeft: 5,
            marginRight: "auto",
          }}
        >

          <Button
            onClick={() => handleNavigation("/find-work")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Find Work
          </Button>

          <Button
            onClick={() => handleNavigation("/find-talent")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Find Talent
          </Button>

          <Button
            onClick={() => handleNavigation("/how-it-works")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            How It Works
          </Button>

          <Button
            onClick={() => handleNavigation("/explore")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Explore
          </Button>

          <Button
            onClick={() => handleNavigation("/blog")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Blog
          </Button>

        </Box>


        {/* Login, Signup and Mobile Menu */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 2 },
            marginLeft: "auto",
          }}
        >

          {/* Login */}
          <Button
            onClick={() => handleNavigation("/login")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
              minWidth: "auto",
              px: { xs: 1, sm: 2 },
            }}
          >
            Log In
          </Button>


          {/* Signup */}
          <Button
            variant="contained"
            onClick={() => handleNavigation("/register")}
            sx={{
              backgroundColor: "#00AFC1",
              borderRadius: "15px",
              textTransform: "none",
              whiteSpace: "nowrap",
              px: { xs: 1.5, sm: 2.5 },

              "&:hover": {
                backgroundColor: "#087F8C",
              },
            }}
          >
            Sign Up
          </Button>


          {/* Mobile Menu Button */}
          <Button
            onClick={() => setMenuOpen(!menuOpen)}
            sx={{
              display: { xs: "flex", md: "none" },
              minWidth: "40px",
              color: "#0B1F2A",
              ml: { xs: 0.5, sm: 1 },
            }}
          >

            {menuOpen ? <CloseIcon /> : <MenuIcon />}

          </Button>

        </Box>

      </Toolbar>


      {/* Mobile Navigation */}
      {menuOpen && (

        <Box
          sx={{
              position:"absolute",
              right:0,
              top:"70px",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "flex-end",
            padding: 2,
            gap: 1,
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E5EEF0",
            zIndex:10
          }}
        >

          <Button
            onClick={() => handleNavigation("/find-work")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            Find Work
          </Button>

          <Button
            onClick={() => handleNavigation("/find-talent")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            Find Talent
          </Button>

          <Button
            onClick={() => handleNavigation("/how-it-works")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            How It Works
          </Button>

          <Button
            onClick={() => handleNavigation("/explore")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            Explore
          </Button>

          <Button
            onClick={() => handleNavigation("/blog")}
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            Blog
          </Button>

        </Box>

      )}

    </AppBar>

  );
}
