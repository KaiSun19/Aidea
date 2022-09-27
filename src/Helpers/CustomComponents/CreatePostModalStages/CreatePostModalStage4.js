import { Box, Grid, IconButton, Stack, Switch, TextField, Typography, CardMedia, Card, FormControl, InputLabel, Input, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import MicRecorder from 'mic-recorder-to-mp3';

function CreatePostModalStage4({updateVoice, currentVoice}) {

    // GET RECORDER IN A STATE 
    
    const [ recorder, setRecorder ]  = useState(new MicRecorder({ bitRate: 128 }));
    // checking browser permissions 

    useEffect(()=> {

        navigator.getUserMedia({ audio: true },
            () => {
              console.log('audio permission granted');
              updateVoice(currentVoice =>{
                return {...currentVoice, [currentVoice.isBlocked] : false}
              });
            },
            () => {
              console.log('audio permission denied');
              updateVoice(currentVoice =>{
                return {...currentVoice, [currentVoice.isBlocked] : true}
              });
            },
          );

    }, [])

      function startRecording () {

        recorder.start().then(() =>{
            updateVoice(currentVoice =>{
                return {...currentVoice, isRecording : true}
              });
        }).catch((e) => {
            console.error(e);
          });
      }

      function stopRecording () {

        recorder.stop().getMp3().then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                console.log(blobURL)
                updateVoice(currentVoice =>{
                    return {...currentVoice, blobURL : blobURL, isRecording : false }
                  });
                })
      }


  return (

    <StyledEngineProvider injectFirst>

        <Stack direction = 'column' spacing = {2}>

        <center>
            <Typography variant = 'body1'><strong>Add your Voice</strong></Typography>
        </center>
        <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

            <Box sx = {{width : '50%', display : 'flex', justifyContent : 'center', flexDirection : 'column', alignItems : 'center'}}>

                <IconButton sx = {{width : '100%', height : '100%'}} onClick = {() => startRecording()} >
                    <KeyboardVoiceRoundedIcon sx = {{minWidth : '100%', width : '150px', height : '150px'}}/>
                </IconButton>

                <Button color = 'error' onClick = {() => stopRecording()}>Stop Recording</Button>

                <audio src={currentVoice.blobURL} controls="controls" style = {{marginTop : '10px'}} />

            </Box>

            <Box sx = {{width : '50%', flexDirection: 'row', justifyContent : 'flex-start', display : 'flex', flexWrap : 'wrap'}} >
                {/* {currentVoice?.map(media =>{
                    return (
                        <Card className='add-media-card'>
                            <CardMedia
                                component='img'
                                image = {URL.createObjectURL(media.data)}
                                />
                        </Card>
                    )
                })} */}
            </Box>

            {/* <FormControl variant="standard" sx ={{marginTop : '25px', marginBottom : '10px'}}>
                <InputLabel htmlFor="component-simple"></InputLabel>
                    <Input id="component-simple" type = 'file' onChange={uploadMultipleFiles}/>
            </FormControl> */}


        </Box>

        </Stack>
    </StyledEngineProvider>
  )
}

export default CreatePostModalStage4;