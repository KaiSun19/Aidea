import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import StyledButtonComponent from '../Helpers/CustomComponents/StyledButtonComponent';
import { getUserPosts } from '../Helpers/getUserPosts';
import CreatePostModal from './CreatePostModal';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

function UserProfileCreatedContent({user}) {

  const [ userPosts, setUserPosts] = useState('');
  const [createPostOpen, setCreatePostOpen] = useState(false)

  useEffect( ()=>{
  getUserPosts(user.displayName).then(result => 
    setUserPosts(result)
    )}, [])
  console.log(userPosts)
  
  if(userPosts === null){
  return (
  <StyledEngineProvider injectFirst>
    <Box sx ={{display : 'flex', flexDirection : 'column', justifyContent : 'center', alignContent : 'center', alignItems : 'center'}} className='slide-right'>

      <Typography variant = 'body1' m = {1}><strong>Share inspiration to the world</strong></Typography>
      <StyledButtonComponent mode={'white'} content = 'Share an idea' styles = {{width : '118px', borderRadius : '10px', margin : '8px'}} 
                              onClick = {()=>setCreatePostOpen(true)}/>


      {user?.displayName ?  (
        <CreatePostModal open = {createPostOpen} handleClose = {() => setCreatePostOpen(false)} username = {user.displayName}/>)
          : ''  }

    </Box>
  </StyledEngineProvider>
  )
  }
  else{
    return(
      <div className='user-profile-content-created'>

      </div>
    )
  }
}

export default UserProfileCreatedContent