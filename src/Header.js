import React from "react";

const Header = ()=>{


    return (

        
        <div className="header-div">
            <h1 className="header">My Firebase User Database</h1>
            <p className="app-info">This app takes user input (i.e. data enetered using the 'New User' form below) and stores 
            it in Google's Firestore database. The user can also search the database using the userID and have data
            associated with that user displayed</p><br></br>
            <p className="header-info">Enter a new user (Note: user ID takes the form "A000"):</p><br></br>
        </div>
    )
};

export default Header;