import "../css/streckitemcomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StreckItemComponent = (props) => {
    const [items, setItems] = useState([]);
    
    return (
        <div className="item">
                <div className="name"> {props.name} </div>
                <div className="pris"> {props.pris} </div>
                <div className=""> </div>
        </div>
    )
}

export default StreckItemComponent;
