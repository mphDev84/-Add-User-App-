import React, { useEffect, useContext } from "react";
import DisplayFetchData from './DisplayFetchData';
import { setStateData } from "./App";
import { UserContext } from "./App";

const MusicDataFetchComponent=()=>{

return (
    <div>
       <p>stuff</p>
       <DisplayFetchData />
    </div>
)
}


export default MusicDataFetchComponent;

/** 
https://theaudiodb.p.rapidapi.com/searchalbum.php?s=daft_punk

.then(json=>{
    console.log(json)
    console.log(json.album[0].strAlbum);
    DisplayFetchData(json.album[0]);
})

*/