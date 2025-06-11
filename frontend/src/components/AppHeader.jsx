import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/AppHeader.css'
import { useNavigate } from 'react-router-dom'

function AppHeader() {

    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{background: 'black'}}position="static">
            <Toolbar>
            <Typography onClick={() => navigate('/')} className='VGR-header' variant="h4" component="div" sx={{ flexGrow: 1}}>
                VGR
            </Typography>
            <Button onClick={() => navigate('/user')} color="inherit">Account</Button>
            <Button onClick={() => navigate('/logout')} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default AppHeader
