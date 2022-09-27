import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system'
import React from 'react'

function StyledButtonComponent({mode,styles, onClick, content}) {

    let StyledButton;
    if(mode =='black'){
        StyledButton = styled(Button)({
            border : '1px solid black',
            textTransform: 'none',
            backgroundColor : 'black',
            color : 'white',
            borderRadius : '5px',
            '&:hover' : {
                backgroundColor :'black',
                color : 'white',
                cursor : 'pointer'
            }
        })
    }
    else if(mode =='white'){
        StyledButton = styled(Button)({
            border : '1px solid black',
            textTransform: 'none',
            backgroundColor : 'white',
            color : 'black',
            borderRadius : '5px',
            '&:hover' : {
                cursor : 'pointer',
                backgroundColor :'white',
                color : 'black',
                border : '1px solid black'
            }
        })
    }
  return (
    <StyledButton sx  = {styles} onClick = {onClick}><Typography variant = 'subtitle1'>{content}</Typography></StyledButton>
  )
}

export default StyledButtonComponent