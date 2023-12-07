import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Box className="App" sx={{ p: 4 }}>
      <Typography variant="h2">Search</Typography>
      <Box className="search">
        <TextField
          fullWidth
          sx={{ maxWidth: '600px', pb: 2 }}
          label="Search in movies and full random files"
          variant="outlined"
        />
        <Button variant="contained">Search</Button>
      </Box>
    </Box>
  );
}

export default App;
