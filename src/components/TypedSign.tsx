import React, { useState, useEffect } from 'react';
import WebFont from 'webfontloader';
import { Box, Button, TextField, Typography, Grid, Select, MenuItem } from '@mui/material';
import html2canvas from 'html2canvas';
import { SelectChangeEvent } from '@mui/material/Select';

const handwritingFonts = [
  'Pacifico',
  'Shadows Into Light',
  'Dancing Script',
  'Amatic SC',
  'Architects Daughter',
  'Bad Script',
  'Caveat',
  'Homemade Apple',
  'Indie Flower',
  'Just Another Hand',
  'Kaushan Script',
  'Marck Script',
  'Nanum Pen Script',
  'Permanent Marker',
  'Reenie Beanie',
  'Satisfy',
  'Sue Ellen Francisco',
  'Zeyada',
  'Handlee',
  'Allura',
  'Cookie',
  'Great Vibes',
  'Italianno',
  'Lobster Two',
  'Monsieur La Doulaise',
  'Parisienne',
  'Sacramento',
];

const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080'];

export const Type: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [showHandwriting, setShowHandwriting] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');

  useEffect(() => {
    WebFont.load({
      google: {
        families: handwritingFonts,
      },
    });
  }, []);

  const handleContinue = () => setShowHandwriting(true);

  const handleSelectFont = (font: string) => setSelectedFont(font);

  const handleSave = () => {
    const element = document.getElementById('signature-preview');
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'signature.png';
        link.click();
      });
    }
  };

  const handleColorChange = (event: SelectChangeEvent<string>) => setColor(event.target.value as string);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
      {!selectedFont && (
        <>
          <Typography variant="h4" gutterBottom>Handwriting Signature</Typography>
          <TextField
            label="Type your text"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ width: '300px' }}
          />
          <Button variant="contained" color="primary" onClick={handleContinue} sx={{ mt: 2 }}>
            Continue
          </Button>
          {showHandwriting && (
            <Grid container spacing={2} sx={{ mt: 4, width: '100%', maxWidth: '520px' }}>
              {handwritingFonts.map((font) => (
                <Grid item xs={12} sm={6} key={font} onClick={() => handleSelectFont(font)} sx={{ cursor: 'pointer' }}>
                  <Box
                    sx={{
                      padding: 2,
                      border: '1px solid grey',
                      borderRadius: '4px',
                      textAlign: 'center',
                      fontFamily: font,
                      fontSize: '24px',
                      userSelect: 'none',
                    }}
                  >
                    {text || 'Sample Text'}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {selectedFont && (
        <>
          <Typography variant="h4" gutterBottom>Preview Your Signature</Typography>
          <Box
            id="signature-preview"
            sx={{
              fontFamily: selectedFont,
              fontSize: '48px',
              color: color,
              border: '1px solid grey',
              padding: 2,
              borderRadius: '4px',
            }}
          >
            {text}
          </Box>
          <Select
            value={color}
            onChange={handleColorChange}
            sx={{ mt: 2, width: '150px' }}
          >
            {colors.map((col) => (
              <MenuItem key={col} value={col}>
                <Box sx={{ width: '100%', height: '20px', backgroundColor: col }} />
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2, width: '150px', height: '50px' }}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setSelectedFont('')} sx={{ mt: 2, width: '150px' }}>
            Back
          </Button>
        </>
      )}
    </Box>
  );
};
