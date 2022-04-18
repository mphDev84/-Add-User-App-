import React from 'react';
import { useState, useContext, createContext, useMemo, useEffect, useRef } from 'react';
import DisplayUserInfo from './DisplayUserInfo';
import FirebaseFunction from './FirebaseFunction';

//create a useContext variable
export const UserContext = createContext();


const UserForm =()=>{

    const populateDataFunction = (e)=>{

        e.preventDefault(); 
        //create regular expressions to test against user input
        const myRegexFirstName = /^[a-z]+([\ A-Za-z]+)*$/gi;
        const myRegexLastName = /^[a-z]+$/gi;
        const myRegexUserId = /^[A-Z]\d\d\d$/gi;

        //assign user input to variables
        const firstNameValue = inputRef.current.value;
        const lastNameValue = lastNameRef.current.value;
        const userIdValue = userIdRef.current.value

        //use regex to validate user input using .test()
        if(myRegexFirstName.test(firstNameValue)){
        setFirstName(firstNameValue)
        alert("User added to Database!");}
        else{alert("Enter a valid first name")};


        if(myRegexLastName.test(lastNameValue)){
        setLastName(lastNameValue);}
        else{alert("Enter a valid last name")};

        if(myRegexUserId.test(userIdValue)){
        setUserId(userIdValue);}
        else{alert("Enter a valid user ID")};

        console.log(firstNameValue)
        e.currentTarget.reset();

    };
    //create refs so user input can be retrieved from form
    const inputRef= useRef();
    const lastNameRef= useRef();
    const userIdRef= useRef();

    //create local state variables to store user input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]= useState('');
    const[userId, setUserId]=useState('');

    //create a Context.Provider value to pass state to child components
    const providerValue = useMemo(() => ({
        firstName,
        lastName,
        userId,
    }), [firstName, lastName, userId]);

    return (
        <UserContext.Provider  value={providerValue}>
        <div className='form-div'>
             <form className='user-form' onSubmit={populateDataFunction}>
                <span className='form-span'>First Name: </span><input className='input' type="text" name="firstName" ref={inputRef} placeholder='enter your first name'/><br></br>
                <span className='form-span'>Last Name: </span><input className='input' type="text" ref={lastNameRef} placeholder='enter your last name'  /><br></br>
                <span className='form-span'>UserId: </span><input className='input' type="text" ref={userIdRef} placeholder='enter your user ID'  /><br></br>
                <button className='user-form-submit-button' type="submit" value="submit">Submit</button>
            </form>
        </div>
        <DisplayUserInfo />
        <FirebaseFunction />
        </UserContext.Provider>
    )

};

export default UserForm;
