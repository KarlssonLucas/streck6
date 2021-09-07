import "../css/user-detail.css";
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StreckComponent from "./StreckComponent";

const UserDetailComponent = (props) => {

    const location = useLocation()
    const [skuld, setSkuld] = useState([]);
    const [sumStreck, setSumstreck] = useState([]);
    const [user, setUser] = useState([]);
    const [view, setView] = useState('streck');
    const userId = /[^/]*$/.exec(location.pathname)[0] ;

    const fetchSkuld = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/skuld/"+userId, requestOptions).then((response : any) => response.json()).then((response) => {
        setSkuld(response);
        });

        await fetch("/api/totstreck/"+userId, requestOptions).then((response : any) => response.json()).then((response) => {
        setSumstreck(response);
        });

        await fetch("/api/users/"+userId, requestOptions).then((response : any) => response.json()).then((response) => {
        setUser(response);
        });   

    }

    useEffect(() => {
        fetchSkuld();
        console.log(props.id)
            }, []);

    return (
        <div className="user">
            <div className="div1">
                {user.map((u) => {return u.login})}
            </div>
            <div className="div2">
                Balance: {skuld.map((s) => { return s.pay} )} 
            </div>
            <div className="div3">
                Totstreckat: {sumStreck.map((s) => {return s.sum})}
            </div>
                <div className="div4">
                    <button className="button" onClick={ () => setView('skuld')}> Betala skuld </button>
                </div>
                <div className="div5">
                    <button className="button" onClick={ () => setView('historik')}> Historik </button>
                </div>
                <div className="div6">
                    <button className="button" onClick={ () => setView('streck')}> Strecka </button>
                </div>

            <div className="div7">
                {view === 'streck' && <StreckComponent />}  
                {view === 'skuld' && "he"}
                {view === 'historik' && "hej"}
            </div>

        </div>
    )
}

export default UserDetailComponent;
