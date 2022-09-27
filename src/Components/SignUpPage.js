import { Avatar, Box, Button, ButtonGroup, Fade, FormControl, FormHelperText, Input, InputLabel, LinearProgress, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth, db, storage } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile , GoogleAuthProvider,  signInWithPopup  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { ReactComponent as AideaIcon} from '../Assets/aidea-logo-icon.svg';
import { ReactComponent as GoogleLogo} from '../Assets/google-logo.svg';
import '../Styles/SignUpPageStyles.scss';
import {StyledTextButton, StyledInput, StyledInputLabel, StyledLinearProgress}  from '../Helpers/CustomComponents/StyledComponents';
import { appTheme } from '../Themes';

function SignUpPage({open,handleClose}) {


    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [username, setUsername] = React.useState();
    const  [usernameError,setUsernameError] = useState(false);
    const  [emailError,setEmailError] = useState(false)
    const [bio, setBio] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [uploadedPic, setUploadedPic] = useState('');
    const [user, setUser] = useState(null);
    const [stage,setStage] = useState(1);
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth : '400px',
        minHeight : '450px',
        width: '70%',
        bgcolor: 'background.paper',
        p: 4,
        display : 'flex',
        flexDirection : 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        borderRadius : '20px'

      };

    
    const goToHome = () =>{

        navigate('/home')

    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

    const validateEmail = (email) =>{
        if(email && email.length > 0 ){
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
        }
        else{
            return true
        }
    }

    useEffect(()=>{
        if(validateEmail(email)){
            setEmailError(false)
        }
        else if(!validateEmail(email)){
            setEmailError(true)
        }
    },[email])

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleImageChange = (event) => {
        if(event.target.files[0]){
            setProfilePic(event.target.files[0])
            setUploadedPic(URL.createObjectURL(event.target.files[0]))
        }
    };


    
    
    const goToBio =   (e) =>{

        e.preventDefault();
        if(!usernameError && !emailError){
            setProgress(25)
            setStage(2)
            }
    }

    const goToProfilePic = (e) =>{
        e.preventDefault();
        setProgress(50)
        setStage(3)
    }

    const goToConfirmation = (e) =>{
        e.preventDefault();
        setProgress(75)
        setStage(4)
    }


    const uploadToDatabase = () =>{

        const uploadTask = storage.ref(`images/${profilePic.name}`).put(profilePic);
        
        uploadTask.on( // when file begins uploading record how much of the file is uploaded 
            'state_changed', 
            (snapshot) =>{
                // maybe create progress bar to see uploading file 
            }, 
            (error) =>{
                console.log(error)
            }, 
            () =>{
                storage
                    .ref('images')
                    .child(profilePic.name)
                    .getDownloadURL()
                    .then( url =>{
                        db.collection('UserProfiles').add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            username : username,
                            email : email,
                            profilePic : url,
                            bio : bio
                        })
                    })
            }
            


        )

    }
    
    const signUp = (e) =>{

        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser)=>{
            updateProfile(auth.currentUser, {
                displayName: username
              })
              uploadToDatabase();
              goToHome();
        })
        .catch((error) =>{
            alert(error.message)
            navigate('/')
        })

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
            updateProfile(auth.currentUser, {
                displayName: user.displayName
              })
            db.collection('UserProfiles').add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                username : user.displayName,
                email : user.email,
                bio : "Hey! I'm using Aidea."
            })
            goToHome();

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

    <Box sx = {modalStyle} component = 'form'  className='signinPage-form'>
        
        <center>
            <AideaIcon className='signUp-logo' />
            <StyledLinearProgress variant="determinate" value={progress} max ={100} sx ={{marginBottom : '20px'}} color = 'inherit' />

            {stage === 1 && (

            <Stack direction = 'column' spacing = {2}>

                    <Typography variant = 'h6'>Sign Up</Typography>

                <FormControl variant="standard">
                    <StyledInputLabel htmlFor="component-simple" color = 'black'>Username</StyledInputLabel>
                        <StyledInput id="component-simple" type = 'text' value={username} onChange={handleUsernameChange} placeholder = 'Username' required = {true}/>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple" color = 'black'>Email</InputLabel>
                        <StyledInput id="component-simple" type = 'email' value={email} onChange={handleEmailChange} placeholder = 'Email' required = {true} error ={emailError} />
                        <FormHelperText error = {true} sx = {{display :  emailError ? 'block' : 'none'}}>Error</FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple" color = 'black'>Password</InputLabel>
                        <StyledInput id="component-simple" type = 'password' value={password} onChange={handlePasswordChange} placeholder = 'Password' required = {true}/>
                </FormControl>
                
                <center>
                    <Button variant="outlined" className='signUp-googleButton' startIcon={<GoogleLogo />} color = 'inherit' onClick = {()=> googleSignIn()}>
                        Sign Up with Google
                    </Button>
                </center>

                <StyledTextButton className  = 'signUp-buttonGroup' type = 'submit' onClick = {goToBio}>Continue</StyledTextButton>

            </Stack>)}


            {stage === 2 && (

                <Stack direction = 'column' spacing = {2}>

                <Typography variant = 'h6'>Your Bio</Typography>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple" color = 'black'>Tell us about yourself</InputLabel>
                        <StyledInput id="component-simple" value={bio} onChange={handleBioChange} placeholder = "I'm inspired by..." 
                              multiline
                              rows={5}
                              required = {true}/>
                </FormControl>

                <ButtonGroup variant="text" aria-label="text button group" color = 'inherit' sx ={{justifyContent : 'center', margin : '5%'}} className  = 'signUp-buttonGroup'>
                    <StyledTextButton type = 'submit' onClick = {() =>{
                        setProgress(progress - 25);
                        setStage(stage -1);
                        setUsernameError(false);
                        setEmailError(false);
                    }}>Go Back</StyledTextButton>
                    <StyledTextButton type = 'submit' onClick = {goToProfilePic}>Continue</StyledTextButton>
                </ButtonGroup>

                </Stack>)}
            
                {stage === 3 && (

                    <Stack direction = 'column' spacing = {2}>

                    <Typography variant = 'h6'>Your Profile Photo</Typography>

                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple"></InputLabel>
                            <StyledInput id="component-simple" type = 'file' onChange={handleImageChange}/>
                        </FormControl>
                    
                    <ButtonGroup variant="text" aria-label="text button group" sx ={{justifyContent : 'center', margin : '5%'}} color = 'inherit' className  = 'signUp-buttonGroup'>
                        <Button type = 'submit' onClick = {() =>{
                            setProgress(progress - 25);
                            setStage(stage -1)
                        }}>Go Back</Button>
                        <StyledTextButton type = 'submit' onClick = {goToConfirmation}>Continue</StyledTextButton>
                    </ButtonGroup>

                    </Stack>)
                }

                {stage === 4 && (

                <Box>

                    <Stack direction = 'column' sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}} spacing = {2}>

                        <Typography variant = 'h6'>Almost there ! Here's what we got from you</Typography>

                        <Avatar alt= 'uploaded picture' src = {uploadedPic} className = 'signUp-avatar' />
                        <Typography variant = 'h6'><strong>Username :</strong> {username}</Typography>
                        <Typography variant = 'h6'><strong>Email : </strong>{email}</Typography>
                        <Typography variant = 'h6'><strong>Bio : </strong>{bio}</Typography>

                    </Stack>
            
                    <ButtonGroup variant="text" aria-label="text button group" sx ={{justifyContent : 'center', margin : '5%'}} color = 'inherit'>
                        <StyledTextButton type = 'submit' onClick = {() =>{
                            setProgress(progress - 25);
                            setStage(stage -1)
                        }}>Go Back</StyledTextButton>
                        <StyledTextButton type = 'submit' onClick = {signUp}>Create Account</StyledTextButton>
                    </ButtonGroup>

                </Box>
                                                        )
                }
                    <Typography variant = 'caption' gutterBottom sx = {{marginTop : '10px'}} className = 'signUp-caption'>Already have an account ? <a href='' onClick={() => navigate('/sign-in')}>Sign in here</a></Typography>
            

        </center>


    </Box>

    </Fade>
    </Modal>
    </ThemeProvider>
  )
}

export default SignUpPage