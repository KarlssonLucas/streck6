import "../css/avatarpage.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AvatarComponent = (props) => {
    
    let history = useHistory();

    function handleRedirect () {
        history.push("/user/" + props.id);
        history.go();
    }

    return (
        <div className="avatar-page-content" onClick= {() => handleRedirect() }>
                <p className="avatar-text"> {props.name} </p>
        </div>
    )
}

export default AvatarComponent;
