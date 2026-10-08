import{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Typography
} from "@mui/material";


export default function JobDetails(){
    const {id} = useParams();
    const [job , setJobDetails]=useState("");
    useEffect(()=>{
           axios.get(`http://localhost:8080/jobs/job/${id}`)
               .then((response)=>{
                   console.log("JOB:", response.data);
                    setJobDetails(response.data)
               })
               .catch((error)=>{
                     console.log("ERROR : " ,error)
                   })

        },[id]);

       // While job is being fetched
         if (!job) {
             return (
                 <Typography sx={{ padding: 4 }}>
                     Loading...
                 </Typography>
             );
         }

    return(
          <Box sx={{
              padding:4
              }}>

                <Card>
                    <CardContent>
                          {/* Job Header */}
                          <Box
                             sx={{
                                 display:"flex",
                                 justifyContent:"space-between",
                                 alignItems:"center"
                                 }}
                          >

                                <Typography variant="h4" sx={{fontWeight:700}}>
                                    ₹{job.title}
                                </Typography>

                                <Typography variant="h4" sx={{fontWeight:700}}>
                                    ₹{job.budget}
                                </Typography>



                          </Box>



                                 {/* Category and Job Type */}

                          <Box
                             sx={{
                                 display:"flex",
                                 gap:1,
                                 marginTop:2
                                 }}
                          >

                             <Chip label={<span><strong>Category:</strong> {job.category}</span>}  />
                             <Chip  label={<span><strong>Job Type:</strong> {job.jobType} </span>} />

                          </Box>

                                        {/* Description */}
                          <Typography
                              variant="h6"
                              sx={{marginTop:4,fontWeight:700}}
                            >
                               About the project
                          </Typography>

                          <Typography sx={{marginTop:1}}>
                              {job.description}
                          </Typography>


                          {/* Skills */}
                          <Typography
                            sx={{marginTop:4,fontWeight:700}}
                          >
                            Required Skills
                          </Typography>

                         <Box
                           sx={{
                              display:"flex",
                              gap:3,
                              marginTop:1,
                              flexWrap:"wrap"

                               }}
                         >

                          {job.skills.split(",").map((skill)=>(

                                <Chip
                                   key={skill}
                                   label={skill.trim()}
                                />
                              ))}

                         </Box>


                             {/*  JOB INFORMATION  */}

                         <Typography
                                 variant="h6"
                                 sx={{
                                     marginTop: 4,
                                     fontWeight: 700
                                      }}

                          >
                              Job Information
                        </Typography>


                        <Box sx={{ marginTop: 1 }}>

                           <Typography>
                               <strong>Experience:</strong>{" "}
                                    {job.experience}
                          </Typography>
                        </Box>

                       <Box sx={{ marginTop: 4 }}>

                        <Button
                            variant="contained"
                            size="large"
                        >
                            Apply Now
                        </Button>

                      </Box>


                    </CardContent>
                </Card>

          </Box>
        )






    }