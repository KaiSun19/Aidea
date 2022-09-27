import { Box, IconButton, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

function CreatePostModalStage5({currentAudio,updateAudio }) {

    const  handleAudioStop = (data) =>{
        console.log(data)
        updateAudio(data);
    }

    const handleAudioUpload = (e, file) =>{
        e.preventDefault();
        console.log(file);
    }

    const handleCountDown = (data) =>{
        console.log(data);
    }

    const handleReset = () =>{
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        updateAudio(reset);
      }

  return (
    <Stack direction = 'column' spacing = {2}>

        <center>
            <Typography variant = 'body1'><strong>Add a voice note</strong></Typography>
        </center>

        <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

        <Recorder
            record={true}
            audioURL={currentAudio.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleCountDown={data => handleCountDown(data)}
            handleReset={() => handleReset()}
            mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
        />

        </Box>   

    </Stack>
  )
}

export default CreatePostModalStage5