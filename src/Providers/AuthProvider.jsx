import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebaseinit/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';
export const AuthContext = createContext(null);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const axiosPublic =useAxiosPublic()
    const [loading,setLoading]=useState(true);

    const signUp =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const googleLogin =()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }
    const update =(name,photo)=>{
       
        return updateProfile(auth.currentUser,{
            displayName: name ,photoURL:photo
        })
    }
    const logOut =()=>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            const loggedUser={email: currentUser?.email}
            
            if(currentUser){
                axiosPublic.post('/jwt',loggedUser)
                .then(res=>{
                   
                  if(res.data.token){
                      localStorage.setItem('access-token',res.data.token)
                     setLoading(false)
                  }
                })
            }else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        return()=>{
            unSubscribe()
        }
    },[])

    const authInfo ={
        signIn,signUp,update,googleLogin,logOut,user,loading
    }
    return (
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;