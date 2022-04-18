import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserForm";

const DisplayFireData = (data)=>{

  
    let fireData = data;
    console.log(fireData)

    console.log(data)

   console.log(fireData[0])
    return  ( 
        <div>
        {fireData}
        </div>
);
};

export default DisplayFireData;