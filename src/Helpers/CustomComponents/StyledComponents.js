import { Input, Button,  styled, InputLabel, LinearProgress, Menu, TextField } from "@mui/material"

export const StyledTextButton = styled(Button)({

    color : '#0D0D0D',
    '&:hover': {
        backgroundColor: '#dcdcdc40',
    }

})

export const StyledInput = styled(Input)({

    '&:after' : {
        borderBottom : '2px solid #474747'
    }

})

export const StyledTextField = styled(TextField)({

    '& label.Mui-focused': {
        color: '#0D0D0D',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#0D0D0D',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#0D0D0D',
        },
        '&:hover fieldset': {
          borderColor: '#0D0D0D',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#0D0D0D',
        },
      },

})

export const StyledInputLabel = styled(InputLabel)({

    '& label.Mui-focused': {
        color: '#0D0D0D',
      },

})

export const StyledLinearProgress = styled(LinearProgress)({

    '& span.MuiLinearProgress-root' : {
        backgroundColor : 'black'
    }

})

export const StyledMenu = styled(Menu)({
    '& .MuiPopover-paper' : {
        border : '1px solid #0D0D0D',
    },

    '& .MuiPopover-paper:before' : {
        borderTop : '1px solid #0D0D0D',
    }
})
