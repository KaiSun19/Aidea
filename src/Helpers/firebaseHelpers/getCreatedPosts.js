import { db } from "../../firebase";
import firebase from 'firebase/compat/app';
import { useState } from "react";

export const getCreatedPosts = async () =>{

    const userPosts = [];

    const snapshot = await db.collection('Posts').limit(5).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
    snapshot.forEach(doc => {
        const media = doc.data().mediaUrls[0]
        if(media){
            userPosts.push(media)
        }
        else {
            const postTitle = doc.data().title;
            userPosts.push(postTitle)
        }
    
    }
    )
    return userPosts;

}