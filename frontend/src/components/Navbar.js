import * as React from 'react';
import { Stack , Typography , Box} from '@mui/material';


export default function Navbar() {
    return (
        <Box sx={{
            backgroundColor: "#000000",
            display : "flex",
            alignItems :"center",
            justifyContent:"center",
            position: "sticky",
            top:"0px",
            zIndex:"5"
        }}>
            <Stack><Typography fontSize="3rem" fontWeight={200} letterSpacing="2px">MOVEI</Typography></Stack>
        </Box>
    );
}
