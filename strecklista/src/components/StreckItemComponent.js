import "../css/streckitemcomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StreckItemComponent = (props) => {
    const [items, setItems] = useState([]);
    
    return (
        <div className="item">
                <div className="streckaItem"> 
                        <div className="subtract"> - </div>
                        <input type="text" className="inputfield" defaultValue="1"/>
                        <div className="addition"> + </div>
                </div>
                <div className="name"> {props.name} </div>
                <div className="pris"> {props.pris} kr </div>
                <div className="checkout"> Buy </div>
        </div>
    )
}

export default StreckItemComponent;
