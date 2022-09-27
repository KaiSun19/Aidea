import { PostAddSharp } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Feed from './Components/Feed';
import NavBar from './Components/NavBar';
import RightBar from './Components/RightBar';
import { auth, db } from './firebase';
import {useUser} from "./Context";

function Home() {

  const [ posts, setPosts] = useState([]);

  const {user} = useUser();


  useEffect(() =>{

    // onSnapshot fires every time collection is updated 
    db.collection('Posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => // accesses each document in the collection and retrieves the data
        ({
          id : doc.id,
          data : doc.data()})                      // posts now has all the data of Posts 
      ))
    })

  }
  , [])

  // useEffect( // runs once to see if a user is logged in or not 
        
  //     () =>{

  //       const unsubscribe = auth.onAuthStateChanged((authUser) =>{

  //       if(authUser){ // means that a user is logged in 
  //           console.log(authUser);
  //           setUser(authUser)
  //       }
  //       else{
  //           setUser(null)
  //       }
  //     })

  //     return () =>{
  //       unsubscribe();  
  //       }
  //       },
  //   [])

  //   console.l

  return (
    <div className="Home">

      {user &&
      <NavBar user = {user}/>}

      <Stack direction="row" spacing={2} justifyContent="space-between">
        
          {posts.length > 0 &&
          
            <Feed posts = {posts} user = {user}/> 

          }

          <RightBar />

      </Stack>


  
    </div>

  );
}

export default Home;