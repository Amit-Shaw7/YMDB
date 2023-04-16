import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { AccessTime, Add, Movie, Person, Remove, StarRate, YouTube } from '@mui/icons-material';
import { img_300, img_500, unavailable } from '../config';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from './Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourite, removeFromFavourite } from '../store/actions/MoviesAction';
import Loader from './Loader';


export default function ContentModal() {

    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [video, setVideo] = React.useState("");
    const [movie, setMovie] = React.useState("");
    const [type, setType] = React.useState("");


    const addToFav = async () => {
        if (isAuthenticated === false) {
            navigate("/login");
            return;
        }

        const movieToAdd = {
            title: movie.title ? movie.title : movie.name,
            overview: movie.overview,
            rating: movie.vote_average,
            popularity: movie.popularity,
            movieId: movie.id,
            imgSm: movie.backdrop_path,
            imgMd: movie.poster_path,
            type: type,
        }
        const added = await dispatch(addToFavourite(movieToAdd));
        if (added) {
            navigate("/favorites")
        }

    }

    const removeFromFav = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        const removed = dispatch(removeFromFavourite(movie.id));
        if (removed) {
            navigate("/favorites");
        }
    }

    const fetchCurMovie = async () => {
        const mediaType = params.media;
        const mediaId = params.id;
        setType(mediaType);

        // console.log(mediaId, mediaType)
        const VideoRes = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
        const curMovie = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)

        // console.log(VideoRes.data.results[0].key)
        // console.log(curMovie.data);
        setMovie(curMovie.data);
        setVideo(VideoRes.data.results[0]?.key);
    };

    React.useEffect(() => {
        fetchCurMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                loading
                    ?
                    <Loader />
                    :
                    <Box sx={{ backgroundColor: "#0A1929", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Box sx={{ height: { xs: "130vh", md: "80vh" }, width: "90%", display: "flex", alignItems: "center", justifyContent: "space-around", flexDirection: { xs: "column", md: "row" } }}>

                            <Stack className='shadow' sx={{ width: { md: "300px" }, height: { xs: "30%", md: "80%" }, backgroundColor: "#303030", display: { xs: "none", md: "flex" } }}>
                                <img src={movie?.poster_path ? `${img_300}/${movie?.poster_path}` : unavailable} alt={movie.title ? movie.title : movie.name} style={{ borderRadius: "5px", height: "100%", width: "100%", objectFit: "cover" }} />
                            </Stack>

                            <Stack className='shadow' sx={{ width: { sm: "500px" }, height: { xs: "30%", md: "80%" }, backgroundColor: "#303030", display: { xs: "none", sm: "flex", md: "none" } }}>
                                <img src={movie?.poster_path ? `${img_500}/${movie?.backdrop_path}` : unavailable} alt={movie.title ? movie.title : movie.name} style={{ borderRadius: "5px", height: "100%", width: "100%", objectFit: "cover" }} />
                            </Stack>

                            <Stack className='shadow' sx={{ width: "300px", height: { xs: "30%", md: "80%" }, backgroundColor: "#303030", display: { xs: "flex", sm: "none", md: "none" } }}>
                                <img src={movie?.poster_path ? `${img_300}/${movie?.backdrop_path}` : unavailable} alt={movie.title ? movie.title : movie.name} style={{ borderRadius: "5px", height: "100%", width: "100%", objectFit: "cover" }} />
                            </Stack>

                            <Stack sx={{ boxSizing: "border-box", width: { xs: "100%", md: "45%" }, height: { xs: "50%", sm: "60%", md: "90%" }, padding: "10px 20px", display: "flex", flexDirection: "column", justifyContent: "space-around", backgroundColor: "#0A1929", borderRadius: "10px" }}>

                                <Typography fontSize={{ md: "2rem", xs: "1.3rem" }} textAlign="center" color="white">{movie?.title ? movie.title : movie.name}</Typography>

                                <Typography fontSize={{ xs: "1rem", md: "1.2rem" }} sx={{ display: "flex", alignItems: "center" }} color="white">{movie.status}</Typography>

                                <Typography fontSize={{ xs: "1rem", md: "1.2rem" }} sx={{ display: "flex", alignItems: "center" }} color="white"><Movie sx={{ marginRight: "5px", color: "#004e9c" }} />{type === "movie" ? "Movie" : "TV Series"}</Typography>

                                <Typography fontSize={{ xs: "1rem", md: "1.2rem" }} sx={{ display: "flex", alignItems: "center" }} color="white"><StarRate sx={{ marginRight: "5px", color: "#004e9c" }} />{movie.vote_average} </Typography>

                                <Typography fontSize={{ xs: "1rem", md: "1.2rem" }} sx={{ display: "flex", alignItems: "center" }} color="white"><Person sx={{ marginRight: "5px", color: "#004e9c" }} />{movie.popularity}</Typography>

                                <Typography fontSize={{ xs: "1rem", md: "1.2rem" }} sx={{ display: "flex", alignItems: "center" }} color="white"><AccessTime sx={{ marginRight: "5px", color: "#004e9c" }} />{movie.release_date}</Typography>

                                <Stack sx={{ width: { md: "70%", xs: "100%" }, display: "flex", flexDirection: "row", overflowX: "scroll" }}>
                                    {
                                        movie && movie?.genres.map((genre, idx) => (
                                            <Stack key={idx} sx={{ fontSize: { xs: "0.7rem", md: "1rem" }, marginRight: "10px", borderRadius: "5px", color: "white", backgroundColor: "#277BC0", padding: "3px 5px", '&:hover': { backgroundColor: "#3B9AE1" } }}>{genre.name}</Stack>
                                        ))
                                    }

                                </Stack>

                                <Stack sx={{
                                    height: "22%", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0px"
                                }}>
                                    <Button target='_blank' href={`https://www.youtube.com/watch?v=${video}`} sx={{
                                        width: "100%",
                                        color: "white",
                                        backgroundColor: "#E94560",
                                        '&:hover': {
                                            background: "#FF4A4A",
                                        }
                                    }} startIcon={<YouTube />}>TRAILER</Button>

                                    <Button onClick={removeFromFav} sx={{
                                        display: `${user?.favorites.includes(movie.id) ? "flex" : "none"}`,
                                        width: "100%",
                                        color: "white",
                                        backgroundColor: "red",
                                        '&:hover': {
                                            background: "#E94560",
                                        }
                                    }} startIcon={<Remove />}>REMOVE FROM FAVORITE</Button>
                                    <Button onClick={addToFav} sx={{
                                        display: `${user?.favorites.includes(movie.id) ? "none" : "flex"}`,
                                        width: "100%",
                                        color: "white",
                                        backgroundColor: "#277BC0",
                                        '&:hover': {
                                            background: "#3B9AE1",
                                        }
                                    }} startIcon={<Add />}>ADD TO FAVOURITE</Button>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box sx={{ marginBottom: { xs: "50px", md: "0px" }, height: { xs: "100vh", md: "70vh" }, width: "90%", flexDirection: "column", justifyContent: "space-around", borderRadius: "10px" }}>
                            <Stack sx={{ marginTop: { xs: "0px", md: "40px", color: "white" } }}>
                                <Typography letterSpacing="2px" textAlign="center" fontSize={{ xs: "1.5rem", md: "2rem" }} sx={{ marginBottom: "10px" }}>Overview</Typography>
                            </Stack>
                            <Box sx={{ height: { xs: "90vh", md: "60vh" }, display: "flex", justifyContent: "space-around", flexDirection: { xs: "column", md: "row" }, marginBottom: "10px" }}>

                                <Stack sx={{ overflowY: "scroll", color: "white", lineHeight: "2rem", height: "70%", width: { xs: "100%", md: "35%" }, padding: "10px 20px", boxSizing: "border-box", marginTop: { xs: "0px", md: "20px" } }}>
                                    {movie.overview}
                                </Stack>

                                <Stack sx={{ height: "70%", width: { xs: "100%", md: "55%" }, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Stack sx={{ color: "white", height: "60%", padding: "30px 10px", width: "90%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
                                        <Typography letterSpacing="2px" textAlign="center" fontSize={{ xs: "1.5rem", md: "2rem" }} sx={{ marginBottom: "10px", display: { xs: "flex", md: "none" } }}>Casts</Typography>
                                        <Carousel />
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>}
        </>
    );
}

//20 console.log(user?.favorites.includes(movie.movieId))
//21 console.log(movie?.id)
//22 console.log(user.favorites)