import "../css/user-detail.css";
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StreckComponent from "./StreckComponent";
import HistoryComponent from "./HistoryComponent";
import PayComponent from "./PayComponent";
import PersonalComponent from "./PersonalInfoComponent";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#45a29e',
    },
    secondary: {
      main: '#66fcf1',
    },
  },
});

const styles = makeStyles({
  root: {
    color: "#45a29e",
  },
  icon: {
    width: 100,
    height: 100,
    padding: 10
  },
  paper: {
    background: "#303945"
  }
});

const UserDetailComponent = (props) => {
    const [isDrawer, setIsDrawer] = useState(false);
    const classes = styles();
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
    
    const history = useHistory();

    const logout = async () => {
      await fetch("/api/logout").then((response : any) => response.json()).then((response) => { 
      });   
        window.location.reload()
    }

    const skuldPay = skuld.map((s) => s.pay);

    const drawerClick = (v) => {
        setView(v);
        setIsDrawer(false);
    }

    return (
      <div>
        <div>
        <ThemeProvider theme={theme}>
            <div>
            <p className="header">streck6</p>

              <IconButton className={classes.icon} className={classes.root} onClick={() => setIsDrawer(true)} color="secondary">
                <ReorderIcon fontSize="large"/>
              </IconButton>
            </div>
            <Drawer
              variant="temporary"
              open={isDrawer}
              onClose={() => setIsDrawer(false)}
              classes={{ paper: classes.paper }}
            >
              <div onClick = {() => drawerClick('streck')}>
              <List>
                <ListItem button key='Strecka'>
                  <ListItemIcon><AccountCircleIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Strecka' />
                </ListItem>
              </List>
              </div>
              <div onClick = {() => drawerClick('historik')}>
              <List>
                  <ListItem button key='Historik'>
                  <ListItemIcon><PermContactCalendarIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Historik' />
                </ListItem>
              </List>
              </div>
              <div onClick = {() => drawerClick('skuld')}>
              <List>
                  <ListItem button key='Inbetalning'>
                  <ListItemIcon><PermContactCalendarIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Inbetalning' />
                </ListItem>
              </List>
              </div>
            <div className="testest" onClick={() => logout()}>
              <Link to='/' replace>
              <List>
                  <ListItem button key='Logga ut'>
                  <ListItemIcon><PermContactCalendarIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Logga ut' />
                </ListItem>
              </List>
              </Link>
            </div>
          </Drawer>
          </ThemeProvider>

        </div>
        {view === 'historik' && <PersonalComponent id={userId}/>}
        <div className="div7">
                {view === 'streck' && <StreckComponent id={userId}/>}  
                {view === 'skuld' && <PayComponent id={userId}/>}
                {view === 'historik' && <HistoryComponent id={userId} />}
            </div>
        </div>
    )
}
/*<div className="user">
          
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
            </div>*/
export default UserDetailComponent;
