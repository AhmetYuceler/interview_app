import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, CircularProgress, TablePagination, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const baseURL = "http://gateway.marvel.com/v1/public";
const apiKey = "4b958d61487caaeac6a82c695619f002";
const hash = "ab2456beba4dd2c84c8f75ac9c3643d2";

function Datatable() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = () => {
        const filtered = data.filter(item => {
            return item.name.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${baseURL}/characters`, {
                    params: {
                        ts: "1",
                        apikey: apiKey,
                        hash: hash,
                    },
                });
                setData(response.data.data.results);
                setFilteredData(response.data.data.results);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Marvel Karakterleri
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Arama"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch}>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ad</TableCell>
                                <TableCell>Resim</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} width="50" height="50" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
}

export default Datatable;
