import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useState } from "react";
import { initializeApp} from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import "firebase/firestore";
import GetFirebaseRealtime from "./GetFirebaseRealtime";
import SearchDatabase from "./SearchDatabase";

const DisplayUserInfo=()=>{ 

  //declare local state variables
  const [myStateData, setMyStateData]= useState(null) 
  const [mySearchData, setMySearchData]= useState(null) 
  const [mySearchDataLength, setMySearchDataLength]= useState(null) 
       //firebase config details:
       const firebaseConfig = {/*API key etc goes here*/};

    //get data from firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

 
    const handleClick=()=>{
    //variable to store 'component render counter' 
    let dataHasBeenFetched=0;
    
    //get user data from firestore DB
    const getUser = async (db)=> {
        const usersCollection = collection(db, 'Users');
        const usersSnapShot = await (getDocs(usersCollection));
        const userList = await usersSnapShot.docs.map(doc => doc.data());
      
        console.log(userList);
        //use .map() to extract data from returned DB data
        const myData = userList.map(key=>
        <li key={key.userId} className="user-data">
        {key.firstName+" "+key.lastName+" - " + "User Id: "+key.userId+""+" "}
        </li>);
        console.log(myData)

        dataHasBeenFetched++;
        console.log(dataHasBeenFetched);
        //get a randomly generated number so we can display a user at random array indexes 
        let myRandomNumber = Math.floor(Math.random() * (((myData.length-1) - 0 + 1))+0);
        console.log(myRandomNumber)
        setStateFunction(myData[myRandomNumber], dataHasBeenFetched);
        setMySearchData(userList);
        setMySearchDataLength(myData.length)
          // [myRandomNumber]
        console.log(myStateData);
        return myData;
      
        };

getUser(db);

//function to set data to STATE
const setStateFunction=(data, dataNumValue)=>{
if(dataNumValue===1){
setMyStateData(data);//set state
setDataVisible();//call function to display DB data
console.log("data fetched!")
}
else {
  console.log("data has already been fetched")
}};

};//end of handleClick function

//function to set DB data to visible 
const setDataVisible = ()=>{
document.querySelector("#database-loaded-header").style.visibility="visible";
document.querySelector("#search-div").style.visibility="visible";
document.querySelector(".user-data-header").style.visibility="visible";
document.querySelector(".arrow-image").style.visibility="visible";
}
//function to refresh page
const windowRefresh=()=>{
  return window.location.reload();
};
return (

  <React.Fragment> 

  <div className="random-user-div">
  <div className="buttons-div">
  <button className="random-user-button" onClick={handleClick}>Load Database</button>
  <button className="refresh-button" onClick={windowRefresh}>Refresh Page</button>
</div>
  <div className="random-user">
  <h3 className="user-data-header">Random user from Firestore Database:</h3>
  <div className="display-user-data">{myStateData}</div>
</div>
  </div>

 <div id="search-div">
 <h2 id="database-loaded-header" className="database-loaded-header">Database Loaded!! - Number of docs in DB: {mySearchDataLength}</h2><br></br>
  <p className="find-a-user">Find a user:</p>
  <div className="arrow-div">
  <p><img className="arrow-image" src="https://img.icons8.com/nolan/64/down-arrow.png"></img></p>
  <p><img className="arrow-image" src="https://img.icons8.com/nolan/64/down-arrow.png"></img></p>
 </div>
 <SearchDatabase data={mySearchData} />
 {/*<GetFirebaseRealtime />*/}
 </div>
  </React.Fragment>
 
)

};

export default DisplayUserInfo;
