import React from 'react';
import UserDetailPage from './pages/UserDetailPage';
import AvatarPage from './pages/AvatarPage';
import { BrowserRouter , Redirect, Route, Switch } from 'react-router-dom';
import "./css/mainpage.css";

export default class Strecklista extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }

    render() {
        return (

    <BrowserRouter forceRefresh={true}>
    <div>
        <Switch>
          <Route exact path="/" component={AvatarPage} />
          <Route path="/user/:id" render={(props) => <UserDetailPage {...props} />} />
        </Switch>
    </div>
  </BrowserRouter>

        )
    };
}