import { Box, Button, Fade, FormControl, Input, InputLabel, Modal, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth } from '../firebase';

function SignInModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    


    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display : 'flex',
        flexDirection : 'column'

      };
    
    const signUp = (e) =>{

        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            return authUser.user.updateProfile({
                displayName : username
            })
        })
        .catch((error) =>{
            alert(error.message)
        })

        handleClose();

    }

    const signIn =(e) =>{

        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message))
    }



    return (

        <div>
            <Button onClick={handleOpen}>
                
                {user ? 
                    'Log Out'
                    :
                    'Sign Up'
                }

                </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <Box sx={modalStyle} component = 'form'>


                    <center>

                        <Typography variant = 'h6'>Sign Up</Typography>

                    </center>

                    <Stack direction = 'column' spacing = {2}>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple"></InputLabel>
                                <Input id="component-simple" value={username} onChange={handleUsernameChange} />
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple"></InputLabel>
                                <Input id="component-simple" value={email} onChange={handleEmailChange} />
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple"></InputLabel>
                                <Input id="component-simple" type = 'password' value={password} onChange={handlePasswordChange} />
                        </FormControl>

                        {user ? 
                            <Button type = 'submit' onClick = {auth.signOut()}>Logout</Button>
                            :
                            <Button type = 'submit' onClick = {signUp}>Sign Up</Button>

                        }
                        <center>
                            <Typography>Already have an account ? </Typography>
                        </center>
                        <Button type = 'submit' onClick = {signIn}>Sign In</Button>
                    </Stack>
                
                    
                </Box>  
                </Fade>
            </Modal>
        </div>

      );
}

export default SignInModal