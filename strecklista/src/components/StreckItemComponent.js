import "../css/streckitemcomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StreckItemComponent = (props) => {
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(1);

    const streckInsert = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/strecka/"+props.user +"/"+props.id+"/"+amount, requestOptions).then((response : any) => response.json()).then((response) => {
            console.log("done");
            window.location.reload(false);
        });
    }
   
    return (
        <div className="item">
                <div className="streckaItem"> 
                        <div className="subtract" onClick= {() => amount<2 ? true : setAmount(amount-1)}> - </div>
                        <input type="text" className="inputfield" readOnly={true} value={amount}/>
                        <div className="addition" onClick= {() => setAmount(amount+1)}> + </div>
                </div>
                <div className="name"> {props.name} </div>
                <div className="pris"> {props.pris} kr </div>
                <div className="checkout" onClick = {() => streckInsert()} > Buy </div>
        </div>
    )
}

export default StreckItemComponent;
