import { Box, Button, Fade, FormControl, Input, InputLabel, Modal, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import '../Styles/SignInPageStyles.scss';
import Backdrop from '@mui/material/Backdrop';
import { auth } from '../firebase';
import { getAuth,GoogleAuthProvider,  signInWithPopup  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { StyledInput, StyledTextButton } from '../Helpers/CustomComponents/StyledComponents';
import { appTheme } from '../Themes';
import { ReactComponent as AideaIcon} from '../Assets/aidea-logo-icon.svg';
import { ReactComponent as GoogleLogo} from '../Assets/google-logo.svg';

function SignInPage({open,handleClose}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth : '400px',
        minHeight : '300px',
        width: '70%',
        bgcolor: 'background.paper',
        p: 4,
        display : 'flex',
        flexDirection : 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        borderRadius : '20px'

      };

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
        navigate('/home')
        handleClose()
    }

        // google authentication 

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            navigate('/home');
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
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

            <Box sx = {modalStyle} component = 'form' className='signinPage-form'>
                
                <center>
                    <AideaIcon className='signUp-logo' />
                    <Typography variant = 'h6'>Sign In</Typography>

                    <Stack direction = 'column' spacing = {2}>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple" color = 'black' >Email</InputLabel>
                                <StyledInput id="component-simple" value={email} onChange={handleEmailChange} placeholder='Email' />
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple" color = 'black'>Password</InputLabel>
                                <StyledInput id="component-simple" type = 'password' value={password} onChange={handlePasswordChange} placeholder = 'Password' />
                        </FormControl>

                        <StyledTextButton type = 'submit' onClick = {signIn} className = 'signIn-button' >Sign In</StyledTextButton>

                        <center>
                            <Button variant="outlined" className='signUp-googleButton' startIcon={<GoogleLogo />} color = 'inherit' onClick = {()=> googleSignIn()}>
                                Sign In with Google
                            </Button>
                        </center>

                    </Stack>

                </center>


            </Box>

        </Fade>

        </Modal>

        </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default SignInPage