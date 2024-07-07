import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Button, Grid, IconButton, Slider, Tooltip, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';
import Erase from "../images/icons8-eraser-60.png";

export const SignaturePad: React.FC = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [penColor,setPenColor] = useState("black");
  const[showColorPicker,setShowColorPicker] = useState(false);
  const [penSize,setPenSize] = useState(2);
  const [isEraser,setIsEraser] = useState(false);
  const [history,setHistory] = useState<string[]>([]);
  const [historyIndex,setHistoryIndex] = useState(0);

  const backgroundColor = '#f5f5f5';


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

  const handleEndStroke = () => {
    if(sigCanvas.current){
      const dataURL = sigCanvas.current.toDataURL();
      const newHistory = history.slice(0,historyIndex+1);
      setHistory([...newHistory,dataURL]);
      setHistoryIndex(newHistory.length)
    }
  }

  const undo = () => {
    if(historyIndex > 0){
      setHistoryIndex(historyIndex-1);
      const img = new Image();
      img.src = history[historyIndex-1] ;
      img.onload = () => {
        sigCanvas.current?.clear();
        sigCanvas.current?.getCanvas().getContext('2d')?.drawImage(img,0,0)
        
      }
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const img = new Image();
      img.src = history[historyIndex + 1];
      img.onload = () => {
        sigCanvas.current?.clear();
        sigCanvas.current?.getCanvas().getContext("2d")?.drawImage(img, 0, 0);
      };
    }
  };

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

          <SignatureCanvas ref={sigCanvas} penColor={isEraser ? backgroundColor : penColor} minWidth={penSize} 
            maxWidth={penSize} canvasProps={{style:{width: '100%',height:"100%",} }}  onEnd={handleEndStroke} />

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
            valueLabelDisplay="auto" step={1} min={1}  max={10} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}> 
          <Button variant="contained" color="primary" onClick={clear}>Clear</Button>
          <Button variant="contained" color="secondary" onClick={save}>Save</Button>
          <Button variant="contained" onClick={undo}  disabled={historyIndex === 0}>Undo</Button>
          <Button variant="contained" onClick={redo}  disabled={historyIndex === history.length - 1}>Redo</Button>
        </Box>
        <Box sx={{mt:2}}>
          <Tooltip title="Eraser" arrow>
            <IconButton onClick={() => setIsEraser(!isEraser)}>
              <img src={Erase} alt='Eraser' />
            </IconButton>

          </Tooltip>

        </Box>
      </Box>
    </>
  );
};








