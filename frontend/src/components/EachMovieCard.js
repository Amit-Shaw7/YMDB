import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { img_300, unavailable } from '../config';

const EachMovieCard = ({ movie , mediaType}) => {
    // console.log(mediaType);
    return (
        <Link style={{ textDecoration: "none", color: "white" }} to={`/${mediaType ? mediaType : movie.media_type}/${movie.id}`}>
            <Box sx={{
                boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px",
                cursor: "pointer",
                height: { xs: "300px", sm: "376px" },
                width: { xs: "154px", sm: "210px" },
                borderRadius: "5px",
                backgroundColor: "transparent",
                boxSizing: "border-box",
                padding: { xs: "4px", sm: "5px" },
                position: "relative",
                // overflow:"hidden",

                ":hover":{
                    backgroundColor:"#004e9c",
                    color : "white",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                }
            }}>
                <Stack sx={{
                    height: "82%",
                    width: "100%",
                    borderRadius: "15px",
                    // backgroundColor: "#303030",
                    boxSizing: "border-box",
                    padding: "2px"
                }}>
                    <img style={{ borderRadius: "10px" }} src={movie.poster_path ? `${img_300}/${movie.poster_path}` : unavailable} alt={movie.title} />
                </Stack>
                <Stack sx={{ padding: { sm: "10px", xs: "5px" } }}>
                    <Typography textAlign="center" fontWeight={600}>{movie.title ? movie.title.slice(0, 12) + "..." : movie.name.slice(0, 12) + "..."}</Typography>
                    <Stack sx={{ marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography fontWeight={300} fontSize={{ xs: "14px", sm: "1rem" }}>{movie.media_type}</Typography>
                        <Typography fontWeight={300} fontSize={{ xs: "14px", sm: "1rem" }}>{
                            movie.media_type === "movie" ? movie.release_date : movie.first_air_date
                        }
                        </Typography>
                    </Stack>
                </Stack>
                <Stack sx={{
                    backgroundColor: `${movie.vote_average > 6 ? "green" : "red"}`,
                    color: "white",
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    padding: "3px 4px",
                    borderRadius: "10px",
                    fontSize: "14px"
                }}>
                    {movie.vote_average}
                </Stack>
            </Box>
        </Link>
    )
}

export default EachMovieCard

// https://api.themoviedb.org/3/${movie.media_type}/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US