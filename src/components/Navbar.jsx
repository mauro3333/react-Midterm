import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

const navigate = useNavigate();

    return (
        <div>
            <AppBar sx={{backgroundColor: "darkcyan" }} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* <Typography variant="h4" gutterBottom>
                            DIEGO - MidTerm - REACT
                        </Typography> */}
					
                        <Button sx={{width: 100, height: 50, backgroundColor: "darkblue", m: 1 }} color="inherit" onClick={() => navigate('/')}>Home</Button>
                        <Button sx={{width: 300, height: 50, backgroundColor: "darkblue", m: 1 }} color="inherit" onClick={() => navigate('/plate')}>License Plate Recognition</Button>
                        <Button sx={{width: 300, height: 50, backgroundColor: "darkblue", m: 1 }} color="inherit" onClick={() => navigate('/ocr')}>OCR Pictures</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}