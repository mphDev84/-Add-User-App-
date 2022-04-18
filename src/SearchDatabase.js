import React from "react";
import { useState, useRef } from 'react';

const SearchDatabase =({data})=>{

//function is called once the form below is submitted 
  const populateDataFunction = (e)=>{

        e.preventDefault(); 
        //get user input
        const mySearchVal = userIdRef.current.value;
        //test against regex variable to determine validity 
        const  myRegex = ((/^[A-Z]\d\d\d$/gi).test(mySearchVal));
        console.log(myRegex);//test output 
        
        if(myRegex){
        setSearchUserId(mySearchVal);//set local state variable to user input value
        } else if(!myRegex){
            alert("Please enter a valid user ID")
            //console.log("this user ID is wack!")
        }
        e.currentTarget.reset();
        myAwaitFunc();//second function call, this time data will have been received

    };

    const userIdRef= useRef();

    //declare local state variables to handle user input values
    const[searchUserId, setSearchUserId]=useState('');
    const[displayValue, setDisplayValue]=useState('');

    console.log(searchUserId);//test output

    //function to take prop variable (data) passed down from parent component and pass to function to 
    //display said data 
    const myAwaitFunc = async()=>{
        
        const myData= await {...data}
        console.log(myData)
        const myValue = Object.keys(myData).map(x=>x[0]);//destructure JSON
        console.log(myValue)
        displayFunc(myData)//pass data to be displayed
        }
        
    myAwaitFunc();//first time this function is called - Null is returned since data hasn't been received.

    //function to display the use that has been searched for
    const displayFunc=(d)=>{
      
        const myArray = Object.keys(d);

        let matched = "";
        for(let i =0;i<myArray.length;i++){
        if (searchUserId===d[i].userId){
            matched=("Matched")
            setDisplayValue(d[i].lastName +", "+d[i].firstName);//set user input to local state variable
        }else {
            matched=("not matched!")
        };
        console.log(matched)

      }
    }
    return (
        <div className="display-user">
        <div className='form-div-two'>
             <form className='user-form' onSubmit={populateDataFunction}>
                 <span className='form-span'>UserId: </span><input className='input' type="text" ref={userIdRef} placeholder='try an Id between A001 and A013...'  />
                <button className="search-form-submit-button" type="submit" value="submit"><img className="magGlass" src="./searchMagGlass.png" /></button>
            </form>
            </div>
        <div className="user=name-div">
        <p id="user-name" className="user-data">User Name: {displayValue}</p></div>{/**random user is displayed */}
        </div>
    )
};

export default SearchDatabase;