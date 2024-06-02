import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Button, Grid, Slider, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';

export const SignaturePad: React.FC = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [penColor,setPenColor] = useState("black");
  const[showColorPicker,setShowColorPicker] = useState(false);
  const [penSize,setPenSize] = useState(2);


  const clear = () => {
    sigCanvas.current?.clear?.();
  };

  const save = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'signature.png';
      link.click();
    }
  };

  const handleChangeColor = (color : any) => {
    setPenColor(color.hex)
  }

  const handlePenSizeChange = (event : Event ,newValue : number | number[]) => {
    if(typeof newValue === 'number'){
    setPenSize(newValue)
    }
  }

  return (
    <>
      <Box
        sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',
        height: '100vh', gap:2 ,}} >
        <Box>
          <Typography variant="h4" gutterBottom> Digital Signature </Typography>
            </Box>
        <Box
          sx={{border: '2px dashed grey',borderRadius: '8px',backgroundColor: '#f5f5f5',
            width: '100%', maxWidth: '520px',height:300,position:"relative"}} >

          <SignatureCanvas ref={sigCanvas} penColor={penColor} minWidth={penSize} maxWidth={penSize}
            canvasProps={{style:{width: '100%',height:"100%",}  }} />

            <Grid container justifyContent="center" sx={{mt:2,}}>

            <Button variant='contained'  onClick={() => setShowColorPicker(!showColorPicker)} >
               {showColorPicker ? "Close Color Picker" : "Choose Color Picker"}</Button>
          {showColorPicker && (
            <Box sx={{position: 'absolute',top: 0,left: 'calc(100% + 16px)', zIndex: 1,}}>
             <SketchPicker color={penColor} onChangeComplete={handleChangeColor} /> 
            </Box>
            )}
            </Grid>
           </Box>

        <Box sx={{ mt:6,width: "80%", maxWidth: 300}}>
          <Typography gutterBottom >Pen Size</Typography>
          <Slider value={penSize} onChange={handlePenSizeChange} aria-labelledby="pen-size-slider"
            valueLabelDisplay="auto" step={1} min={1}  max={10}/></Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}> 
          <Button variant="contained" color="primary" onClick={clear}>Clear</Button>
          <Button variant="contained" color="secondary" onClick={save}>Save</Button>
        </Box>
      </Box>
    </>
  );
};





 