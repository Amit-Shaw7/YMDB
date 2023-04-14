import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/UserActions';


const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const handleLogout = () => {
    dispatch(logout());
  }
  return (

    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1rem",
      // backgroundColor: "red"
    }} >
      <Stack sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        backgroundColor: "#000000",
        padding: "5px 0px",
        borderRadius: "2rem",
        marginBottom: "1.5rem",
      }}>
        <Typography sx={{ fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" } }}>Profile</Typography>
      </Stack>
      <Stack sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: { xs: "90%", sm: "70%", md: "60%" },
        height: { xs: "65vh", md: "60vh", },
        backgroundColor: "#transparent",
        padding: "5px 0px",
        borderRadius: "2rem",
        marginBottom: "1.5rem",
        // backgroundColor: "blue"
      }}>
        <Stack sx={{ display: "flex", boxShadow: "rgba(255, 255, 255, 0.35) 0px 7px 29px 0px", borderRadius: "50%", alignItems: "center", justifyContent: "cneter", height: { md: "130px", xs: "90px", sm: "100px" }, width: { md: "130px", xs: "90px", sm: "100px" }, backgroundColor: "#000000", flexDirection: "row" }}>
          {/* <img src={} alt="" style={{height:"100%",width:"100%",objectFit:"contain"}} /> */}
        </Stack>
        <Stack sx={{ borderRadius: "20px", display: "flex", boxShadow: "rgba(255, 255, 255, 0.35) 0px 7px 29px 0px", alignItems: "center", justifyContent: "space-between", padding: { xs: "20px 10px", md: "20px 30px" }, boxSizing: "border-box", height: { xs: "50%", md: "50%" }, width: { xs: "95%", md: "60%" }, backgroundColor: "#000000", flexDirection: "column" }}>

          <Typography sx={{ width: "95%", textAlign: "center", fontSize: { xs: "0.8rem", md: "1rem" } }} color="white">Email : {user?.email}</Typography>
          <Typography sx={{ width: "95%", textAlign: "center", fontSize: { xs: "0.8rem", md: "1rem" } }} color="white">Phone : {user?.phone}</Typography>
          <Typography sx={{ width: "95%", textAlign: "center", fontSize: { xs: "0.8rem", md: "1rem" } }} color="white">Name : {user?.name}</Typography>

          <Link to="/favorites" style={{ textDecoration: "none", color: "black", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button sx={{ fontSize: { xs: "0.7rem", sm: "0.7rem", md: "0.9rem" }, width: "90%", '&:hover': { transition: "all 0.3s ease-in-out", backgroundColor: "white", color: "black" }, backgroundColor: "#004e9c", color: "white", marginTop: "10px", fontWeight: "bold" }}>Go To Favourite</Button>

          </Link>
        </Stack>
        <Button onClick={handleLogout} sx={{ backgroundColor: "transparent", border: "1px solid red", fontSize: { xs: "0.7rem", sm: "0.7rem", md: "0.9rem" }, width: { xs: "90%", md: "60%" }, '&:hover': { transition: "all 0.3s ease-in-out", backgroundColor: "red", border: "1px solid red" }, color: "white", marginTop: "10px", fontWeight: "bold" }}>LOGOUT</Button>
      </Stack>
    </Box>
  )
}
// box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
export default Profile