import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <Stack sx={{ height: '100vh', width: "100vw", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
        </Stack>
    )
}

export default Loader