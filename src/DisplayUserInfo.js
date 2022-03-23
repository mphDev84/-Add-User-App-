import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserForm";


const DisplayUserInfo=()=>{


const providerValue = useContext(UserContext);
const myState  = {...providerValue};
const myDisplay = Object.keys(myState).map(key=>{
    console.log(key)
    return key;
})

console.log(myState)

return (
    <div>
       <p>Stuff: {myDisplay}</p> 
    </div>
)

};

export default DisplayUserInfo;
