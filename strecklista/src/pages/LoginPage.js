import fetch from "node-fetch";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import "../css/loginpage.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles'

// Materials UI Styling
const styles = makeStyles({
  root: {
    color: "#45a29e"
  },
  input: {
    color: '#66fcf1'
  },
  customOutline: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#45a29e",
    },
    '&:hover:not($disabled):before': {
      borderColor: '#45a29e',
    },

  }
});

// Materials UI Styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#45a29e',
    },
    secondary: {
      main: '#45a29e',
    },
  },
});

// Login hook, updates with the textfields and submits on enter or login button
const useLoginHook = (formValues) => {
  const [values, handleChange] = useState(formValues);

  return [values, e => {
    handleChange({
      ...values,
      [e.target.name]: e.target.value
    });
  }];
};

// Function-based component
const LoginPage = (props) => {
  
  const [errorLogin, setErrorLogin] = useState(false);
  const classes = styles();
  const [loggedIn, setLoggedIn] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [correctCredentials, setCorrectCredentials] = useState(false);
  
  const [credentials, setCredentials] = useLoginHook({
    login: "null",
    password: null
  });

  // For redirecting and page loading
  const history = useHistory();

  // If the state is updated fetch information, doesn't depend on a specific state
  useEffect(() => {
    if (props.logout === true) {
      fetch("/api/logout").then(response => response.json()).then(response => {
        history.push('/')
        window.location.reload();
      })
    }
    else {
      fetch("/api/session").then(response => response.json()).then(response => {
        if (response.login === true) {
          setLoggedIn(true);
        }
      });
    }

    // Once you're done "unload" the states
    return () => {
      setLoggedIn();
      setWrongCredentials();
      setCorrectCredentials();
      setErrorLogin();
    }
  }, [])

  // Function for loggin in, gets information from loginhook
  const login = async () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    };

    console.log("SEND", requestOptions.body)

    await fetch("/api/login", requestOptions).then(response => response.json()).then(response => {
      if (response === true) {
        setWrongCredentials(false);
        setCorrectCredentials(true);
        setErrorLogin(false);
    }
      else {
        setWrongCredentials(true);
        setErrorLogin(true);
      }
    })
    window.location.reload();
  };

  // You can now press enter to login
  const loginForm = (e) => {
    if (e.key === 'Enter') {
      login()
    } 
  }

  return (
    <div className="loginpage">
        <form className="test">
            <div className="streck6">
                streck6
            </div>
            <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              {errorLogin ? <TextField error className={classes.customOutline} InputLabelProps={{style: { color: '#45a29e' },}} InputProps={{style: {color: "white"}}} id="username" color="primary" name="login" type="text" onChange={setCredentials} onKeyDown={(e) => loginForm(e)} label="Username" variant="outlined" /> : <TextField className={classes.customOutline} InputLabelProps={{style: { color: '#45a29e' },}} InputProps={{style: {color: "white"}}} id="username" color="primary" name="login" type="text" onChange={setCredentials} onKeyDown={(e) => loginForm(e)} label="Username" variant="outlined" /> }
              {errorLogin ? <TextField error className={classes.customOutline} InputLabelProps={{style: { color: '#45a29e' },}} InputProps={{style: {color: "white"}}} id="password" name="password" type="password" onChange={setCredentials} onKeyDown={(e) => loginForm(e)} label="Password" variant="outlined" /> : <TextField className={classes.customOutline} InputLabelProps={{style: { color: '#45a29e' },}} InputProps={{style: {color: "white"}}} id="password" name="password" type="password" onChange={setCredentials} onKeyDown={(e) => loginForm(e)} label="Password" variant="outlined" />}
              <Button color="primary" variant="outlined" onClick={() => login()}>Logga in</Button>
            </Stack>
            </ThemeProvider>
        </form>
    </div>
  
  )
};

export default LoginPage;
