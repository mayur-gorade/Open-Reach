import { backdropClasses } from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CategoryCard({icon , title ,services}){
   return ( <Box
      sx={{
        backgroundColor:"#FFFFFF",
        padding:"25px",
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
     
      {/* Icon */}
    <Box
       sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#00AFC1",
        }}
    
    >
        {icon}

    </Box>

     {/* Title */}

     <Typography
      sx={{
        marginTop:"15px",
        fontWeight:"bold",
        color:"#0B1F2A"
      }}
     >
       {title}
     </Typography>

    {/* Services */}
      <Typography
        sx={{
          marginTop: "8px",
          color: "#607782",
          fontSize: "14px",
        }}
      >
        {services}
      </Typography>
     
     
    </Box>
   )
}