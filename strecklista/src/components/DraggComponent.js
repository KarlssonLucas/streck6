import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DraggComponent = (props) => {
    const [draggs, setDraggs] = useState([]);
    
const fetchItems = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };

    await fetch("/api/tot", requestOptions).then((response : any) => response.json()).then((response) => {
            setDraggs(response);
    });
}

useEffect(() => {
    fetchItems();
}, []);

    return (
        <div className="">
            {draggs.map(i => ( <p key={i.id}> {i.login}: {i.sum} </p> ))}
        </div>
    )
}

export default DraggComponent;
