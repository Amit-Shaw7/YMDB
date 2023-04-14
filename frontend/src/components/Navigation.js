import { AccountCircleOutlined, Whatshot, MovieOutlined, TvOutlined, SearchOutlined } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        switch (selected) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/movies');
                break;
            case 2:
                navigate('/tvseries');
                break;
            case 3:
                navigate('/search');
                break;
            case 4:
                navigate('/profile');
                break;

            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])
    return (
        <BottomNavigation
            showLabels
            sx={{
                position: "fixed",
                bottom: "0px",
                width: "100%",
                backgroundColor: "#000000"
            }}
            value={selected}
            onChange={(event, newValue) => {
                setSelected(newValue);
            }}
        >
            <BottomNavigationAction color="warning" sx={{ color: "white" }} label="Trending" icon={<Whatshot />} />
            <BottomNavigationAction color="warning" sx={{ color: "white" }} label="Movie" icon={<MovieOutlined />} />
            <BottomNavigationAction color="warning" sx={{ color: "white" }} label="Tv" icon={<TvOutlined />} />
            <BottomNavigationAction color="warning" sx={{ color: "white" }} label="Search" icon={<SearchOutlined />} />
            <BottomNavigationAction color="warning" sx={{ color: "white" }} label="Account" icon={<AccountCircleOutlined />} />
        </BottomNavigation>
    )
}

export default Navigation