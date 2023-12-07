import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { search } from './services/api';

import './App.css';

const resultColumns = [
  { field: 'title', headerName: 'Title', width: 600 },
  { field: 'type', headerName: 'Type', width: 100 },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const { results, resultCount } = await search(searchTerm);
    setResults(results);
    setLoading(false);
  };

  return (
    <Box className="App" sx={{ p: 4 }}>
      <Typography variant="h2" sx={{ pb: 2 }}>
        Search
      </Typography>
      <Box className="search">
        <TextField
          fullWidth
          sx={{ maxWidth: '600px', pb: 2 }}
          onChange={event => setSearchTerm(event.target.value)}
          label="Search in movies and full random files"
          variant="outlined"
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        {loading && <CircularProgress sx={{ mt: 4 }} />}
      </Box>

      {!loading && results.length > 0 && (
        <DataGrid
          rows={results}
          columns={resultColumns}
          getRowId={row => row.title}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
        />
      )}
    </Box>
  );
}

export default App;
