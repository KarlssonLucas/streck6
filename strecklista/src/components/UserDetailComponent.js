import "../css/user-detail.css";
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StreckComponent from "./StreckComponent";
import HistoryComponent from "./HistoryComponent";
import PayComponent from "./PayComponent";
import { Drawer, Divider, IconButton } 
    from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } 
    from '@material-ui/core';
import PermContactCalendarIcon from 
    '@material-ui/icons/PermContactCalendar';
import ReorderIcon from '@material-ui/icons/Reorder';
import AccountCircleIcon from 
    '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const UserDetailComponent = (props) => {
    const [isDrawer, setIsDrawer] = useState(false);

    var classNames = require('classnames');
    const location = useLocation()
    const [skuld, setSkuld] = useState([]);
    const [sumStreck, setSumstreck] = useState([]);
    const [user, setUser] = useState([]);
    const [view, setView] = useState('streck');
    const userId = /[^/]*$/.exec(location.pathname)[0];

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

    var skuldClasses = classNames({
        'div4': true,
        'clicked': view === 'skuld',
        'unclicked': view !== 'skuld'
    });

    var historikClasses = classNames({
        'div5': true,
        'clicked': view === 'historik',
        'unclicked': view !== 'historik'
    });

    var streckClasses = classNames({
        'div6': true,
        'clicked': view === 'streck',
        'unclicked': view !== 'streck'
    });

    const skuldPay = skuld.map((s) => s.pay);

    return (
        <div className="user">
            <div className="div1">
                {user.map((u) => {return u.login})}
            </div>
            <div className="div2">
                Balance: <div className={skuldPay<0 ? "negative" : "positive"}> {skuldPay} </div> 
            </div>
            <div className="div3">
                Totstreckat: {sumStreck.map((s) => {return (s.sum == parseInt(s.sum)) ? parseInt(s.sum) : s.sum })}
            </div>
            <div className="buttons">
                <div className={skuldClasses} onClick={ () => setView('skuld')}> betala skuld </div>
                <div className={historikClasses} onClick={ () => setView('historik')}> historik </div>
                <div className={streckClasses} onClick={ () => setView('streck')}> strecka </div>
            </div>
            <div className="div7">
                {view === 'streck' && <StreckComponent id={userId}/>}  
                {view === 'skuld' && <PayComponent id={userId}/>}
                {view === 'historik' && <HistoryComponent id={userId} />}
            </div>

            <div>
         <div>
            <IconButton onClick={() => setIsDrawer(true)}>
              {!isDrawer ? <ReorderIcon /> : null }
            </IconButton>
          </div>
          <Divider/>
        <Drawer
          variant="temporary"
          open={isDrawer}
          onClose={() => setIsDrawer(false)}
        >
          <Link to='/about'>
            <List>
              <ListItem button key='About Us'>
                <ListItemIcon><AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary='About Us' />
              </ListItem>
            </List>
          </Link>
          <Link to='/contact'>
          <List>
            <ListItem button key='Contact Us'>
              <ListItemIcon><PermContactCalendarIcon/>
              </ListItemIcon>
              <ListItemText primary='Contact Us' />
            </ListItem>
            </List>
          </Link>
        </Drawer>
      </div>

        </div>
    )
}

export default UserDetailComponent;
