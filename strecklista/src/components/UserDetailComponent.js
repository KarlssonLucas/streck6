import "../css/user-detail.css";
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import StreckComponent from "./StreckComponent";
import HistoryComponent from "./HistoryComponent";
import PayComponent from "./PayComponent";
import PersonalInfo from "./PersonalInfoComponent";
import DraggComponent from "./DraggComponent";
import { Drawer, IconButton } 
    from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } 
    from '@material-ui/core';
import ReorderIcon from '@material-ui/icons/Reorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HistoryIcon from '@mui/icons-material/History';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import Divider from '@mui/material/Divider';

// Materials UI Styling
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

// Materials UI Styling
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

    // Fetch the debt collected by a user
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
        
        return () => {
          setSkuld();
          setSumstreck();
          setUser();
        }
    }, []);

    // function that runs from child component
    const logParent = () => {
      fetchSkuld();
    }
    
    // For redirection
    const history = useHistory();

    // Logout the user and destroy the cookie
    const logout = async () => {
      await fetch("/api/logout").then((response : any) => response.json()).then((response) => { 
      });   
        window.location.reload()
    }

    // For getting the current users debt
    const skuldPay = skuld.map((s) => s.pay);

    // Page drawer, basically the menu in the topleft corner
    const drawerClick = (v) => {
        setView(v);
        setIsDrawer(false);
    }

    return (
      <div>
        <div>
        <ThemeProvider theme={theme}>
            <div  className="head">
            <p className="header">streck6</p>

            <div className="wallet" onClick = {() => drawerClick('skuld')}> 
            <List>
                <ListItem button key='Strecka'>
                  <ListItemIcon style={{minWidth: '30px', color: 'white'}}><AccountBalanceWalletIcon/>
                  </ListItemIcon>
                  <ListItemText primary={skuldPay} />
                </ListItem>
              </List>
            </div>
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
              <div onClick = {() => drawerClick('you')}>
              <List>
                <ListItem button key='Du'>
                  <ListItemIcon><AccountCircleIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Du' />
                </ListItem>
              </List>
              </div>
              <Divider/>

              <div onClick = {() => drawerClick('streck')}>
              <List>
                  <ListItem button key='streck'>
                  <ListItemIcon><LocalBarIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Strecka' />
                </ListItem>
              </List>
              </div>
              <Divider/>
              <div onClick = {() => drawerClick('historik')}>
              <List>
                  <ListItem button key='historik'>
                  <ListItemIcon><HistoryIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Historik' />
                </ListItem>
              </List>
              </div>
              <Divider/>
              <div onClick = {() => drawerClick('dragg')}>
              <List>
                  <ListItem button key='Dragg'>
                  <ListItemIcon><FormatListNumberedIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Drägglista' />
                </ListItem>
              </List>
              </div>
              <Divider/>
              <div onClick = {() => drawerClick('skuld')}>
              <List>
                  <ListItem button key='inbetalning'>
                  <ListItemIcon><AttachMoneyIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Inbetalning' />
                </ListItem>
              </List>
              </div>
              <Divider/>
            <div className="testest" onClick={() => logout()}>
              <List>
                  <ListItem button key='Logga ut'>
                  <ListItemIcon><LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Logga ut' />
                </ListItem>
              </List>
            </div>
          </Drawer>
          </ThemeProvider>

        </div>
        {view === 'you' && <PersonalInfo id={userId}/>}
        <div className={view === 'you' ? '' : 'div7'}>
                {view === 'historik' && <HistoryComponent id={userId} logParent={logParent}/>}
                {view === 'streck' && <StreckComponent id={userId} logParent={logParent}/>}  
                {view === 'skuld' && <PayComponent id={userId} logParent={logParent}/>}
                {view === 'dragg' && <DraggComponent id={userId}/>}  
            </div>
        </div>
    )
}
export default UserDetailComponent;
