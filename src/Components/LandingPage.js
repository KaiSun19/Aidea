import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { breakpoints } from '@mui/system';
import React, { useState } from 'react'
import { ReactComponent as AideaLogo} from '../Assets/AIDEA.svg';
import { useNavigate } from "react-router-dom";
import SignUpPage from './SignUpPage';

function LandingPage() {

    const navigate = useNavigate();

    const [openSignUpModal, setOpenSignUpModal] = useState(false)

    const handleSignUpModalClose = () =>{
        setOpenSignUpModal(false)
    }

    return (
        <>
            <Box sx ={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', m : '20px'}}>
                <AideaLogo sx = {{margin : '20px'}}/>
                <Typography variant = 'h1' gutterBottom  sx = {{margin : '20px', fontSize : {md : '6rem', sm : '5rem'}}}>Welcome to Aidea</Typography>

                <ButtonGroup sx = {{color : 'black'}} variant="text" aria-label="text button group" size = 'large'>
                    <Button sx ={{color : 'black', borderColor : 'black'}}
                            onClick = {()=> setOpenSignUpModal(true)}><Typography variant = 'body2'><strong>Sign Up</strong></Typography></Button>
                    <Button sx = {{color : 'black',borderColor : 'black' }}
                            onClick = {()=> navigate('/sign-in')}>Log in</Button>
                </ButtonGroup>

            </Box>

            <SignUpPage open ={openSignUpModal} handleClose = {handleSignUpModalClose} />

        </>
)
}

export default LandingPage