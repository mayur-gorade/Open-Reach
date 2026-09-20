import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CategoryCard from "./CategoryCard";

import DrawIcon from "@mui/icons-material/Draw"
import CodeIcon from "@mui/icons-material/Code";
import CampaignIcon from "@mui/icons-material/Campaign";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";


export default function Categories(){
    return (
        <Box
 sx={{
    backgroundColor:"#F3FCFD",
    padding:{
        xs:"40px 20px",
        md:"50px 60px"  
    },
  
 }}
>

    {/*Header*/}
    <Box
     sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          
          flexDirection: {
            xs: "column",
            md: "row",
          },

          alignItems: {
            xs: "flex-start",
            md: "center",
           },

          gap: {
            xs: 2,
            md: 0,
          },
     }}
    >
    {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#0B1F2A",
          }}
        >
          Explore{" "}
          <span style={{ color: "#00AFC1" }}>
            Popular
          </span>{" "}
          Categories
        </Typography>

        {/* View All */}
        <Button
          sx={{
            color: "#00AFC1",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          View all categories →
        </Button>

    </Box>


    {/* Cards Container */}
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          },

          gap: 3,
        }}
      >

        {/* Card 1 */}
        <CategoryCard
          icon={<DrawIcon />}
          title="Design & Creative"
          services="1200+ services"
        />

        {/* Card 2 */}
        <CategoryCard
          icon={<CodeIcon />}
          title="Development"
          services="1500+ services"
        />

        {/* Card 3 */}
        <CategoryCard
          icon={<EditIcon />}
          title="Writing & Translation"
          services="800+ services"
        />

        {/* Card 4 */}
        <CategoryCard
          icon={<CampaignIcon />}
          title="Marketing"
          services="700+ services"
        />

        {/* Card 5 */}
        <CategoryCard
          icon={<VideoLibraryIcon />}
          title="Video & Animation"
          services="600+ services"
        />

        {/* Card 6 */}
        <CategoryCard
          icon={<MoreHorizIcon />}
          title="More Categories"
          services="Explore all"
        />

      </Box>


</Box>
    )
}