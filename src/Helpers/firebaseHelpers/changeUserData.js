import { db , storage} from "../../firebase";
import firebase from 'firebase/compat/app';
import { getAuth, updateProfile } from "firebase/auth";
import { changePostNames } from "./changePostNames";

export const changeUserData = async (username, option, newOption) =>{

    const auth = getAuth();

    const userDocRef = await db.collection('UserProfiles').where('username' , '==', username).get();

    let taken ;

    userDocRef.forEach(async (ref) =>{
        const userDoc =  db.collection('UserProfiles').doc(ref.id);
        if (userDoc.empty) {
            console.log('No matching documents.');
            return;
          }

        // code to change username
        
        if(option === 'Username' ){

            newOption = newOption.replace(/\s/g, '');

            const newDocRef = await db.collection('UserProfiles').where('username' , '==', newOption).get();

            if(newDocRef.docs.length === 0){

                await changePostNames(username, newOption);
                
                const res = await userDoc.set({
                    username: newOption
                    }, 
                    { merge: true }
                );
        
                updateProfile(auth.currentUser, {
                    displayName: newOption
                }).then()

            }

            if(option === 'Username' && newDocRef.docs.length > 0 ){
            }
            
        }

        // code to change bio 

        else if(option === 'Bio'){
            const res = await userDoc.set({
                bio: newOption
                }, 
                { merge: true }
            );
        }

        // code to change photo 

        else if(option === 'Photo'){

            const uploadTask = storage.ref(`images/${newOption.name}`).put(newOption); // starts upload task to storage 

            uploadTask.on( // when file begins uploading record how much of the file is uploaded 
            'state_changed', 
            (snapshot) =>{
                console.log(snapshot)
            }, 
            (error) =>{
                console.log(error)
            }, 
            () =>{
                storage
                    .ref('images')
                    .child(newOption.name)
                    .getDownloadURL()
                    .then(async (url) =>{

                        await userDoc.set({
                            profilePic : url
                            },
                            { merge: true }
                        );

                    })
            }

        )

        }
    })

    if(option === 'Username'){
        const newDocRef = await db.collection('UserProfiles').where('username' , '==', newOption).get();
        if(newDocRef.docs.length > 0 ){
            return true;
        }
    }





}