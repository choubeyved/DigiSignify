import React, { useState } from 'react'
import { Button, List,Typography,Drawer,IconButton,ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SecurityIcon from '@mui/icons-material/Security';
import ApiIcon from '@mui/icons-material/Api';

const menuItems = [
    {label:"API" , to:"/api",icon:<ApiIcon/>},
    {label:"Security" , to:"/security",icon:<SecurityIcon/>},
    {label:"Pricing" , to:"/pricing",icon:<AttachMoneyIcon/>},
    {label:"About",to:"/about",icon:<InfoIcon/>},
    {label:"Login",to:"/login",icon:<LoginIcon/>},
    {label:"Signup",to:"/signup",icon:<PersonAddIcon/>},
]
export const DrawerCompo = () => {

  const [openDrawer,setOpenDrawer] = useState<boolean>(false)   
const drawerWidth = 250;
  return (
    <>
    <IconButton onClick={() => setOpenDrawer(!openDrawer)}  sx={{ color: "secondary.main", ml: "auto" }}  >
        <MenuIcon />
    </IconButton>

    <Drawer open={openDrawer} onClose={()=> setOpenDrawer(false)} sx={{width:drawerWidth,flexShrink: 0, 
      "& .MuiDrawer-paper": { width: drawerWidth,},}}>
    <Link to={"/"}><Button sx={{color:"primary.main", textTransform:"none",mt:3,mx:2}}>
    <Typography sx={{fontSize:35,fontFamily:"roboto",}}>DigiSignify</Typography></Button></Link>

       <List>
          {menuItems.map((menu,index) => (
           <Link to={menu.to}  key={index} style={{textDecoration:"none"}} > 
           <ListItemButton onClick={() => setOpenDrawer(false)} >
            <ListItemIcon sx={{color:"primary.main"}}>{menu.icon}</ListItemIcon>
            <ListItemText sx={{color:"primary.main",}}>{menu.label}</ListItemText>
            </ListItemButton> </Link>
           ) )}
        </List>

    </Drawer>
  </>
  )
}

