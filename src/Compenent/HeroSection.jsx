import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import DesignServicesIcon from "@mui/icons-material/DesignServices";


export default function HeroSection() {
  return (
    /* Hero container */
    <Box
      sx={{
        backgroundColor: "#F3FCFD",
        minHeight: "700px",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        padding: {
          md: "50px 60px",
          xs: "30px 20px",
        },
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Left side */}
      <Box>
        {/* Small badge */}
        <Typography
          sx={{
            display: "inline-block",
            backgroundColor: "#D9F5F7",
            color: "#087F8C",
            padding: "8px 16px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          🎓 MADE FOR COLLEGE STUDENTS
        </Typography>

        {/* Main heading */}
        <Typography
          variant="h2"
          sx={{
            color: "#0B1F2A",
            fontWeight: "bold",
            marginTop: "25px",
            maxWidth: "700px",
          }}
        >
          Dive Into{" "}
          <span style={{ color: "#00AFC1" }}>
            Opportunities.
          </span>
          <br />
          Surf Your{" "}
          <span style={{ color: "#00AFC1" }}>
            Potential.
          </span>
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "#607782",
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          The freelance marketplace built for
          <br />
          college students, by students.
        </Typography>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <TextField
            placeholder="Search for services or skills..."
            sx={{
              width: {
                xs: "100%",
                md: "440px",
              },
              backgroundColor: "#FFFFFF",

              "& .MuiOutlinedInput-root": {
                borderRadius: "12px 0 0 12px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#607782" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00AFC1",
              color: "#FFFFFF",
              padding: "0 25px",
              borderRadius: "0 12px 12px 0",

              "&:hover": {
                backgroundColor: "#087F8C",
              },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Popular */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#0B1F2A",
              marginRight: "8px",
            }}
          >
            Popular:
          </Typography>

          <Button
            sx={{
              border: "1px solid #BFECEF",
              borderRadius: "20px",
              color: "#087F8C",
              textTransform: "none",
              padding: "6px 16px",
            }}
          >
            Design
          </Button>

          <Button
            sx={{
              border: "1px solid #BFECEF",
              borderRadius: "20px",
              color: "#087F8C",
              textTransform: "none",
              padding: "6px 16px",
            }}
          >
            Development
          </Button>

          <Button
            sx={{
              border: "1px solid #BFECEF",
              borderRadius: "20px",
              color: "#087F8C",
              textTransform: "none",
              padding: "6px 16px",
            }}
          >
            Writing
          </Button>

          <Button
            sx={{
              border: "1px solid #BFECEF",
              borderRadius: "20px",
              color: "#087F8C",
              textTransform: "none",
              padding: "6px 16px",
            }}
          >
            Marketing
          </Button>

          <Button
            sx={{
              border: "1px solid #BFECEF",
              borderRadius: "20px",
              color: "#087F8C",
              textTransform: "none",
              padding: "6px 16px",
            }}
          >
            Video
          </Button>

          <Button
            sx={{
              border: "1px solid #BFECEF",
              borderRadius: "20px",
              color: "#087F8C",
              textTransform: "none",
              padding: "6px 16px",
            }}
          >
            More
          </Button>
        </Box>
      </Box>

      {/* Right side */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          minHeight: {
            md: "500px",
            xs: "400px",
          },

          /* Light blue background behind cards */
         
        }}
      >
        {/* Code icon */}
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "120px",
            width: "70px",
            height: "70px",
            backgroundColor: "#19D3E6",
            borderRadius: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#FFFFFF",
            fontSize: "28px",
            fontWeight: "bold",
            transform: "rotate(-20deg)",
          }}
        >
          {"</>"}
        </Box>

        {/* UI/UX Design Card */}
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "20px",
            width: "200px",
            padding: "22px",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Icon + Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: "flex",
                width: "50px",
                height: "40px",
                backgroundColor: "#19D3E6",
                borderRadius: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DesignServicesIcon
                sx={{
                  color: "#FFFFFF",
                  fontSize: "27px",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0B1F2A",
              }}
            >
              UI/UX Design
            </Typography>
          </Box>

          <Typography
            sx={{
              marginLeft: "70px",
              color: "#607782",
              fontSize: "16px",
            }}
          >
            Starting at ₹999
          </Typography>

          <Typography
            sx={{
              marginLeft: "70px",
              marginTop: "8px",
              color: "#FF8A5B",
              fontSize: "15px",
            }}
          >
            ⭐ 4.9 (32)
          </Typography>
        </Box>

        {/* Video Editing Card */}
        <Box
          sx={{
            position: "absolute",
            top: "275px",
            right: "60px",
            width: "260px",
            padding: "22px",
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Video icon + title */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "50px",
                height: "40px",
                backgroundColor: "#19D3E6",
                borderRadius: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VideoCameraBackIcon
                sx={{
                  color: "#FFFFFF",
                }}
              />
            </Box>

            <Typography
              sx={{
                marginTop: 0.8,
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0B1F2A",
              }}
            >
              Video Editing
            </Typography>
          </Box>

          <Typography
            sx={{
              marginLeft: "70px",
              color: "#607782",
              fontSize: "16px",
            }}
          >
            Starting at ₹699
          </Typography>

          <Typography
            sx={{
              marginLeft: "70px",
              marginTop: 1,
              color: "#FF8A5B",
              fontSize: "15px",
            }}
          >
            ⭐ 4.8 (19)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}