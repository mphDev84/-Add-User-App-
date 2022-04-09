import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useState } from "react";
import { initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import "firebase/firestore";
import DisplayFireData from "./DisplayFireData";
import { UserContext, UserDataContext } from "./UserForm";


let dataHasBeenFetched=0;

const DisplayUserInfo=()=>{ 
//state to store user data received from database
  const [myStateData, setMyStateData]= useState(null)   
       //firebase config details:
       const firebaseConfig = {api key etc goes here };

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
