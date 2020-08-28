import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDehZDC23GjBU7uhecs3ESLFoIR4YMdL3g",
    authDomain: "ecom-worstguyalive.firebaseapp.com",
    databaseURL: "https://ecom-worstguyalive.firebaseio.com",
    projectId: "ecom-worstguyalive",
    storageBucket: "ecom-worstguyalive.appspot.com",
    messagingSenderId: "280220648936",
    appId: "1:280220648936:web:7983325390a75a5e53905d"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
          console.log("Error:", error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
