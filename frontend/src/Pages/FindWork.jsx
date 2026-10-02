
import {useEffect , useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from "@mui/material";

export default function FindWork(){
    const [jobs , setJobs]= useState([]);
    useEffect(() => {
            axios.get("http://localhost:8080/jobs/findjob")
                .then((response) => {
                    setJobs(response.data);
                })
                .catch((error)=>{
                    console.log("ERROR:", error)
                    });
        }, []);

    return (
          <Box sx={{padding:4}}>

           {jobs.map((job)=>(
              <Card key={job.id} sx={{marginTop:2}}>
                  <CardContent>

                       {/* TOP */}
                             <Box
                             sx={{
                                 display: "flex",
                                 justifyContent: "space-between",
                                 alignItems: "center"
                                 }}

                             >
                                 <Typography variant="h6" sx={{ fontWeight: 700 }} >
                                     {job.title}
                                 </Typography>

                                  <Typography sx={{ fontWeight: 700 }}>
                                      ₹{job.budget}
                                   </Typography>
                             </Box>


                      <Typography sx={{marginTop:1}}>
                          {job.description}
                      </Typography>

                      <Typography>
                         Skills: {job.skills}
                      </Typography>

                      <Typography>
                         Experience: {job.experience}
                       </Typography>

                      <Typography>
                         Category: {job.category}
                       </Typography>

                       <Typography>
                           Job Type: {job.jobType}
                       </Typography>



                        <Button variant="contained" sx={{marginTop:2}}>
                            View Job
                          </Button>



                   </CardContent>
              </Card>
             ))}

          </Box>
        )
    }