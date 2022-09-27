import { Box, Grid, IconButton, Stack, Switch, TextField, Typography, CardMedia, Card, FormControl, InputLabel, Input, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function CreatePostModalStage3({updateMedia, currentMedia}) {

    let fileObj = [];// resets after every render and stores uploaded pic 
    let fileArray = []; // is used to store the current pic object url 

    const uploadMultipleFiles = (e) => {  
        fileObj.push(e.target.files[0]) // fileObj now has the uploaded file object 
        if(currentMedia){ 
            fileArray.push(...currentMedia)} // fileArray now has all the elements of the current state of currentMedia 
        fileArray.push({
            name : fileObj[0].name,
            data : fileObj[0]})
        updateMedia(fileArray)
        }

  return (

    <StyledEngineProvider injectFirst>

        <Stack direction = 'column' spacing = {2}>

        <center>
            <Typography variant = 'body1'><strong>Add your media</strong></Typography>
        </center>
        <Box sx = {{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>

            <Box sx = {{width : '50%', flexDirection: 'row', justifyContent : 'flex-start', display : 'flex', flexWrap : 'wrap'}} >
                {currentMedia?.map(media =>{
                    return (
                        <Card className='add-media-card'>
                            <CardMedia
                                component='img'
                                image = {URL.createObjectURL(media.data)}
                                />
                        </Card>
                    )
                })}
            </Box>

            <FormControl variant="standard" sx ={{marginTop : '25px', marginBottom : '10px'}}>
                <InputLabel htmlFor="component-simple"></InputLabel>
                    <Input id="component-simple" type = 'file' onChange={uploadMultipleFiles}/>
            </FormControl>


        </Box>

        </Stack>
    </StyledEngineProvider>
  )
}

export default CreatePostModalStage3;