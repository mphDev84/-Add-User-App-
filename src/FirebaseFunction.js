import { useContext, useEffect } from 'react';
import { initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import {getDatabase, ref, set, update} from 'firebase/database';
import { UserContext } from './UserForm';
import "firebase/firestore";
import { doc, setDoc, addDoc } from "firebase/firestore";


/**This component allows me to add data to both a realtime DB and a cloud firestore DB using
 * Google firebase
 */

const FirebaseFunction=()=>{

  //get state from UserContext
    const state = useContext(UserContext);
    const myStateValue={...state}
    
    //firebase config details:
    const firebaseConfig = {/*API key etc goes here*/};

    //initialize databases - here I have set up a realtime DB and a cloud firestore DB
    const app = initializeApp(firebaseConfig);
    let database = getDatabase(app);
    const db = getFirestore(app);
    
    //add data to firestore
    const setUser = async(db) =>{
    
    if(state.firstName!==''&&state.lastName!==''&&state.userId!=='') await addDoc(collection(db, "Users"), myStateValue);
    };

  setUser(db);


  
const newPostKey = Date.now();
const updates = {};

//send data to realtime DB
const writeData =()=>{
updates['/users/' + newPostKey]=state;
useEffect=(()=>{
  updates['/user-posts/' + newPostKey] = state;
},[]);
if(state.firstName!==''&&state.lastName!==''&&state.userId!=='')
return update(ref(database), updates);
};
writeData();
    return (
       <></>
    )
}
export default FirebaseFunction;
