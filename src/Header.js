import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserForm";

const Header = ()=>{


    return (

        
        <div className="header-div">
            <h1 className="header">My Firebase User Database</h1>
            <p>Fetch api component, see photo on phone!!</p>
        </div>
    )
};

export default Header;