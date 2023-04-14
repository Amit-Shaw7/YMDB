import { Box } from '@mui/material';
import React from 'react';
import EachMovieCard from './EachMovieCard';


const MovieContent = ({ movies }) => {
    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-around", width: { xs: "90%", md: "75%" }, }}>
                {
                    movies && movies.length !== 0 && movies.map((movie) => (
                        <EachMovieCard key={movie.id} movie={movie} />
                    ))
                }
            </Box>
        </>
    )
}

export default MovieContent