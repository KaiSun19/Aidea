import { Box, Button, Fade, FormControl, Input, InputLabel, Modal, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignInPage() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        p: 4,
        display : 'flex',
        flexDirection : 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'

      };
    
    const handleClose = () =>{

        navigate('/home')

    }

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

    useEffect(
        
        () =>{

        const unsubscribe = auth.onAuthStateChanged((authUser) =>{

        if(authUser){ // means that a user is logged in 
            console.log(authUser);
            setUser(authUser)
        }
        else{
            setUser(null)
        }
    })

    return () =>{
        unsubscribe();
    }
    },
        [])

    const signIn =(e) =>{

        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message))

        handleClose()
    }

  return (


    <Box sx = {modalStyle} component = 'form' >
        
        <center>

            <Typography variant = 'h6'>Sign In</Typography>

            <Stack direction = 'column' spacing = {2}>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple"></InputLabel>
                        <Input id="component-simple" value={email} onChange={handleEmailChange} placeholder='Email' />
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple"></InputLabel>
                        <Input id="component-simple" type = 'password' value={password} onChange={handlePasswordChange} placeholder = 'Password' />
                </FormControl>

                <Button type = 'submit' onClick = {signIn}>Sign In</Button>

            </Stack>

        </center>


    </Box>
  )
}

export default SignInPage