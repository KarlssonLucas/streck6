import "../css/streckitemcomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StreckItemComponent = (props) => {
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(1);
   
    return (
        <div className="item">
                <div className="streckaItem"> 
                        <div className="subtract" onClick= {() => amount<2 ? true : setAmount(amount-1)}> - </div>
                        <input type="text" className="inputfield" readOnly={true} value={amount}/>
                        <div className="addition" onClick= {() => setAmount(amount+1)}> + </div>
                </div>
                <div className="name"> {props.name} </div>
                <div className="pris"> {props.pris} kr </div>
                <div className="checkout"> Buy </div>
        </div>
    )
}

export default StreckItemComponent;
