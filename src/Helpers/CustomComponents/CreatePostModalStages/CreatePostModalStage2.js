import { Box, IconButton, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StyledTextField } from '../StyledComponents';

function CreatePostModalStage2({currentDesc, updateDesc}) {

    const handleDescChange = (event) =>{
        updateDesc(event.target.value)
        console.log(currentDesc)
    }

  return (
    <Stack direction = 'column' spacing = {2}>

    <center>
        <Typography variant = 'body1'><strong>Create your Description</strong></Typography>
    </center>
    <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

        <Box
        component="form"
        noValidate
        autoComplete="off"
        m={1}
        p={1}
        sx = {{width : '80%'}}
        >
            <StyledTextField
            id="outlined-multiline-flexible"
            label="Description"
            value = {currentDesc}
            placeholder = 'Share your thoughts to the world'
            multiline
            rows={4}
            onChange={handleDescChange}
            sx ={{width : '100%'}}
            />
        </Box>


    </Box>

</Stack>
  )
}

export default CreatePostModalStage2;