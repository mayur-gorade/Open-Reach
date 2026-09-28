import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography
} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [message , setMessage]=useState("")

  const handleLogin=async ()=>{

    const loginData = {
        email: email,
        password: password
    };

     try{
         const response = await axios.post(
                     "http://localhost:8080/users/login",
                     loginData
                 );

             if (response.data === "Login successful") {

                         navigate("/");

                     } else {

                         setMessage(response.data);
                     }
         }catch(error){
                   console.log(error);
                    setMessage(error.response.data);

             }

      }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F3FCFD",
                padding: 2
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "#FFFFFF",
                    padding: 4,
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: 600,
                        marginBottom: 3
                    }}
                >
                    Login
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        marginTop: 3,
                        backgroundColor: "#00AFC1",
                        "&:hover": {
                            backgroundColor: "#087F8C"
                        }
                    }}

                 onClick={handleLogin}
                >
                    Login
                </Button>


               <Typography>
                 {message}
               </Typography>

            </Box>

        </Box>
    );
}