import { Box, FormControl, IconButton, InputLabel, Stack, Switch, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useState } from 'react';
import { appTheme } from '../../../Themes';
import { StyledInput } from '../StyledComponents';

function CreatePostModalStage1({currentTitle, updateTitle}) {

    const handleTitleChange = (event) =>{
        updateTitle(event.target.value)
        console.log(currentTitle)
    }

  return (
    <ThemeProvider theme={appTheme}>

        <Stack direction = 'column' spacing = {2}>

        <center>
            <Typography variant = 'body1'><strong>Create your title</strong></Typography>
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

                <FormControl variant="standard" sx = {{width : '100%'}}>
                    <InputLabel htmlFor="component-simple" color = 'black' >Title</InputLabel>
                        <StyledInput id="component-simple" value={currentTitle} onChange={handleTitleChange} placeholder='First impresssions count' />
                </FormControl>


            </Box>


        </Box>

        </Stack>
    </ThemeProvider>
  )
}

export default CreatePostModalStage1