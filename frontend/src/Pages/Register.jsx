import {useState} from "react";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Register(){



    const [name , setName]=useState("");
    const [email,setEmail]=useState("");
    const [password , setPassword]= useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message , setMessage]=useState("")

    const handleRegister = async () => {
         const userData = {
                 name: name,
                 email: email,
                 password: password
             };

            try {

                   const response = await axios.post(
                       "http://localhost:8080/users/register",
                       userData
                   );

                    setMessage(response.data);

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

                           <Button
                               fullWidth
                               variant="contained"
                               size="large"
                               onClick={handleRegister}
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