import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography, useMediaQuery } from '@mui/material';
import {useTheme} from "@mui/material/styles";
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DrawerCompo } from './DrawerCompo';

const menuItems = [
    {label:"API" , to:"/api"},
    {label:"Security" , to:"/security"},
    {label:"Pricing" , to:"/pricing"},
    {label:"About",to:"/about"}
]


export const Header = () => {

 const theme = useTheme();
 const isMatch = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
    <AppBar sx={{backgroundColor:theme.palette.primary.main,boxShadow:"none"}}>
      <Toolbar>
        <Link to={"/"}><Button sx={{color:theme.palette.secondary.main , textTransform:"none",}}>
          <Typography sx={{fontSize:30,fontFamily:"roboto",letterSpacing:1}}>DigiSignify</Typography></Button></Link>

          {isMatch ? (<> <DrawerCompo /> </> ) : 
          <>

            <Box sx={{ml:"auto",display:"flex",gap:3,mr:3}}>
              {menuItems.map( (item,index) => (
                <Link to={"item.to"} key={index} >
                  <Button sx={{color:theme.palette.secondary.main, textTransform:"none"}}><Typography 
                    sx={{fontSize:15,fontWeight:600,}}>{item.label}</Typography></Button>
                     {(index === 2 ) && (
                      <KeyboardArrowDownIcon sx={{ fontSize:25, verticalAlign: "middle",
                        color:theme.palette.secondary.main,}}/>)}
                        </Link>
                        )
                )}
                </Box>

                <Link to={"/login"}><Button sx={{borderRadius:5,border:1,px:2,color:theme.palette.secondary.main, 
                  textTransform:"none",ml:"auto",mr:2}}>Login</Button> </Link>

                <Link to={"/signup"}><Button sx={{borderRadius:5,border:1,px:1,color:theme.palette.secondary.main, 
                  textTransform:"none",ml:"auto",}}>Signup</Button> </Link>
                  </> }
       </Toolbar>

    </AppBar>
      
    </>
  )
}


