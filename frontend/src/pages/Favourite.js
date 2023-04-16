import React, { useEffect } from 'react';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { img_300 } from '../config';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavMovies } from '../store/actions/MoviesAction';
import Loader from '../components/Loader';
import { Visibility } from '@mui/icons-material';


const Favourite = () => {
  const { isAuthenticated, favourites, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavMovies());
  }, [dispatch])
  return (
    <>
      {
        loading
          ?
          <Loader />
          :
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem"
          }} >
            <Stack sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              backgroundColor: "#000000",
              padding: "5px 0px",
              borderRadius: "2rem",
              marginBottom: "1.5rem"
            }}>
              <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" } }}>Favourites</Typography>
            </Stack>

            <Stack sx={{
              alignItems: "center",
              width: {md:"70%" , xs:"90%"},
              padding: "10px 20px",
              borderRadius: "2rem",
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "center",
            }}>
              {
                isAuthenticated === true ?
                  <>
                    {
                      favourites?.length === 0 ? <h1 style={{ color: "white" }}>No Movies in Favorite</h1> :
                        <Stack sx={{ width: "100%" , display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", height: "auto" , gap:2 }}>
                          {
                            favourites?.map((movie, idx) => (
                              <Stack key={idx} sx={{ color: "white", alignItems: "center", width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "row", backgroundColor: "#000000", padding: "15px", borderRadius: "10px", height: "100%" }}>
                                <Stack sx={{ alignItems: "center" }}>
                                  <Avatar sx={{ height: { md: "100px", sm: "60px" }, width: { md: "100px", sm: "60px" }, objectFit: "contain" }} src={`${img_300}/${movie?.imgSm?.split('"')[0]}`} alt="" />
                                </Stack>
                                <Typography textAlign="center" sx={{ width: "15%" }}>{movie.title.slice(0, 12) + "..."}</Typography>
                                <Typography textAlign="center">{movie.rating}</Typography>
                                <Link to={`/${movie.type}/${movie.movieId}`} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row", textDecoration: "none" }}>
                                  <Visibility color='primary' sx={{ p: 1 }} />
                                </Link>
                              </Stack>
                            ))
                          }
                        </Stack>
                    }
                  </>
                  :
                  <Typography variant='h1'>Login to avail this feature</Typography>
              }
            </Stack>
          </Box>}
    </>
  )
}

export default Favourite