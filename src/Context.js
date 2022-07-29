import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const UserContext = React.createContext() // creates a context 

export function useUser(){  // allows BudgetsContext to be used outside of BudgetsContext 
    return useContext(UserContext);
}

export const UserProvider = ({children}) =>{

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect( // runs once to see if a user is logged in or not 
        
    () =>{

      const unsubscribe = auth.onAuthStateChanged((authUser) =>{

      if(authUser){ // means that a user is logged in 
          console.log(authUser);
          setUser(authUser)
          console.log(user.displayName);
      }
      else{
          setUser(null)
      }
    })

    return () =>{
      unsubscribe();  
      }
      },
  [])







    return(
        <UserContext.Provider
            value = {{ // these values will be passed down to any component and made available under budget provider 
                user
            }}>
                {children}

        </UserContext.Provider>
    )
}