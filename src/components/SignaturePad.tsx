import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Button, IconButton, Slider, Tooltip, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';
import Erase from "../images/icons8-eraser-60.png";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CreateIcon from '@mui/icons-material/Create';
import { useTheme } from '@mui/material/styles';

export const Draw: React.FC = () => {
  const theme = useTheme()
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [penColor,setPenColor] = useState("black");
  const[showColorPicker,setShowColorPicker] = useState(false);
  const [penSize,setPenSize] = useState(2);
  
  const [history,setHistory] = useState<string[]>([]);
  const [historyIndex,setHistoryIndex] = useState<number>(-1);
  const[activeTool,setActiveTool] = useState<string>("pen");

  const backgroundColor = '#f5f5f5';


  const clear = () => {
    sigCanvas.current?.clear?.();
    setHistory([]);
    setHistoryIndex(-1);
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

  const selectTool = (tool:string) => {
    setActiveTool(tool);
    }

    

  const handleEndStroke = () => {
    if(sigCanvas.current){
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL();
      const newHistory = history.slice(0,historyIndex+1);
      setHistory([...newHistory,dataURL]);
      setHistoryIndex(newHistory.length)
    }
  }

  const undo = () => {
    if (historyIndex >= 0) {
      const newHistoryIndex = historyIndex - 1;
      setHistoryIndex(newHistoryIndex);
      if (newHistoryIndex >= 0) {
        const img = new Image();
        img.src = history[newHistoryIndex];
        img.onload = () => {
        sigCanvas.current?.clear();
        sigCanvas.current?.getCanvas().getContext('2d')?.drawImage(img, 0, 0);
        };
      } 
      else {
        sigCanvas.current?.clear();
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
           height: '100vh', gap: 2, padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{color:theme.palette.primary.main,mt:5}}>Draw your Signature</Typography>

      <Box sx={{ border: '2px dashed grey', borderRadius: '8px', backgroundColor: backgroundColor, width: '100%',
              maxWidth: '600px', height: '40%', position: "relative" }}>
        <SignatureCanvas ref={sigCanvas} penColor={activeTool === "eraser" ? backgroundColor : penColor} minWidth={penSize} 
           maxWidth={penSize} canvasProps={{ style: { width: '100%', height: "100%" } }} onEnd={handleEndStroke} />
        {showColorPicker && (
          <Box sx={{ position: 'absolute', top: 0, left: 'calc(100% + 16px)', zIndex: 1 }}>
            <SketchPicker color={penColor} onChangeComplete={handleChangeColor} />
          </Box>
        )}
      </Box>

      <Button variant='contained' onClick={() => setShowColorPicker(!showColorPicker)}>
        {showColorPicker ? "Close Color Picker" : "Choose Color"}
      </Button>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: '80%', maxWidth: 300 }}>
        <Typography gutterBottom>Pen Size</Typography>
        <Slider value={penSize} onChange={handlePenSizeChange} aria-labelledby="pen-size-slider" 
           valueLabelDisplay="auto" step={1} min={1} max={10} />

           <Tooltip title="pen" arrow>
            <IconButton onClick={() => selectTool("pen")} color={activeTool === 'pen' ? 'primary' : 'default'}  >
              <CreateIcon />
            </IconButton>

           </Tooltip>

        <Tooltip title="Eraser" arrow>
          <IconButton onClick={() => selectTool("eraser")} color={activeTool === 'eraser' ? 'primary' : 'default'} >
            <img src={Erase} alt='Eraser' />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={clear}>Clear</Button>
        <Button variant="contained" color="secondary" onClick={save}>Save</Button>
        <Tooltip title="Undo" arrow> 
          <Button variant="contained" onClick={undo}  disabled={historyIndex === -1}> <UndoIcon/> </Button>  
        </Tooltip>
        <Tooltip title="redo" arrow>
        <Button variant="contained" onClick={redo} disabled={historyIndex === history.length - 1}> <RedoIcon/> </Button>
        </Tooltip>
      </Box>
    </Box>
   </>
  );
};








