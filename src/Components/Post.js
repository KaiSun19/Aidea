
import { SendRounded, Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from 'firebase/compat/app';

const Post = ({user, postId, avatarPic, userName, date,mediaUrls, description }) => {

  const [ comments , setComments] = useState(null);
  const [ comment , setComment] = useState('');

  useEffect(()=>{ // when a post is loaded get the collection of comments that belong to the post doc in order to update comments 
    let unsubscribe;
    if(postId){
      unsubscribe = db.
                      collection('Posts')
                      .doc(postId)
                      .collection('Comments')
                      .orderBy('timestamp', 'desc')
                      .onSnapshot((snapshot)=>{
                        setComments(snapshot.docs.map((doc)=>
                          (
                            {data : doc.data(), 
                            id : doc.id}
                            )
                        ))
                        // console.log(snapshot.docs.map((doc)=>{
                        //   console.log(doc.data());
                        // }))
                        
                      })
                      
                    
    }
    return () =>{
      unsubscribe(); 
      };
  }, 
    [])
  
  const postComment = (e) =>{

    e.preventDefault();
    db.collection('Posts').doc(postId).collection('Comments').add({
      username : user.displayName,
      text: comment,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('')
  }

  return (
    <Card sx={{ margin: 5 , maxWidth : '500px', border : '1px solid #d4d4d4'}} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src = {avatarPic}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={userName}
        subheader={date}
      />
      {mediaUrls.map(imgUrl =>{
        return (
          <CardMedia
          key = {imgUrl}
          component="img"
          style={{
              maxHeight: "300px"
            }}
          image={imgUrl}
        />
        )
      })}
      <CardActions disableSpacing sx = {{padding : '0'}}>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.primary">
            {description}
        </Typography>
      </CardContent>
      <CardContent>

        {
          comments !== null &&
            (
              comments.map(comment=>{
                return (
                  <Typography key = {comment.id} variant="body2" color="text.primary">
                    <strong style ={{marginRight : '5px'}}>{comment.data.username}</strong>{comment.data.text}
                  </Typography>
                )
              })
            )
        }

      </CardContent>
      <CardActions disableSpacing>
        <Box sx = {{display :'flex', width : '90%', justifyContent :'center', alignContent : 'center'}}>
        <TextField
          id="standard-search"
          label=""
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick = {postComment} sx ={{ "&:hover" : {
                  cursor : 'pointer'
              }}}>
                <SendRounded />
              </InputAdornment>
            ),
          }}
          type="search"
          variant="standard"
          value={comment}
          placeholder="Add a comment"
          sx = {{width : '100%', padding : '2%'}}
          onChange = {(e) => setComment(e.target.value)}
        />
        </Box>
      </CardActions>
    </Card>
  );
};

export default Post;