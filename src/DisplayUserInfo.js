import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useState } from "react";
import { initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import "firebase/firestore";
import DisplayFireData from "./DisplayFireData";
import { UserContext, UserDataContext } from "./UserForm";


let dataHasBeenFetched=0;

const DisplayUserInfo=()=>{ 

  const [myStateData, setMyStateData]= useState(null)   
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

    //get data from firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

 
  
    const getUser = async (db)=> {
        const usersCollection = collection(db, 'Users');
        const usersSnapShot = await (getDocs(usersCollection));
        const userList =  usersSnapShot.docs.map(doc => doc.data());
      
        console.log(userList);
        
        const myData = userList.map(key=><p className="user-data">{key.firstName+" " + "User Id: "+key.userId+""+", "+" "}</p>);
        let myNewData = JSON.stringify(myData);
         DisplayFireData(myData);
        console.log(myData)

        dataHasBeenFetched++;
        console.log(dataHasBeenFetched)
        setStateFunction(myData, dataHasBeenFetched);
    
        console.log(myStateData);
        return myData;
      
        };

getUser(db);

const setStateFunction=(d, data)=>{
if(data===1){
setMyStateData(d);
}}


//const myMapState = myStateData.map(x=>x);

return (

  <React.Fragment> <button>Get User Data</button>

  <div className="display-user-data">{myStateData}

  </div>
  
  </React.Fragment>
 
)

};

export default DisplayUserInfo;
