import React, { useState, useEffect } from 'react';
import "../css/dragg.css";
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const DraggComponent = (props) => {
    const [draggs, setDraggs] = useState([]);
    var topl = 0;
    
const fetchItems = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };

    await fetch("/api/tot", requestOptions).then((response : any) => response.json()).then((response) => {
            setDraggs(response);
    });
}

const incTopl = () => {
    topl +=1;
}

useEffect(() => {
    fetchItems();
}, []);

    return (
        <div className="draggmain">
            {draggs.map(i => ( 
                <div key={i.id} className="content">
                    {incTopl()}
                    <p className="topl"> {topl}. </p> 
                    <div className="draggInd"> 
                        {i.login} <br /> 
                        Streckat: {i.sum - 0} <br /> 
                        Balance: {i.pay} 
                    </div> 
                    { (i !== draggs[draggs.length -1]) ? <hr className="linebreak"></hr> : ""}                
                </div>
            ))}
        </div>
    )
}

export default DraggComponent;
