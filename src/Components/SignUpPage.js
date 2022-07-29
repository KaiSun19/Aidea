import { Box, Button, ButtonGroup, Fade, FormControl, Input, InputLabel, LinearProgress, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth, db, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

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
        width: 400,
        bgcolor: 'background.paper',
        p: 4,
        display : 'flex',
        flexDirection : 'column',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        borderRadius : '20px'

      };

    const verifyDataExists = async (datafield) => {

        let existingData = []
        let exists = false
        const dataCollection = await db.collection('UserProfiles').get()
        switch(datafield){

            case 'username' : dataCollection.forEach(doc =>{
                existingData.push(doc.data().username);
                if(existingData.includes(username)){
                    exists = true;
                }
            })
            case 'email' : dataCollection.forEach(doc =>{
                existingData.push(doc.data().email);
                if(existingData.includes(email)){
                    exists = true;
                }
            })
        }
        return exists;

    } 
    
    const goToHome = () =>{

        navigate('/home')

    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

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
        verifyDataExists('username').then(usernameExists =>{
            if(usernameExists){
                setUsernameError(false)
            }})
        verifyDataExists('email').then(emailExists =>{
            if(emailExists){
                setEmailError(false)
            }
        })
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
        console.log(typeof(profilePic))
        setProgress(75)
        setStage(4)
    }

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

        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            return authUser.user.updateProfile({
                displayName : username
            })
        })
        .catch((error) =>{
            alert(error.message)
        })
        uploadToDatabase();
        goToHome();

    }

  return (

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

            <LinearProgress variant="determinate" value={progress} max ={100} sx ={{marginBottom : '20px'}}/>

            {stage === 1 && (

            <Stack direction = 'column' spacing = {2}>

                <Typography variant = 'h6'>Sign Up</Typography>

                <TextField error={usernameError} variant="standard" helperText = 'Username already taken'>
                    <InputLabel htmlFor="component-simple">Username</InputLabel>
                        <Input id="component-simple" value={username} onChange={handleUsernameChange} placeholder = 'Username' />
                </TextField>

                <TextField error = {emailError} variant="standard" helperText = 'Email already taken' placeholder='Email'>
                    <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input id="component-simple" value={email} onChange={handleEmailChange} placeholder = 'Email'/>
                </TextField>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Password</InputLabel>
                        <Input id="component-simple" type = 'password' value={password} onChange={handlePasswordChange} placeholder = 'Password'/>
                </FormControl>

                <Button type = 'submit' onClick = {goToBio}>Continue</Button>

            </Stack>)}


            {stage === 2 && (

                <Stack direction = 'column' spacing = {2}>

                <Typography variant = 'h6'>Your Bio</Typography>

                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Tell us about yourself</InputLabel>
                        <Input id="component-simple" value={bio} onChange={handleBioChange} placeholder = "I'm inspired by..." 
                              multiline
                              rows={5}/>
                </FormControl>

                <ButtonGroup variant="text" aria-label="text button group" sx ={{justifyContent : 'center', margin : '5%'}}>
                    <Button type = 'submit' onClick = {() =>{
                        setProgress(progress - 25);
                        setStage(stage -1);
                        setUsernameError(false);
                        setEmailError(false);
                    }}>Go Back</Button>
                    <Button type = 'submit' onClick = {goToProfilePic}>Continue</Button>
                </ButtonGroup>

                </Stack>)}
            
                {stage === 3 && (

                    <Stack direction = 'column' spacing = {2}>

                    <Typography variant = 'h6'>Your Profile Photo</Typography>

                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple"></InputLabel>
                            <Input id="component-simple" type = 'file' onChange={handleImageChange}/>
                        </FormControl>
                    
                    <ButtonGroup variant="text" aria-label="text button group" sx ={{justifyContent : 'center', margin : '5%'}}>
                        <Button type = 'submit' onClick = {() =>{
                            setProgress(progress - 25);
                            setStage(stage -1)
                        }}>Go Back</Button>
                        <Button type = 'submit' onClick = {goToConfirmation}>Continue</Button>
                    </ButtonGroup>

                    </Stack>)
                }

                {stage === 4 && (

                    <Box>

                <Stack direction = 'column' sx = {{display : 'flex', flexDirection : 'column', alignItems : 'flex-start'}} spacing = {2}>

                    <Typography variant = 'h6'>Almost there ! Here's what we got from you</Typography>
                    <Typography variant = 'body1'><strong>Username :</strong> {username}</Typography>
                    <Typography variant = 'body1'><strong>Email : </strong>{email}</Typography>
                    <Typography variant = 'body1'><strong>Bio : </strong>{bio}</Typography>
                    <img src={uploadedPic} alt=""  style={{ maxHeight: "300px"}} />

                </Stack>
            
                    <ButtonGroup variant="text" aria-label="text button group" sx ={{justifyContent : 'center', margin : '5%'}}>
                        <Button type = 'submit' onClick = {() =>{
                            setProgress(progress - 25);
                            setStage(stage -1)
                        }}>Go Back</Button>
                        <Button type = 'submit' onClick = {signUp}>Create Account</Button>
                    </ButtonGroup>
                    </Box>
                                                        )
                }

                <Typography variant = 'caption' gutterBottom>Already have an account ? <a href='' onClick={() => navigate('/sign-in')}>Sign in here</a></Typography>

            

        </center>


    </Box>

    </Fade>
    </Modal>
  )
}

export default SignUpPage