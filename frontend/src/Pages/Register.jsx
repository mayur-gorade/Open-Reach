import {useState} from "react";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import {Radio,
        RadioGroup,
        FormControlLabel} from "@mui/material";
import {useNavigate} from "react-router-dom"

import axios from "axios";


export default function Register(){



    const [name , setName]=useState("");
    const [email,setEmail]=useState("");
    const [password , setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role , setRole]=useState("");
    const [message , setMessage]=useState("")

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
         const userData = {
                 name: name,
                 email: email,
                 password: password,
                 role:role
             };

            try {

                   const response = await axios.post(
                       "http://localhost:8080/users/register",
                       userData
                   );

                    setMessage(response.data);

                    if (role === "STUDENT") {
                      navigate("/api/student-profiles");
                    } else if (role === "CLIENT") {
                      navigate("/client-profiles");
                    }

               } catch (error) {

                   console.log(error);
                   setMessage("Registration failed");


               }

    };

    return (
          <Box
           sx={{
               minHeight:"100vh",
               display:"flex",
               justifyContent:"center",
               alignItems:"center",
                backgroundColor: "#F3FCFD",
                 padding: 2
               }}
          >

           <Box
              component="form"
              onSubmit={handleRegister}
              sx={{
                width: "100%",
                maxWidth: "450px",
                backgroundColor: "#FFFFFF",
                padding: 4,
                borderRadius: 3,
                boxShadow: 3


                }}

           >

                        <Typography
                              variant="h4"
                              sx={{
                                  fontWeight: 700,
                                  textAlign: "center",
                                  color: "#0B1F2A",
                                  marginBottom: 3
                              }}
                          >
                              Create Account
                          </Typography>


                          <TextField
                                fullWidth
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ marginBottom: 2 }}
                          />

                          <TextField
                              fullWidth
                              label="Email"
//                               value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              sx={{ marginBottom: 2 }}

                          />

                          <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                              sx={{ marginBottom: 3 }}


                          />


                         <TextField
                              fullWidth
                              label="confirmPassword"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              sx={{ marginBottom: 2 }}
                               />


                         <Typography sx={{marginBottom:1,fontWeight:500}}>Choose your role :</Typography>

                         <RadioGroup
                                value={role}
                                onChange={(e)=>setRole(e.target.value)}
                         >
                         <FormControlLabel
                             value="STUDENT"
                             control={<Radio/>}
                             label="student"
                         />

                          <FormControlLabel
                              value="CLIENT"
                              control={<Radio/>}
                              label="client"
                             />


                         </RadioGroup>

                           <Button
                               type="sumbit"
                               fullWidth
                               variant="contained"
                               size="large"

                                 >
                                   REGISTER
                            </Button>


                             {message && (
                                 <Typography sx={{ mt: 2 }}>
                                     {message}
                                  </Typography>
                              )}



            </Box>

          </Box>



        )
    }