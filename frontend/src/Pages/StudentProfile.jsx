import{Box,Typography,TextField,Button} from "@mui/material";
import { useState } from "react";
import axios from "axios";


export default function StudentProfile(){
    const [profile, setProfile] = useState({
      college: "",
      course: "",
      skills: "",
      experience: "",
      bio: "",
      github: "",
      portfolio: "",
    });

const handleChange=(e)=>{
     const { name, value } = e.target;
      setProfile({...profile,[name]:value})

    }

const handleSubmit = async (e) =>{
    e.preventDefault();

    try{
        const response = await axios.post( "http://localhost:8080/api/student-profiles",

            {
               ...profile,
               userId:1
            }

          );
         console.log("profile saved : " , response.data )

        }catch(error){
            console.error("failed to save profile; " , error.response?.data || error.message)

            }


    }

    return (
        <Box
          sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              minHeight:"100vh"

              }}
        >

            <Box
               sx={{
                   padding:3,
                   width:"100%",
                   maxWidth:"500px",
                   backgroundColor:"#FFFFFF",
                   borderRadius:3,
                   boxShadow: "0px 4px 20px rgba(11, 31, 42, 0.08)",

                   }}
            >

              <Typography
               variant="h4"
               sx={{fontWeight:"bold"}}

              >
                 Create Student Profile
              </Typography>

              <Typography
               sx={{color: "#607782"}}
               >
               Tell us about your education, skills, and experience.
               </Typography>

                 <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        marginTop:2,
                        display:"flex",
                        flexDirection:"column",
                        gap:2.5,
                        }}>

                     <TextField
                      label="College"
                      name="college"
                      value={profile.college}
                      onChange={handleChange}
                      fullWidth
                      required/>


                     <TextField
                     label="Course"
                     name="course"
                     value={profile.course}
                     onChange={handleChange}
                     fullWidth
                     required/>

                     <TextField
                       label="Skills"
                       name="skills"
                       value={profile.skills}
                       onChange={handleChange}
                       placeholder="eg:Java, Spring Boot, React"
                       fullWidth
                       required
                     />

                     <TextField
                       label="Experience"
                       name="experience"
                       value={profile.experience}
                       onChange={handleChange}
                       placeholder="Fresher or describe your experience"
                       fullWidth
                     />

                     <TextField
                       label="Bio"
                       name="bio"
                       value={profile.bio}
                       onChange={handleChange}
                       multiline
                       rows={4}
                       fullWidth
                     />

                 <TextField
                   label="GitHub URL"
                   name="github"
                   value={profile.github}
                   onChange={handleChange}
                   type="url"
                   fullWidth
                 />

                 <TextField
                   label="Portfolio URL"
                   name="portfolio"
                   value={profile.portfolio}
                   onChange={handleChange}
                   type="url"
                   fullWidth
                 />

                 <Button
                   type="submit"
                   variant="contained"
                   size="large"
                   sx={{
                     mt: 1,
                     py: 1.3,
                     backgroundColor: "#00AFC1",
                     "&:hover": { backgroundColor: "#087F8C" },
                   }}
                 >
                   Save Profile
                 </Button>
                </Box>

            </Box>

        </Box>

        );
    }