import { IconButton, Stack } from '@mui/material';
import React from 'react';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

function ModalNavigationArrows({leftDisable, rightDisable}) {


  return (
    <Stack direction = 'row' sx = {{display : 'flex', justifyContent : 'space-around', marginTop : '8px'}}>
    <IconButton disabled = {leftDisable} aria-label="Go Back" sx = {{padding : 0}} color = 'primary'>
        <KeyboardArrowLeftRoundedIcon sx = {{width : '40px', height : '40px'}}/>
    </IconButton>
    <IconButton disabled = {rightDisable} aria-label="continue" sx = {{padding : 0}} color = 'primary'>
        <KeyboardArrowRightRoundedIcon sx = {{width : '40px', height : '40px'}} />
    </IconButton>
</Stack>
  )
}

export default ModalNavigationArrows