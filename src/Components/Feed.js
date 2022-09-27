import { Box } from '@mui/material'
import React from 'react'
import Post from './Post'
//import MockPosts from '../Mocks'

function Feed({posts,user}) {

  return (

    <Box flex={4} p={{ xs: 0, md: 2 }}>

        {posts.map(post =>{
            return (
                <Post key = {post.id} avatarPic={post.data.avatarPic}
                        userName = {post.data.userName}
                        date = {post.data.date}
                        mediaUrls = {post.data.mediaUrls}
                        description = {post.data.description}
                        postId = {post.id}
                        user = {user}
                        />
            )
        })}


    </Box>
  )
}

export default Feed