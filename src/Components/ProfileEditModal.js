import {  Box, Button, Fade, FormControl, FormHelperText, Input, InputLabel, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth, db, storage } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile , GoogleAuthProvider,  signInWithPopup  } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { ReactComponent as AideaIcon} from '../Assets/aidea-logo-icon.svg';
import {StyledTextButton, StyledInput, StyledInputLabel, StyledLinearProgress}  from '../Helpers/CustomComponents/StyledComponents';
import { appTheme } from '../Themes';
import { changeUserData } from '../Helpers/firebaseHelpers/changeUserData';

function ProfileEditModal({option, open, handleClose, user}) {

    if(option === 'ProfilePic'){
        option = 'Photo'
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth : '400px',
        minHeight : '250px',
        width: '70%',
        bgcolor: 'background.paper',
        p: 4,
        display : 'flex',
        flexDirection : 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        borderRadius : '20px'

      };

    const [newUserName, setNewUserName] = useState();
    const [newBio, setNewBio] = useState();
    const [newProfilePic, setNewProfilePic] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);

    const handleNameChange = (e) =>{
        setNewUserName(e.target.value);
    }

    const handleBioChange = (e) =>{
        setNewBio(e.target.value);
    }

    const handlePhotoChange = (e) =>{
        setNewProfilePic(e.target.files[0]);
    }

    const toggleUsernameTaken = (mode) =>{

        if(mode === 'taken'){
            setUsernameTaken(true);
        }
        else if(mode === 'not taken'){
            setUsernameTaken(false)
            handleClose()
        }
    } 

    const handleUpdate = async (option, newOption) => {

        await changeUserData(user.displayName, option, newOption).then((res)=>{
            if(res){
                toggleUsernameTaken('taken')
            }
            else{
                toggleUsernameTaken('not taken')
            }
        })

    }



  return (

    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
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

                    <Box sx = {modalStyle} component = 'form' >
                        
                        <center>
                            <AideaIcon className='signUp-logo' />
                            <Typography variant = 'h6'>Change your {option}</Typography>

                            <Stack direction = 'column' spacing = {2}>

                                {option === 'Username' && 
                                    <>
                                        <FormControl variant="standard" sx = {{marginTop : '20px'}}>
                                            <InputLabel htmlFor="component-simple" color = 'black' >New Username</InputLabel>
                                                <StyledInput id="component-simple" value={newUserName} onChange={handleNameChange} placeholder='Username' />
                                                <FormHelperText error = {true} sx = {{display :  usernameTaken ? 'block' : 'none'}}>Username already taken.</FormHelperText>
            
                                        </FormControl>

                                        <StyledTextButton onClick = {()=> handleUpdate(option, newUserName)} className = 'signIn-button' >Save</StyledTextButton>
                                    </>

                                }

                                {option === 'Bio' && 
                                    <>
                                        <FormControl variant="standard" sx = {{marginTop : '20px'}}>
                                            <InputLabel htmlFor="component-simple" color = 'black' >New Bio</InputLabel>
                                                <StyledInput id="component-simple" value={newBio} onChange={handleBioChange} placeholder='Bio' />
                                        </FormControl>

                                        <StyledTextButton onClick = {()=> handleUpdate(option, newBio)} className = 'signIn-button' >Save</StyledTextButton>
                                    </>

                                }

                                {option === 'Photo' && 
                                    <>
                                        <FormControl variant="standard" sx = {{marginTop : '20px'}}>
                                            <InputLabel htmlFor="component-simple" color = 'black' >New Photo</InputLabel>
                                                <StyledInput id="component-simple" onChange={handlePhotoChange} placeholder='Profile Photo' type = 'file' />
                                        </FormControl>

                                        <StyledTextButton onClick = {()=> handleUpdate(option, newProfilePic)} className = 'signIn-button' >Save</StyledTextButton>
                                    </>

                                }

                                

                            </Stack>

                        </center>


                    </Box>

            </Fade>

        </Modal>

        </ThemeProvider>
    </StyledEngineProvider>

  )
}

export default ProfileEditModal