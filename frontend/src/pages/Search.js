import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import EachMovieCard from '../components/EachMovieCard';
import axios from 'axios';
import CustomPagination from '../components/CustomPagination';

export default function Search() {
    const [value, setValue] = React.useState('one');
    const [inputValue, setInputValue] = React.useState("");
    const [searchArr, setSearchArr] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    // console.log(value)
    // console.log(inputValue)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearch = async () => {
        const url = `https://api.themoviedb.org/3/search/${value === "one" ? "movie" : "tv"}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${inputValue}&page=${page}`;
        const res = await axios.get(url);
        setSearchArr(res.data.results);
        setTotalPage(res.data.total_pages);

    }

    React.useEffect(() => {
        if (totalPage > 0) {
            handleSearch();
        }
        // eslint-disable-next-line
    }, [page, value, totalPage])

    return (
        <Box sx={{ width: '100vw', display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Tabs
                centered
                variant='fullWidth'
                textColor='inherit'
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                sx={{ width: { xs: "90%", md: "50%" }, color: "white" }}
            >
                <Tab sx={{ width: "50%" }} value="one" label="Movies" />
                <Tab sx={{ width: "50%" }} value="two" label="TV Series" />
            </Tabs>
            <Stack sx={{ width: { xs: "90%", md: "60%" }, marginTop: "20px", display: "flex", flexDirection: "row", alignItems: "center" }}>
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" style={{ outline: "none", padding: "10px", color: "white", backgroundColor: "transparent", width: "90%", borderRadius: "10px", border: "1px solid white" }} />
                <SearchOutlined onClick={handleSearch} sx={{ color: "white", border: "1px solid white", padding: "5px", marginLeft: "5px", borderRadius: "5px", '&:hover': { backgroundColor: "white", color: "#004e9c" } }} />
            </Stack>
            <Box sx={{ margin: "20px 0px 50px 0px", display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-around", width: { xs: "90%", md: "75%" }, }}>
                {
                    searchArr ? searchArr.map((movie, idx) => (
                        <EachMovieCard key={idx} movie={movie} mediaType={value === "one" ? "movie" : "tv"} />
                    )) : <h1>NO Movie Found</h1>
                }
            </Box>
            <Stack sx={{ margin: "0px 0px 80px 0px" }}>
                {
                    totalPage > 0 && <CustomPagination page={page} setPage={setPage} totalPages={totalPage} />
                }
            </Stack>
        </Box>

    );
}
