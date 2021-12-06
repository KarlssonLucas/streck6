import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import "../css/mainpage.css";
import UserDetailComponent from '../components/UserDetailComponent';

export default class UserDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }

    render() {
        return (
            <div className="udp">
                <UserDetailComponent/>
            </div>
        )
    }
}
