import { Box, Button, ButtonGroup, Stack, Typography } from '@mui/material'
import { breakpoints } from '@mui/system';
import React, { useState , useEffect } from 'react'
import { ReactComponent as AideaLogo} from '../Assets/AIDEA.svg';
import { useNavigate } from "react-router-dom";
import SignUpPage from './SignUpPage';
import LandingPageCard from './LandingPageCard';
import '../Styles/LandingPageStyles.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Slider from './Slider';
import { getCreatedPosts } from '../Helpers/firebaseHelpers/getCreatedPosts';
import SignInPage from './SignInPage';

function LandingPage() {

    const navigate = useNavigate();

    const [examples, setExamples] = useState();

    // useEffect to get posts
    useEffect( () => {getCreatedPosts().then(result => setExamples(result))}
    , [])
    console.log(examples)

    useEffect(()=>{
        const landingPageCards = document.querySelectorAll('.landingPage-card');
        
        Array.from(landingPageCards).forEach((card) => {
            card.classList.add('slide-up');
        })

        setTimeout(()=>{
            Array.from(landingPageCards).forEach((card) => {
                card.classList.remove('slide-up');
            })
        }, 1000)

    })

    const [openSignUpModal, setOpenSignUpModal] = useState(false)
    const [openSignInModal, setOpenSignInModal] = useState(false)
    const [optionsIndex, setOptionsIndex] = useState(0)

    const handleSignUpModalClose = () =>{
        setOpenSignUpModal(false)
    }

    const handleSignInModalClose = () =>{
        setOpenSignInModal(false)
    }


    const theme = useTheme();

    const ideaOptions = ['Aidea', 'Technology', 'Science', 'Style', 'Design'];

    const getRandomColor = () =>{
        const randomCode = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        return randomCode;
    }

    return (
        <StyledEngineProvider injectFirst>
            <Box sx ={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems : 'center', m : '20px'}}>
                <Stack direction = 'row' className = 'landingPage-header'>

                    <AideaLogo className='landingPage-logo'/>

                    <ButtonGroup className='landingPage-buttonGroup' variant="outlined" aria-label="text button group" size = 'large' orientation={[theme.breakpoints.down('sm')] ? 'horizontal' : 'vertical'}>

                        <Button sx ={{color : 'white', borderColor : 'black', backgroundColor : 'black'}}
                                onClick = {()=> setOpenSignUpModal(true)}><Typography variant = 'body2'><strong>Sign Up</strong></Typography>
                        </Button>
                        <Button sx = {{color : 'black',borderColor : 'black' }}
                                onClick = {()=> setOpenSignInModal(true)}>Log in
                        </Button>

                    </ButtonGroup>
                    
                </Stack>
                <div className='landingPage-title-container'>
                    <Box className='landingPage-title'>
                        <center>
                            <Typography variant = 'h1' gutterBottom  sx = {{margin : '20px', fontSize : {md : '6rem', sm : '5rem'}, minWidth : '50%'}}>Welcome to</Typography>
                        </center>
                        <Stack className = 'landingPage-title-toggle'>
                            <Typography variant = 'h1' gutterBottom  sx = {{margin : '20px', fontSize : {md : '6rem', sm : '5rem'} , color : getRandomColor()}} ><strong>{ideaOptions[optionsIndex]}</strong></Typography>
                            <Slider changeIndex = {setOptionsIndex}/>
                        </Stack>
                    </Box>
                </div>

                <Box className='landingPage-cards'>
                    {examples &&
                        examples.map( (example, index) =>{
                            return(
                                <LandingPageCard media={example} key = {index} id = {`landingPage-cards-${index}`}/>
                            )
                        })
                    }
                </Box>

            </Box>

            <SignUpPage open ={openSignUpModal} handleClose = {handleSignUpModalClose} />
            <SignInPage open ={openSignInModal} handleClose = {handleSignInModalClose} />

        </StyledEngineProvider>
)
}

export default LandingPage