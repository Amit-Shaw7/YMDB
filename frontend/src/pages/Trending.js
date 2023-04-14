import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CustomPagination from '../components/CustomPagination';
import MovieContent from '../components/MovieContent';

const Trending = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`;
    const res = await axios.get(url);
    setMovies(res.data.results);
    setTotalPages(res.data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page])

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem", paddingBottom: "80px" }} >
        <Stack sx={{
          display: "flex", alignItems: "center", justifyContent: "center", width: "80%",
          backgroundColor: "#000000", padding: "5px 0px", borderRadius: "2rem", marginBottom: "1.5rem",
          boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px"
        }}>
          <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" } }} fontWeight={100} >TRENDING</Typography>
        </Stack>
        <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          {movies && <MovieContent movies={movies} />}
        </Stack>
        <Stack sx={{ marginTop: "50px" }}>
          <CustomPagination setPage={setPage} page={page} totalPages={totalPages} />
        </Stack>
      </Box>
    </>
  )
}

export default Trending