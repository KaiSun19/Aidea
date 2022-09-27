import { db } from "../../firebase";
import firebase from 'firebase/compat/app';
import { useState } from "react";

export const getUserPosts = async (username) =>{


    const userPosts = [];

    const snapshot = await db.collection('Posts').where('userName' , '==', username).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
      
    snapshot.forEach(doc => {
        userPosts.push(doc.data())}
    )
    return userPosts;

}