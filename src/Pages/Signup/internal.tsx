import React, { useState } from 'react'
import { Card, CardContent, TextField, Typography ,Box , Button, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import GoogleIcon from "../../images/google-color.svg";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm } from 'react-hook-form';

export const Signup = () => {
    const theme = useTheme()

    const {register,handleSubmit,watch,formState: {errors}, } = useForm(
        {defaultValues : {name: "",email: "",password: "",confirmPassword: "",}} )

     const onSubmit = (data:any) => {
        console.log(data)
     } 
     const[showPassword,setShowPassword] = useState<Boolean>(false);

     const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
     
     const password = watch("password");

  return (
    <>
    <Box sx={{bgcolor:theme.palette.primary.main,height:"100vh",display:"flex",
          alignItems:"center",flexDirection:"column",justifyContent:"center",p:2}}>
        <Typography sx={{fontSize:40,fontFamily:"roboto",letterSpacing:1,color:"secondary.main"}}>
          DigiSignify</Typography>
    
    <Card sx={{mt:{xs:4,md:1},borderRadius:3,width:{xs:"100%",md:500}}} >
       <CardContent>
          <Typography sx={{fontSize: 30,color:"primary.main",textAlign: "center",}} > Signup</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",mx:{xs:2,md:8},justifyContent:"center",mt:2}}>
            
            <TextField fullWidth placeholder='Your Name'
              InputProps={{ sx: {borderRadius: 50,}  }}
              {...register("name", {required: "Please enter your full name", })}
                />
                {errors.name && (<Typography sx={{color:"red",fontSize:10}}>{errors.name.message}</Typography>)}

                <TextField fullWidth sx={{ mt: 1 }} placeholder='Your email or phone'
                  InputProps={{ sx: { borderRadius: 50,  }, }}
                  {...register("email", {required: "Please enter your email or phone number",
                    pattern: { 
                       value: /^(?:[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}|^\d{10})$/,
                        message:"please enter valid email or phone "}
                  })}/>
                {errors.email && (<Typography sx={{color:"red",fontSize:10}}>{errors.email.message}</Typography>)}

                <TextField fullWidth sx={{ mt: 1 }} placeholder='Your password'
                  InputProps={{endAdornment: (<IconButton onClick={handleClickShowPassword} >{showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}  </IconButton> ),   sx: { borderRadius: 50, },  }}
                  {...register("password", { required: "Please enter your password", })}
                  type={showPassword ? "text" : "password"}
                />
                {errors.password && (<Typography sx={{color:"red",fontSize:10}}>{errors.password.message}</Typography>)}

                <TextField fullWidth sx={{ mt: 1 }} placeholder='Confirm password'
                  InputProps={{ sx: { borderRadius: 50,  },  }}
                  {...register("confirmPassword", {required: "Please confirm your password",
                    validate: (value) => value === password || "The Password do not match",})}
                  type="password"
                />
                {errors.confirmPassword && (<Typography sx={{color:"red",fontSize:10}}>{errors.confirmPassword.message}</Typography>)}
                

                <Button
                  type="submit" sx={{ backgroundColor: theme.palette.primary.main,
                    "&:hover": {backgroundColor: theme.palette.primary.main,},
                    borderRadius: 50,padding: "10px 90px",mt: 1,width: "-webkit-fill-available",}} >
                  <Typography
                    sx={{fontSize: 16,color: theme.palette.secondary.main,textTransform: "none",lineHeight: 2,}}
                  > Signup </Typography> </Button>
              </Box>
            </form>

            <Button variant="outlined" sx={{ borderRadius: 50, mx:{xs:2,md:8},py:2,backgroundColor: theme.palette.primary.main,
             "&:hover": {backgroundColor: theme.palette.primary.main,},my:2,width: '-webkit-fill-available' }} >
            <img src={GoogleIcon} alt="Google Icon" style={{ width: 15, height: 15, marginRight: 8 }} />
            <Typography sx={{ fontSize: 13,color:"secondary.main",
              textTransform: "none" }}> Signup with Google </Typography>
          </Button>
          </CardContent>
        </Card>
        </Box>
      
    </>
  )
}


