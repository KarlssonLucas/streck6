import "../css/personal.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const PersonalInfoComponent = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        getUser();
    },[])

    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/users/"+props.id, requestOptions).then((response : any) => response.json()).then((response) => {
            setUser(response);
         });
    }

    return (
        <div className="personalMain">
            <div className="personalContainer">
                {console.log(user)}
            </div>
        </div>
    )
}

export default PersonalInfoComponent;
