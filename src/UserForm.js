import React from 'react';
import { useState, useContext, createContext, useMemo, useEffect, useRef } from 'react';
import DisplayUserInfo from './DisplayUserInfo';
import FirebaseFunction from './FirebaseFunction';

export const UserContext = createContext();

const UserForm =()=>{

    const populateDataFunction = (e)=>{

        e.preventDefault(); 
        setFirstName(inputRef.current.value);
        setLastName(lastNameRef.current.value);
        setUserId(userIdRef.current.value)

        console.log(inputRef.current.value)
        e.currentTarget.reset();

    };

    const inputRef= useRef();
    const lastNameRef= useRef();
    const userIdRef= useRef();
    

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName]= useState('');
    const[userId, setUserId]=useState('');

    const providerValue = useMemo(() => ({
        firstName,
        lastName,
        userId,
    }), [firstName, lastName, userId]);

    return (
        <UserContext.Provider  value={providerValue}>
        <div className='form-div'>
             <form className='user-form' onSubmit={populateDataFunction}>
                <span>First Name: </span><input type="text" name="firstName" ref={inputRef} placeholder='enter your first name'/><br></br>
                <span>Last Name: </span><input type="text" ref={lastNameRef} placeholder='enter your last name'  /><br></br>
                <span>UserId: </span><input type="text" ref={userIdRef} placeholder='enter your user ID'  /><br></br>
                <button type="submit" value="submit">Submit</button>
            </form>
        </div>
        <DisplayUserInfo />
        <FirebaseFunction />
        </UserContext.Provider>
    )

};

export default UserForm;

/**
    useEffect(()=>{
      const dataFromStorage = localStorage.getItem("my-data");
      if(dataFromStorage){
          setFirstName(JSON.parse(firstName))
      }
  },[setFirstName]);
  
    useEffect(()=>{
      localStorage.setItem("my-data", JSON.stringify(firstName))
  },[firstName]); */




  /**        <UserContext.Provider  value={providerValue}>
        <div className='form-div'>
             {!showPreview && <form className='user-form' onSubmit={mySubmitFunction}>
                <span>First Name: </span><input type="text" name="firstName" ref={inputRef} placeholder='enter your first name'/><br></br>
                <span>Last Name: </span><input type="text" placeholder='enter your last name' onChange={e => setLastName(e.target.value)} /><br></br>
                <span>UserId: </span><input type="text" placeholder='enter your user ID' onChange={e => setUserId(e.target.value)} /><br></br>
                <input type="submit" value="submit" onClick={myFunc} />
            </form>}
            {showPreview && (<div>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{userId}</p>
      </div>)}
        </div>
        <DisplayUserInfo />
        <FirebaseFunction />
        </UserContext.Provider> */