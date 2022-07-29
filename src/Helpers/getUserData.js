import { db } from "../firebase";
import firebase from 'firebase/compat/app';
import { useState } from "react";

export const getUserData = async (username, info) =>{


    const userData = [];

    const snapshot = await db.collection('UserProfiles').where('username' , '==', username).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      
    snapshot.forEach(doc => {
        userData.push(doc.data())}
    )
    return userData;

}