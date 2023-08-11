import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        AI Image Generator
      </Typography>
      <ImageGenerator />
    </Container>
  );
}

export default App;