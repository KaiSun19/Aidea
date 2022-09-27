import { db , storage} from "../../firebase";
import firebase from 'firebase/compat/app';
import { getAuth, updateProfile } from "firebase/auth";

export const changePostNames = async (username, newUsername ) =>{

    const userPostsRef = await db.collection('Posts').where('userName' , '==', username).get();
    if (userPostsRef.empty) {
        console.log('No posts to change.');
        return null;
      }
    
    else{
        userPostsRef.forEach(async (ref) =>{
            const userPost =  db.collection('Posts').doc(ref.id);
            const res = await userPost.set({
                userName: newUsername
                }, 
                { merge: true });
        })
    }
}
