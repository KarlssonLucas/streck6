import "../css/streckcomponent.css";
import StreckItem from './StreckItemComponent';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const StreckComponent = (props) => {
    const [items, setItems] = useState([]);
    
const fetchItems = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };

    await fetch("/api/items/", requestOptions).then((response : any) => response.json()).then((response) => {
            setItems(response);
    });
}

useEffect(() => {
    fetchItems();

    return () => {
        setItems();
    }
}, []);

    return (
        <div className="liststreck">
            {items.map(i => (
                i.id===99 ? "" : <StreckItem user={props.id} id={i.id} name={i.name} pris={i.pris} key={i.id} logParent={props.logParent} alertPurchase={props.alertPurchase}/>
            ))}
        </div>
    )
}

export default StreckComponent;
