import { IconButton, Stack } from '@mui/material';
import React from 'react';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

function ModalNavigationArrows({leftDisable, rightDisable, updateStage, currentStage,handleProgress, selections}) {

    const handleStage = (direction) =>{

      const currentIndex = [selections.map(selection => return (selection.step))]
      if(direction === 'previous'){
        updateStage(selections[0].step)
      }
      else if(direction === 'next'){
        updateStage(selections[3].step)
      }
    }


  return (
    <Stack direction = 'row' sx = {{display : 'flex', justifyContent : 'space-around', marginTop : '8px'}}>
    <IconButton disabled = {leftDisable} aria-label="Go Back" sx = {{padding : 0, color : 'black'}}  onClick = { () => handleStage('previous')}>
        <KeyboardArrowLeftRoundedIcon sx = {{width : '40px', height : '40px', color : 'inherit'}}/>
    </IconButton>
    <IconButton disabled = {rightDisable} aria-label="continue" sx = {{padding : 0,  color : 'black' }} onClick = {() => handleStage('next')}>
        <KeyboardArrowRightRoundedIcon sx = {{width : '40px', height : '40px', color : 'inherit'}} />
    </IconButton>
</Stack>
  )
}

export default ModalNavigationArrows