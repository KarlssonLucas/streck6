import React from 'react';
import UserDetailPage from './pages/UserDetailPage';
import AvatarPage from './pages/AvatarPage';
import Dragg from './components/DraggComponent';
import { BrowserRouter , Redirect, Route, Switch} from 'react-router-dom';
import "./css/mainpage.css";

export default class Strecklista extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }

    render() {
        return (

    <BrowserRouter>
        <div className="aaa">
            <Route exact path="/" render={(props) => <AvatarPage {...props}/>}/>
            <Route exact path="/user/:id" render={(props) => <UserDetailPage {...props} />} />
            <Route exact path="/dragg" render={(props) => <Dragg {...props} />} />
        </div>
  </BrowserRouter>

        )
    };
}
