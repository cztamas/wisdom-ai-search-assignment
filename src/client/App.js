import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { click, search } from './services/api';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    await loadResultPage(searchTerm, 0);
  };

  const handleChangePage = async (_event, newPageIndex) => {
    await loadResultPage(searchTerm, newPageIndex);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRowClick = async row => {
    await click({ title: row.title, type: row.type });
  };

  const loadResultPage = async (searchTerm, pageIndex) => {
    setLoading(true);
    setPageIndex(pageIndex);

    const { results, resultCount } = await search(searchTerm, pageIndex);
    setResults(results);
    setResultCount(resultCount);
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
          onKeyDown={handleKeyDown}
          label="Search in movies and full random files"
          variant="outlined"
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        {loading && <CircularProgress sx={{ mt: 4 }} />}
      </Box>

      {!loading && results.length > 0 && (
        <Box className="result-container">
          <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800 }}>
            <Table aria-label="search results">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map(row => (
                  <TableRow
                    key={row.title}
                    onClick={() => handleRowClick(row)}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={resultCount}
            rowsPerPage={10}
            page={pageIndex}
            onPageChange={handleChangePage}
          />
        </Box>
      )}
    </Box>
  );
}

export default App;
