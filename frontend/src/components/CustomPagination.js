import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CustomPagination({ page, setPage, totalPages }) {

    window.scroll(0,0);
    const handleChange = (page) => {
        setPage(page);
    }

    return (
        <Stack spacing={2}>
            <Pagination sx={{backgroundColor:"white" , borderRadius:"5px" , padding:"2px"}} defaultPage={6} onChange={(e) => handleChange(Number(e.target.innerText))} page={page}  hidePrevButton hideNextButton count={totalPages} color="primary" />
        </Stack>
    );
}