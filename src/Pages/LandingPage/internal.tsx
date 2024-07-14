import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Typography } from "@mui/material";
import draw from "../../images/signature-icon-10.jpg";
import type from "../../images/OIP.jpg";
import { Link } from "react-router-dom";


export const Landing : React.FC = () => {
    const theme = useTheme();
    
    return(
    <>
    <Typography sx={{fontSize:{xs:30,md:40},textAlign:"center",mt:10,color:theme.palette.primary.main}}>
       Way To Create Your Electronic Signature</Typography>
     <Box sx={{display:"flex",flexDirection:{xs:"column",md:"row"},justifyContent:"center",alignItems:"center"
     ,mt:5,gap:3,px:{xs:5,md:0},textAlign:{xs:"center",md:"left"},}}>
        <Box sx={{width:{xs:"auto",md:400,},}}>
          <Link to={"/draw"} style={{ textDecoration: 'none' }} >
          <Card sx={{}} >
            <CardContent sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
              <img src={draw} alt="" style={{height:"100px",width:"100px",marginTop:"50px",fill:"#1B3A57" }}/>
              <Typography sx={{fontSize:25,color:theme.palette.primary.main,mt:4,mb:6}}>Draw Signature</Typography>
            </CardContent>
          </Card>
          </Link>
            <Typography sx={{color:"#979595",fontSize:14,mt:2}}> Use a touchpad, mouse, phone, tablet or other mobile  
             devices to draw a free downloadable electronic signature. Customize smoothing, color and more.
            </Typography>

        </Box>
        <Box sx={{width:{xs:"auto",md:400},}}>
            <Link to={"/type"} style={{ textDecoration: 'none' }} >
          <Card >
            <CardContent sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
              <img src={type} alt="" style={{height:"100px",width:"100px",marginTop:"50px"}}/>
              <Typography sx={{fontSize:25,color:theme.palette.primary.main,mt:4,mb:6}}>Type Signature</Typography>
            </CardContent>
          </Card>
          </Link>
              <Typography sx={{color:"#979595",fontSize:14,mt:2}}> Type out an online signature and choose from 
                 several great looking handwriting fonts. Customize the style, colors and more.
              </Typography>

        </Box>

      </Box>

    </>
    )
}