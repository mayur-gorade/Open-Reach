import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#0B1F2A",
      }}
    >
      <Toolbar>

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/log.PNG"
            alt="OpenReach logo"
            style={{
              width: "50px",
              height: "40px",
            }}
          />

          <Typography
            variant="h6"   
            sx={{
              fontWeight: "550",
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
            marginRight: 5,
          }}
        >
          <Button
            component="a"
            href="/find-work"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Find Work
          </Button>

          <Button
            component="a"
            href="/find-talent"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Find Talent
          </Button>

          <Button
            component="a"
            href="/how-it-works"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            How It Works
          </Button>

          <Button
            component="a"
            href="/explore"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Explore
          </Button>

          <Button
            component="a"
            href="/blog"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Blog
          </Button>
        </Box>


        {/* Login and Signup */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            marginLeft: "auto",
            marginRight: 3,
          }}
        >
          <Button sx={{ color: "#0B1F2A" }}>
            Log In
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00AFC1",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#087F8C",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>


        {/* Mobile Menu Button */}
        <Button
          onClick={() => setMenuOpen(!menuOpen)}
          sx={{
            display: { xs: "block", md: "none" },
            marginLeft: "auto",
            minWidth: "40px",
            color: "#0B1F2A",
          }}
        >
          <MenuIcon />
        </Button>

      </Toolbar>


      {/* Mobile Navigation */}
      {menuOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            right: 0,
            width: "200px",
            backgroundColor: "#FFFFFF",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 2,
            
          }}
        >
          <Button
            component="a"
            href="/find-work"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Find Work
          </Button>

          <Button
            component="a"
            href="/find-talent"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Find Talent
          </Button>

          <Button
            component="a"
            href="/how-it-works"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            How It Works
          </Button>

          <Button
            component="a"
            href="/explore"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Explore
          </Button>

          <Button
            component="a"
            href="/blog"
            sx={{
              color: "#0B1F2A",
              textTransform: "none",
            }}
          >
            Blog
          </Button>
        </Box>
      )}

    </AppBar>
  );
}