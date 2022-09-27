import { Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import StyledButtonComponent from '../Helpers/CustomComponents/StyledButtonComponent';
import { getUserPosts } from '../Helpers/firebaseHelpers/getUserPosts';
import CreatePostModal from './CreatePostModal';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import '../Styles/ProfileCreatedContentStyles.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';

function UserProfileCreatedContent({user}) {

  const [ userPosts, setUserPosts] = useState();
  const [createPostOpen, setCreatePostOpen] = useState(false)

  console.log(user)

  useEffect( ()=>{
  getUserPosts(user.displayName).then(result => 
    setUserPosts(result)
    )}, [])
  
  console.log('user posts' + userPosts)
  
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
  else if(userPosts){
    return(
      <StyledEngineProvider injectFirst>
        <Box  className='slide-right profile-createdContent'>
          <Grid container  direction = 'row'>
          {
            userPosts?.map((post,key) =>{

              return(
                <Grid item  xs = {6} sm = {6} md = {4} key = {key} className  = 'createdContent-container'>
                    <Card className='createdContent-card'>
                      <CardMedia
                      component="img"
                      image={post.mediaUrls[0]}
                      alt="user post"
                      />

                    </Card>

                    <Box className='createdContent-overlay'>

                      <Stack direction = 'row' className='overlay-stack'>
                        <FavoriteIcon /> <Typography variant = 'h6'>10</Typography>
                      </Stack>
                    </Box>


                </Grid>
              )

            })
          }

          </Grid>
      </Box>
    </StyledEngineProvider>
    )
  }
}

export default UserProfileCreatedContent