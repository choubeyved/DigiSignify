import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Card, CardContent, TextField, Typography,Link, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import GoogleIcon from "../../images/google-color.svg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

 export const Login:React.FC = () => {
    const theme = useTheme()

    const[showPassword,setShowPassword] = useState<boolean>(false)

    const handleOnClick = () => {
      setShowPassword(!showPassword)
    }

    const{register,handleSubmit,formState: {errors},} = useForm(
        {defaultValues:{phoneNumber:"",password:""}}  )

    const onSubmit = (data:any) => (
        console.log(data)  )

    return(
        <>
        <Box sx={{bgcolor:"primary.main",height:"100vh",display:"flex",justifyContent:"center",
          alignItems:"center",flexDirection:"column",p:2}}>
        <Typography sx={{fontSize:{xs:30,md:40},fontFamily:"roboto",letterSpacing:1,color:theme.palette.secondary.main}}>
          DigiSignify</Typography>
          <Card sx={{mt:2,borderRadius:3,width:{xs:"100%",md:500}}}>
            <CardContent >
              <Typography sx={{color:"primary.main",fontSize:{xs:25,md:30},textAlign:"center",mt:2}}>Login</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>

                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",mx:{xs:2,md:8},justifyContent:"center",mt:4}}>

                  <TextField fullWidth placeholder="Your email or phone" InputProps={{ sx:{borderRadius:50}}}
                  {...register("phoneNumber",{ required:"Enter your email or phone", pattern:{
                        value: /^(?:[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}|^\d{10})$/,
                        message:"Enter a valid phone no. Or email address"  }, },)}
                    />
                    {errors.phoneNumber && (<Typography sx={{color:"red",fontSize:10}}>{errors.phoneNumber.message}</Typography>)}

                    <TextField fullWidth placeholder="Your Password"  sx={{mt:2,}} type={showPassword ? "text" : "password"}
                    InputProps={{ endAdornment: (<IconButton onClick={handleOnClick} > {showPassword ? 
                      <VisibilityIcon /> : <VisibilityOffIcon/>} </IconButton>), sx: {borderRadius: 50,},}}
                     {...register("password", {required: "password is required",})}
                    />
                    {errors.password && (<Typography sx={{color:"red",fontSize:10}}>{errors.password.message}</Typography>)}
                    <Typography sx={{fontSize: 10,color: theme.palette.primary.main,ml: "auto",}} >
                   <Link underline="hover">Forgot Password ?</Link> </Typography>

                    <Button type="submit" sx={{borderRadius:15,border:1,mt:3,textTransform:"none",
                     color:"secondary.main", bgcolor: "primary.main","&:hover": { bgcolor:"primary.main",},
                      width: "-webkit-fill-available",py:1.5}}> Log In</Button> 

                    </Box>
                    </form>

                    <Button sx={{color: "secondary.main", borderRadius: 15,textTransform:"none",mx:{xs:2,md:8},py:1.5,mt:1,
                    width: "-webkit-fill-available",bgcolor: "primary.main","&:hover": { bgcolor:"primary.main",}}}
                    startIcon={<img src={GoogleIcon} alt="Google Icon" style={{ width: 15, height: 15 }} /> }  >
                       Login with Google </Button>

               <Typography sx={{fontSize: 9,color: "primary.main",ml:{xs:15,md:23},mt:1,mb:5}} > Not Registered yet ?
              <Link sx={{ color: "primary.main", ml: 1 }} underline="hover"> Signup
              </Link>
            </Typography>

             </CardContent>
            </Card>
        </Box>
        </>
    )
 }





// import React, { useState } from "react";
// import { useTheme } from "@mui/material/styles";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
//   Link,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import GoogleIcon from "../../images/google-color.svg";
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// export const Login: React.FC = () => {
//   const theme = useTheme();
//   const [showPassword, setShowPassword] = useState<boolean>(false);

//   const handleOnClick = () => {
//     setShowPassword(!showPassword);
//   };

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: { phoneNumber: "", password: "" },
//   });

//   const onSubmit = (data: any) => console.log(data);

//   return (
//     <Box
//       sx={{
//         bgcolor: theme.palette.primary.main,
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         p: 2,
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: { xs: 30, sm: 40 },
//           fontFamily: "roboto",
//           letterSpacing: 1,
//           color: theme.palette.secondary.main,
//           textAlign: "center",
//         }}
//       >
//         DigiSignify
//       </Typography>
//       <Card
//         sx={{
//           mt: 2,
//           borderRadius: 3,
//           width: { xs: "100%", sm: 400, md: 500 },
//         }}
//       >
//         <CardContent>
//           <Typography
//             sx={{
//               color: "primary.main",
//               fontSize: { xs: 25, sm: 30 },
//               textAlign: "center",
//               mt: 2,
//             }}
//           >
//             Login
//           </Typography>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 mx: { xs: 2, sm: 8 },
//                 justifyContent: "center",
//                 mt: 4,
//               }}
//             >
//               <TextField
//                 fullWidth
//                 placeholder="Your email or phone"
//                 InputProps={{ sx: { borderRadius: 50 } }}
//                 {...register("phoneNumber", {
//                   required: "Enter your email or phone",
//                   pattern: {
//                     value: /^(?:[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}|^\d{10})$/,
//                     message: "Enter a valid phone no. or email address",
//                   },
//                 })}
//               />
//               {errors.phoneNumber && (
//                 <Typography sx={{ color: "red", fontSize: 10 }}>
//                   {errors.phoneNumber.message}
//                 </Typography>
//               )}
//               <TextField
//                 fullWidth
//                 placeholder="Your Password"
//                 sx={{ mt: 2 }}
//                 type={showPassword ? "text" : "password"}
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton onClick={handleOnClick}>
//                       {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                     </IconButton>
//                   ),
//                   sx: { borderRadius: 50 },
//                 }}
//                 {...register("password", { required: "password is required" })}
//               />
//               {errors.password && (
//                 <Typography sx={{ color: "red", fontSize: 10 }}>
//                   {errors.password.message}
//                 </Typography>
//               )}
//               <Typography
//                 sx={{ fontSize: 10, color: theme.palette.primary.main, ml: "auto", mt: 1 }}
//               >
//                 <Link underline="hover">Forgot Password ?</Link>
//               </Typography>
//               <Button
//                 type="submit"
//                 sx={{
//                   borderRadius: 15,
//                   border: 1,
//                   mt: 3,
//                   textTransform: "none",
//                   color: "secondary.main",
//                   bgcolor: "primary.main",
//                   "&:hover": { bgcolor: "primary.main" },
//                   width: "100%",
//                   py: 1.5,
//                 }}
//               >
//                 Log In
//               </Button>
//             </Box>
//           </form>
//           <Button
//             sx={{
//               color: "secondary.main",
//               borderRadius: 15,
//               textTransform: "none",
//               mx: { xs: 2, sm: 8 },
//               py: 1.5,
//               mt: 1,
//               width: "100%",
//               bgcolor: "primary.main",
//               "&:hover": { bgcolor: "primary.main" },
//             }}
//             startIcon={
//               <img src={GoogleIcon} alt="Google Icon" style={{ width: 15, height: 15 }} />
//             }
//           >
//             Login with Google
//           </Button>
//           <Typography sx={{ fontSize: 9, color: "primary.main", textAlign: "center", mt: 1, mb: 5 }}>
//             Not Registered yet?
//             <Link sx={{ color: "primary.main", ml: 1 }} underline="hover">
//               Signup
//             </Link>
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };
