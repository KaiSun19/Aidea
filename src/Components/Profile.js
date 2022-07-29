import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import {useUser} from "../Context";
import { Avatar, Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { getUserData } from '../Helpers/getUserData';
import StyledButtonComponent from '../Helpers/CustomComponents/StyledButtonComponent';
import UserProfileCreatedContent from './UserProfileCreatedContent';
import UserProfileSavedContent from './UserProfileSavedContent';

function Profile() {

    const {user} = useUser();
    const [ userData, setUserData] = useState('');
    const [contentView, toggleContentView] = useState('created');
    useEffect(() => {getUserData(user.displayName,'all').then(result => setUserData(result[0]))}, []) // ALWAYS USEEFFECT BEFORE ALTERING STATE AHHHHH

  return( 
      <div className='profile-page'>

            <NavBar user = {user}/>

            <Box sx = {{display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'column'}} m = {4} p ={2} >

                    <Avatar alt= {userData.username} src={userData.profilePic} sx = {{width : '150px', height : '150px'}} m ={1}  />
                    <Typography variant = 'h2' gutterbottom m = {1}>{userData.username}</Typography>
                    <Stack direction = 'row' spacing = {2} m ={1}>
                        <Typography variant = 'body1'><strong>18</strong> Posts </Typography>
                        <Typography variant = 'body1'><strong>158</strong> Followers </Typography>
                        <Typography variant = 'body1'><strong>230</strong> Following </Typography>
                    </Stack>
                    <ButtonGroup disableElevation variant="outlined" sx = {{margin : '8px', width : '100%', display:'flex', justifyContent :'center'}}>
                        <StyledButtonComponent mode = 'black' styles = {{width : '120px'}}content = 'Share'/>
                        <StyledButtonComponent mode = 'white' styles = {{width : '120px'}}content = 'Edit Profile'/>
                    </ButtonGroup>
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
  )

}

export default Profile