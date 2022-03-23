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
    console.log(state)
    
    //firebase config details:
    const firebaseConfig = {
      apiKey: "AIzaSyBC0hatdsNgXqM2wY3QwjAirWcu_0gtp2g",
      authDomain: "my-music-app-8c87c.firebaseapp.com",
      databaseURL: "https://my-music-app-8c87c-default-rtdb.firebaseio.com",
      projectId: "my-music-app-8c87c",
      storageBucket: "my-music-app-8c87c.appspot.com",
      messagingSenderId: "719044468019",
      appId: "1:719044468019:web:56c837464ac8a545cbf246",
      measurementId: "G-YYT4QP7D1W"
    };

    //initialize databases - here I have set up a realtime DB and a cloud firestore DB
    const app = initializeApp(firebaseConfig);
    let database = getDatabase(app);
    const db = getFirestore(app);
    
      //add data to firestore
    async function setUser(db) {
    console.log(state)
  if(state.firstName!==''&&state.lastName!==''&&state.userId!=='') await addDoc(collection(db, "Users"), myStateValue);

  };

  setUser(db);

    //get data from firestore
  async function getUser(db) {
      const usersCollection = collection(db, 'Users');
      const usersSnapShot = await getDocs(usersCollection);
      const userList = usersSnapShot.docs.map(doc => doc.data());
      console.log(userList);
     return (userList)
  };
  
  getUser(db);

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