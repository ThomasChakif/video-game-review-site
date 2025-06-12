import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import '../styles/AppHeader.css'
import { useNavigate } from 'react-router-dom'

function AppHeader() {

    const navigate = useNavigate()
    return (
        <Box>
            <AppBar sx={{background: '#111827', borderRadius: "0 0 25px 25px;", borderColor: 'white'}}position="static">
                <Toolbar>
                    <h1 onClick={() => navigate('/')} className='VGR-header'>
                        VGR
                    </h1>
                    <Button onClick={() => navigate('/user')} color="inherit" sx={{margin: '1rem'}}>Account</Button>
                    <Button onClick={() => navigate('/logout')} color="inherit" sx={{margin: '1rem'}}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppHeader
