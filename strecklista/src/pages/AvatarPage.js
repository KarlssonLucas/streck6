import React, { useState, useEffect } from 'react';
import UserList from '../components/AvatarComponent';
import UserDetailComponent from '../components/UserDetailComponent';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import "../css/mainpage.css";

export default class AvatarPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {'data': []}
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch("/api/users", requestOptions).then((response : any)        =>         response.json()).then((response) => {
            this.setState({data: response})
        });
    }

    render() {
        
        return (
            <BrowserRouter>
                <div className="">
                    <div className="">
                        {this.state.data.map(el => (
                            <UserList name={el.login} id={el.id}/>
                        ))}
                        <div className="topstreck" onClick = {() => window.location.href="/dragg"}> Drägglista</div>
                    </div>
                </div>
            </BrowserRouter>)
    };
}
