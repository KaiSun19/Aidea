import React, { useState } from 'react'
import { Box, Button, Fade, FormControl, Input, InputLabel, LinearProgress, Modal, Stack, Typography, IconButton, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth, db, storage } from '../firebase';
import firebase from 'firebase/compat/app';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import ModalNavigationArrows from '../Helpers/CustomComponents/ModalNavigationArrows';

function CreatePostModal({open, handleClose, username}) {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 420,
        height : 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display : 'flex',
        flexDirection : 'column', 
        borderRadius : '20px'

      };

    const [ caption , setCaption] = useState('')

    const [ image , setImage] = useState('')

    const [ progress, setProgress] = useState(0)

    const [ stage, setStage] = useState('intro')

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleImageChange = (event) => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
        }
    };

    const handleUpload = (e) =>{
        
        e.preventDefault()

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on( // when file begins uploading record how much of the file is uploaded 
            'state_changed', 
            (snapshot) =>{
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *100;
                setProgress(progress)
            }, 
            (error) =>{
                console.log(error)
            }, 
            () =>{
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then( url =>{
                        db.collection('Posts').add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imgUrl : url,
                            userName : username
                        })
                    })
                    setProgress(0)
                    setCaption('')
                    setImage('')
            }
            


        )

        handleClose();
    }



  return (
    
    <div>

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

            <Stack direction = 'column' spacing = {2} p = {2}> 
            {/* Start by exporting this stage to its own component */}
                <center>
                    <Typography variant = 'h6'>Share your idea</Typography>
                </center>
                <LinearProgress variant="determinate" value = {progress} color = 'inherit' sx = {{borderRadius : '10px'}} max = {100}/>

            </Stack>

            <Stack direction = 'column' spacing = {2}>

                <center>
                    <Typography variant = 'body1'><strong>How will you present your idea ?</strong></Typography>
                </center>
                <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                <Box>
                <Box sx ={{display:'flex', alignItems : 'center', backgroundColor : '#dcdcdca1', borderRadius : '15px'}} p = {2} m = {1}>
                    <Typography variant = 'h6'>Title</Typography>
                    <IconButton
                                    size="large"
                                    aria-label="learn more"
                                    aria-haspopup="true"
                                    color="primary"
                                    sx = {{padding : 0, width : '24px', height : '24px'}}>
                        <LaunchOutlinedIcon sx = {{padding : 0, width : 'inherit', height : 'inherit'}}/>
                    </IconButton >
                    <Switch  color="default" sx = {{height : '38px', width : '62px', marginLeft : '30px'}}/>
                </Box>

                <Box sx ={{display:'flex', alignItems : 'center', backgroundColor : '#dcdcdca1', borderRadius : '15px'}} p = {2} m = {1}>
                    <Typography variant = 'h6'>Description</Typography>
                    <IconButton
                                    size="large"
                                    aria-label="learn more"
                                    aria-haspopup="true"
                                    color="primary"
                                    sx = {{padding : 0, width : '24px', height : '24px'}}>
                        <LaunchOutlinedIcon sx = {{padding : 0, width : 'inherit', height : 'inherit'}}/>
                    </IconButton >
                    <Switch  color="default" sx = {{height : '38px', width : '62px', marginLeft : '30px'}}/>
                </Box>

                <Box sx ={{display:'flex', alignItems : 'center', backgroundColor : '#dcdcdca1', borderRadius : '15px'}} p = {2} m = {1}>
                    <Typography variant = 'h6'>Media</Typography>
                    <IconButton
                                    size="large"
                                    aria-label="learn more"
                                    aria-haspopup="true"
                                    color="primary"
                                    sx = {{padding : 0, width : '24px', height : '24px'}}>
                        <LaunchOutlinedIcon sx = {{padding : 0, width : 'inherit', height : 'inherit'}}/>
                    </IconButton >
                    <Switch  color="default" sx = {{height : '38px', width : '62px', marginLeft : '30px'}}/>
                </Box>

                <Box sx ={{display:'flex', alignItems : 'center', backgroundColor : '#dcdcdca1', borderRadius : '15px'}} p = {2} m = {1}>
                    <Typography variant = 'h6'>Voice</Typography>
                    <IconButton
                                    size="large"
                                    aria-label="learn more"
                                    aria-haspopup="true"
                                    color="primary"
                                    sx = {{padding : 0, width : '24px', height : '24px'}}>
                        <LaunchOutlinedIcon sx = {{padding : 0, width : 'inherit', height : 'inherit'}}/>
                    </IconButton >
                    <Switch  color="default" sx = {{height : '38px', width : '62px', marginLeft : '30px'}}/>
                </Box>
                </Box>
                </Box>

            </Stack>

            <ModalNavigationArrows leftDisable={true} rightDisable={false} />

        </Box>  

        </Fade>
    </Modal>
</div>

  )
}

export default CreatePostModal

{/* <FormControl variant="standard">
<InputLabel htmlFor="component-simple"></InputLabel>
    <Input id="component-simple" value={caption} onChange={handleCaptionChange} />
</FormControl>

<FormControl variant="standard">
<InputLabel htmlFor="component-simple"></InputLabel>
    <Input id="component-simple" type = 'file' onChange={handleImageChange}/>
</FormControl>

<Button type = 'submit' onClick ={handleUpload}>Upload</Button> */}