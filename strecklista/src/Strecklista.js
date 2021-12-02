import React from 'react';
import UserDetailPage from './pages/UserDetailPage';
import { BrowserRouter , Redirect, Route} from 'react-router-dom';
import "./css/mainpage.css";
import LoginPage from './pages/LoginPage';

// High order component
export default class Strecklista extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loggedIn: false, userid: 0 }
    }

    // If the page mounts it fetches the users session and checks if you're logged in or not
    componentDidMount() {
        fetch("/api/session").then(response => response.json()).then(response => {
            if (response.login !== true) {
                console.log("NOT LOGGED IN")
            }
            else {
                console.log("LOGGED IN")
                this.setState({ loggedIn: true, userid: response.id })
            }
        });
    }

    render() {
        return (
            <BrowserRouter forceRefresh={false}>
            <div className="bodypage">
                {this.state.loggedIn ? 
                <div>
                <div className="aaa">
                    <Redirect to={"/user/"+this.state.userid}/>
                    <Route exact path={"/user/"+this.state.userid} render={(props) => <UserDetailPage {...props} />} />
                </div>
                </div>
                : <LoginPage/>}
                        </div>
            </BrowserRouter>
        )
    };
}
