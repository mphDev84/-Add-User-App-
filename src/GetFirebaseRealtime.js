import {React, useEffect, useState} from 'react';
import { initializeApp} from 'firebase/app';
import { getDatabase, ref, onValue, DataSnapshot, postElement} from "firebase/database";
import  {useAsync} from 'react-async';


const GetFirebaseRealtime = ()=>{

  let myKeyArray;
    
    let dataHasBeenFetched=0;
    const [myFirebaseData, setMyFirebaseData]= useState(null)   
    const [myFetchedData, setMyFetchedData]= useState(null)   
    
        //firebase config details:
        const firebaseConfig = {/*API key etc goes here*/};
      
          //initialize databases - here I have set up a realtime DB and a cloud firestore DB
          const app = initializeApp(firebaseConfig);
          let database = getDatabase(app);
   
      
        const starCountRef = ref(database, '/users/');

        const handleClick=()=>{ 
      
      
     onValue(starCountRef, (snapshot) =>  {

            let value = false;
             const data = snapshot.val();
             
            if (data) {value=true;
            console.log(data);
            setMyFirebaseData(data);
            setMyFetchedData(data);
            }
              //dataHasBeenFetched++;
      
        if (value===true){
          
          if(myFirebaseData){console.log("yes!")}
          dataHasBeenFetched=1;
     // (setFirebaseStateFunction(data, dataHasBeenFetched))
        }
        else{
          console.log("Nooooooooo")
        }
        return data;

      }); 

console.log(myFirebaseData);
const myStateData = {...myFirebaseData};
myKeyArray = Object.keys(myStateData)
console.log(myKeyArray);


}//end of handleClick function call

const myDisplayData = {...myFirebaseData};
console.log(myDisplayData)
const myDisplayArray = Object.keys(myDisplayData).map(key=>{
  <li key={key.userId} className="user-data">
  {key.firstName+" - " + "User Id: "+key.userId+""+" "}</li>
});

console.log(myFetchedData)
console.log(myDisplayArray)

return (
  <div>
  <button className="realtime-user-button" onClick={handleClick}>Display Realtime</button>
  
    <div><p>
    {Object.keys(myDisplayData)}
    </p></div>
   </div>
)


}
export default GetFirebaseRealtime;
