import React from 'react';
import "../css/mainpage.css";
import UserDetailComponent from '../components/UserDetailComponent';

// Functional Component
export default class UserDetailPage extends React.Component {

    // Not my proudest component, no real use actually just adds another layer of divs xd
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
