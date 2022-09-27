import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import {useUser} from "../Context";
import '../Styles/ProfileStyles.scss';
import { Avatar, Button, ButtonGroup, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { styled, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { getUserData } from '../Helpers/firebaseHelpers/getUserData';
import StyledButtonComponent from '../Helpers/CustomComponents/StyledButtonComponent';
import UserProfileCreatedContent from './UserProfileCreatedContent';
import UserProfileSavedContent from './UserProfileSavedContent';
import { StyledMenu, StyledTextButton } from '../Helpers/CustomComponents/StyledComponents';
import ProfileEditModal from './ProfileEditModal';
import { getAuth, updateProfile } from "firebase/auth";

function Profile() {

    const auth = getAuth();

    const {user} = useUser();
    const [ userData, setUserData] = useState('');
    const [editOption, setEditOption] = useState('');
    const [openEditModal , setOpenEditModal] = useState(false);
    const [contentView, toggleContentView] = useState('created');
    const [anchorEl, setAnchorEl] = useState(null);
    const editOpen = Boolean(anchorEl);

    useEffect(() => {
            if(user){
                getUserData(user.displayName,'all')
                    .then(result => setUserData(result[0]))
                }
            }, [user]
    );

    const handleEditClose = () =>{
        setAnchorEl(null)
    };

    const handleEditClick = (event) =>{
        setAnchorEl(event.currentTarget);
    }

    const handleEditOptionClick = (option) =>{
        setEditOption(option)
        setOpenEditModal(true);
    }

    const handleEditModalClose = () =>{
        setOpenEditModal(false);
        setTimeout(()=> window.location.reload()
        , 500 )
    }



  return(
    
    <StyledEngineProvider injectFirst>
        {user &&
            <div className='profile-page'>

                    <NavBar user = {user}/>

                    {console.log(userData)}

                    <Box sx = {{display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'column'}} m = {4} p ={2} >

                            <Avatar alt= {userData.username} src={userData.profilePic} sx = {{width : '150px', height : '150px'}} m ={1}  />
                            <Typography variant = 'h2' gutterbottom m = {1}>{userData.username}</Typography>
                            <Typography variant = 'body1' gutterbottom m = {1}>{userData.bio}</Typography>
                            <Stack direction = 'row' spacing = {2} m ={1}>
                                <Typography variant = 'body1'><strong>18</strong> Posts </Typography>
                                <Typography variant = 'body1'><strong>158</strong> Followers </Typography>
                                <Typography variant = 'body1'><strong>230</strong> Following </Typography>
                            </Stack>
                            
                            <ButtonGroup disableElevation variant="outlined" sx = {{margin : '8px', width : '100%', display:'flex', justifyContent :'center'}} className='landingPage-buttonGroup'>
                                <StyledButtonComponent mode = 'black' content = 'Share'/>
                                <Button sx = {{color : 'black',borderColor : 'black' }}
                                    onClick = {handleEditClick}>Edit Profile
                                </Button>
                            </ButtonGroup>
                        {/* code for editing profile  */}
                            <StyledMenu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={editOpen}
                                onClick={handleEditClose}
                                onClose={handleEditClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                    overflow: 'visible',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Stack direction = 'column'>
                                    <MenuItem onClick = {()=> handleEditOptionClick('Username')}>
                                    Change your Username
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick = {()=> handleEditOptionClick('Bio')} >
                                    Change your Bio
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem  onClick = {()=> handleEditOptionClick('ProfilePic')}>
                                    Change your profile picture
                                    </MenuItem>
                                </Stack>
                            </StyledMenu>

                            <Stack direction = 'row' sx = {{display:'flex', justifyContent : 'space-evenly', width : '100%'}}>
                                <Button variant="text" sx = {contentView === 'created' ? { borderBottom : '3px solid black', borderRadius : '0', color : 'black', textTransform: 'none'} : 
                                                            { borderRadius : '0', color : 'black', textTransform: 'none'} }
                                                                onClick = {() => {toggleContentView('created')}}>
                                                                    <Typography variant = 'h6'>Created</Typography>
                                </Button>
                                <Button variant="text" sx = {contentView === 'saved' ? { borderBottom : '3px solid black', borderRadius : '0', color : 'black', textTransform: 'none'} : 
                                                            { borderRadius : '0', color : 'black', textTransform: 'none'} }
                                                                onClick = {() => {toggleContentView('saved')}}>
                                                                    <Typography variant = 'h6'>Saved</Typography>
                                </Button>
                            </Stack>
                            <Box sx = {{display : 'flex', justifyContent : 'center', alignItems : 'center'}} m = {2} p ={2}>
                                
                                {contentView == 'created' ?(<UserProfileCreatedContent user ={user} className='slide-right'/>) :
                                    (<UserProfileSavedContent/>)}
                            </Box>
                    
                    </Box>

                </div>
                        }
            <ProfileEditModal option = {editOption} open = {openEditModal} handleClose = {handleEditModalClose} user = {user} />
        </StyledEngineProvider>
  )

}

export default Profile