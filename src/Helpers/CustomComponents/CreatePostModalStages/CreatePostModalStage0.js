import { Box, IconButton, Stack, Switch, Typography } from '@mui/material';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import React, { useEffect, useState } from 'react';

function CreatePostModalStage0({selectionsChanger, selections}) {

    const checkStepExists = (selection) =>{
        let exists;
        if(selections.length > 0 ){

            selections.map(obj =>{

                if(obj.step === selection.step ){
                    exists = true;
                }
                else{
                    exists = false;
                }
            })

        }
        else{
            exists = false;
        }

        return exists;
    }

    const toggleSelections = (selection) =>{


        if(checkStepExists(selection) === false){
            selectionsChanger(prevArray =>{
                return ([...prevArray, selection ])
            })
        }
        else if(checkStepExists(selection) === true){
            selectionsChanger(prevArray =>{
                return prevArray.filter(added =>{
                    return added.step !== selection.step
                })
            })
        }

    }

    // 

    useEffect(()=>{
        selectionsChanger(
            prevArray => {
                return ( [prevArray[0], ...prevArray.slice(2), prevArray[1]] )}
        )}, [selections])



  return (
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
                <Switch  sx = {{height : '38px', width : '62px', marginLeft : '30px'}} onClick={() => toggleSelections({step : 1, name : 'Title'})}/>
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
                <Switch  sx = {{height : '38px', width : '62px', marginLeft : '30px'}} onClick={() => toggleSelections({step : 2, name : 'Description'})}/>
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
                <Switch  sx = {{height : '38px', width : '62px', marginLeft : '30px'}} onClick={() => toggleSelections({step : 3, name : 'Media'})}/>
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
                <Switch sx = {{height : '38px', width : '62px', marginLeft : '30px'}} onClick={() => toggleSelections({step : 4, name : 'Voice'})}/>
            </Box>
        </Box>
    </Box>

</Stack>
  )
}

export default CreatePostModalStage0