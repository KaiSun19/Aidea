import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Fade, FormControl, Input, InputLabel, LinearProgress, Modal, Stack, Typography, IconButton, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import { auth, db, storage } from '../firebase';
import firebase from 'firebase/compat/app';
import ModalNavigationArrows from '../Helpers/CustomComponents/ModalNavigationArrows';
import CreatePostModalStage0 from '../Helpers/CustomComponents/CreatePostModalStages/CreatePostModalStage0';
import CreatePostModalStage1 from '../Helpers/CustomComponents/CreatePostModalStages/CreatePostModalStage1';
import modalStyle from '../Styles/ModalStyle';
import CreatePostModalStage2 from '../Helpers/CustomComponents/CreatePostModalStages/CreatePostModalStage2';
import CreatePostModalStage3 from '../Helpers/CustomComponents/CreatePostModalStages/CreatePostModalStage3';
import CreatePostModalStage4 from '../Helpers/CustomComponents/CreatePostModalStages/CreatePostModalStage4';
import CreatePostModalStage5 from '../Helpers/CustomComponents/CreatePostModalStages/CreatePostModalStage5';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';


function CreatePostModal({open, handleClose, username}) {

    const [ progress, setProgress] = useState(0)
    const [ stage, setStage] = useState(0)

    const baseSelection = [{step : 0 , name : 'Selections'}, {step : 5, name : 'Submit'}]
    // states changed from user interactions 

    const [selections, setSelections] = useState(baseSelection)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [media, setMedia] = useState()
    const [voice, setVoice] = useState({
        isRecording: false,
        blobURL: '',
        isBlocked: false,
    });

    useEffect(()=>{
        setProgress(stage * 20)
    }, [stage])

    const handleUpload = (e) =>{
        
        e.preventDefault()
        let downloadUrls = []
        let docId;
        db.collection('Posts').add({
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            title : title,
            description : description,
            userName : username,
            mediaUrls : downloadUrls
        }).then(docRef =>{
            docId = docRef.id;
        })
        media.map(individualMedia =>{
            const uploadTask = storage.ref(`images/${individualMedia.name}`).put(individualMedia.data)        
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
                        .child(individualMedia.name)
                        .getDownloadURL()
                        .then( url =>{
                            downloadUrls.push(url)
                            db.collection('Posts').doc(docId).set({
                                mediaUrls : downloadUrls
                            }, {merge: true})
                        })
            })
        })

        handleClose();
        setProgress(0);
        setStage(0);
        setSelections([]);
        setTitle(null);
        setDescription(null);
        setMedia()
        setVoice({
            isRecording: false,
            blobURL: '',
            isBlocked: false,
        })

    }



  return (
    
    <div>

    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
            handleClose();
            setStage(0);
            setProgress(0)}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
    >
        <Fade in={open}>
        <Box sx={modalStyle} component = 'form'>

            <Stack direction = 'column' spacing = {2} p = {2}> 
                <center>
                    <Typography variant = 'h6'>Share your idea</Typography>
                </center>
                <LinearProgress variant="determinate" value = {progress} color = 'inherit' sx = {{borderRadius : '10px'}} max = {100}/>

            </Stack>

            {stage === 0 ? (
                <>
                    <CreatePostModalStage0 selectionsChanger={setSelections} selections = {selections}/>

                    <ModalNavigationArrows leftDisable={true} rightDisable={false} updateStage = {setStage} currentStage = {stage} handleProgress = {setProgress} selections = {selections} />
                </>
            ) : 
            ('')
                }
            
            {stage === 1 ? (
                <>
                    <CreatePostModalStage1 updateTitle = {setTitle} currentTitle = {title}/>

                    <ModalNavigationArrows leftDisable={false} rightDisable={false} updateStage = {setStage} currentStage = {stage} handleProgress = {setProgress} selections = {selections}/>
                </>
            ) : 
            ('')
                }

            {stage === 2 ? (
                <>
                    <CreatePostModalStage2 updateDesc = {setDescription} currentDesc = {description}/>

                    <ModalNavigationArrows leftDisable={false} rightDisable={false} updateStage = {setStage} currentStage = {stage} handleProgress = {setProgress} selections = {selections}/>
                </>
            ) : 
            ('')
                }

            {stage === 3 ? (

                <>
                    <CreatePostModalStage3 currentMedia = {media} updateMedia = {setMedia}/>

                    <ModalNavigationArrows leftDisable={false} rightDisable={false} updateStage = {setStage} currentStage = {stage} handleProgress = {setProgress} selections = {selections}/>
                </>
            ) : 
            ('')
                }

            {stage === 4 ? (
                
                <>
                    <CreatePostModalStage4 currentVoice = {voice} updateVoice = {setVoice}/>

                    <ModalNavigationArrows leftDisable={false} rightDisable={false} updateStage = {setStage} currentStage = {stage} handleProgress = {setProgress} selections = {selections}/>
                </>
            ) : 
            ('')
                }
            
            {stage === 5 ? (
                <>
                    <CreatePostModalStage5 />

                    <Button endIcon={<KeyboardArrowRightRoundedIcon />} onClick={handleUpload}>
                        Share with the world
                    </Button>
                </>
            ) : 
            ('')
                }

            

                   

        </Box>  

        </Fade>
    </Modal>
</div>

  )
}

export default CreatePostModal