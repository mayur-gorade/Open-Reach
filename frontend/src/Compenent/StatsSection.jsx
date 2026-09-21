import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import AppsIcon from '@mui/icons-material/Apps';


export default function StatsSection(){
    return(
       <Box
         sx={{
            display:"flex",
            flexWrap:"wrap",
            marginTop: {md:"-160px", xs:"0px"},
            marginLeft:{md:"60px", xs:"10px"},
            marginRight:{md:"60px", xs:"10px"},
            padding:"30px",
            backgroundColor:"white",
            boxSizing: "border-box",
            width:"auto",
            borderRadius: "20px",
         }}
       >
      
        {/*Student*/}
         <Box
         sx={{
            flex:1,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:1,
            marginLeft:-2


         }}
         >
            <GroupIcon sx={{color:"#00AFC1",fontSize:"40px"}}/>

            <Box>
               <Typography
                sx={{
                  fontSize:"24px",
                  fontWeight:"bold",
                  color: "#0B1F2A",
                }}
               >10K+</Typography>

               <Typography
                sx={{
                  color:"#607782",
                }}
               >
                  Student
               </Typography>
            </Box>

         </Box>

            {/* Projects */}
         <Box
          sx={{
            flex:1,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:2


         }}
         >
            <BusinessCenterIcon sx={{color:"#00AFC1",fontSize:"40px"}}/>

            <Box>
               <Typography
                sx={{
                  fontSize:"24px",
                  fontWeight:"bold",
                  color: "#0B1F2A",
                }}
               >5K+</Typography>

               <Typography
                sx={{
                  color:"#607782",
                }}
               >
                Projects Completed
               </Typography>
            </Box>

         </Box>
         
           {/*Ratings*/}
         <Box
         sx={{
            flex:1,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:2


         }}
         >
            <StarIcon sx={{color:"#00AFC1",fontSize:"40px"}}/>

            <Box>
               <Typography
                sx={{
                  fontSize:"24px",
                  fontWeight:"bold",
                  color: "#0B1F2A",
                }}
               >4.9/5</Typography>

               <Typography
                sx={{
                  color:"#607782",
                }}
               >
                  Average Rating
               </Typography>
            </Box>

         </Box>
        
          {/*Categories*/}
         <Box
         sx={{
            flex:1,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            gap:2


         }}
         >
            <AppsIcon sx={{color:"#00AFC1",fontSize:"40px"}}/>

            <Box>
               <Typography
                sx={{
                  fontSize:"24px",
                  fontWeight:"bold",
                  color: "#0B1F2A",
                }}
               >50+</Typography>

               <Typography
                sx={{
                  color:"#607782",
                }}
               >
                  Categories
               </Typography>
            </Box>

         </Box>
         

       </Box>
    );
}