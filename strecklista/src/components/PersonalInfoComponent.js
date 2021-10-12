import "../css/personal.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

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

const useLoginHook = (formValues) => {
    const [values, handleChange] = useState(formValues);
  
    return [values, e => {
      handleChange({
        ...values,
        [e.target.name]: e.target.value
      });
    }];
  };
  

const PersonalInfoComponent = (props) => {
    const [user, setUser] = useState([]);
    const [credentials, setCredentials] = useLoginHook({
        oldpass: "",
        newpass: ""
    });
    const classes = styles();

    const updatePassword = async () => {
        console.log(parseInt(user.map((u) => {return u.id})))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        };

        await fetch("/api/updatepassword/"+user.map((u) => {return u.id}), requestOptions).then(response => response.json()).then(response => {
            console.log(response)
            if (response === true) {
                window.location.reload();
          }
            else {
                alert('Fel lösenord')
            }
          })
    }

    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        await fetch("/api/users/"+props.id, requestOptions).then((response : any) => response.json()).then((response) => {
            setUser(response);
         });
    }

    const updateCheck = (e) => {
        if (e.key === 'Enter') {
            updatePassword();
        }
    }

    useEffect(() => {
        getUser();

        return () => {
            setUser();
        }
    },[])

    return (
        <div className="personalMain">
            <div className="personalContainer">
                <ThemeProvider theme={theme}>
                <Stack spacing={2}>
                    <TextField 
                    className={classes.customOutline}
                    InputLabelProps={{style: { color: '#45a29e' },}} 
                    InputProps={{style: {color: "white"}}} 
                    id="username" 
                    color="primary" 
                    name="login" 
                    type="text"         
                    onChange={setCredentials} 
                    onKeyDown={(e) => updateCheck(e)} 
                    label="Username" 
                    variant="outlined" />

                    <TextField 
                    className={classes.customOutline}
                    InputLabelProps={{style: { color: '#45a29e' },}} 
                    InputProps={{style: {color: "white"}}} 
                    id="username" 
                    color="primary" 
                    name="login" 
                    type="text"         
                    onChange={setCredentials} 
                    onKeyDown={(e) => updateCheck(e)} 
                    label="Username" 
                    variant="outlined" />



                <TextField
                    disabled
                    InputLabelProps={{style: { color: '#242526'},}} 
                    InputProps={{style: {color: "white"}}}
                    className="loginPersonal"
                    label="Login"
                    id="filled-size-small"
                    value={user.map((u) => {return u.login})}
                    size="small"
                />
                <TextField
                    InputLabelProps={{style: { color: '#45a29e' },}} 
                    InputProps={{style: {color: "white"}}}
                    className="loginPersonal"                
                    label="Old Password"
                    id="filled-size-small"
                    defaultValue=""
                    size="small"
                    name="oldpass"
                    type="password"
                    onChange={setCredentials}
                    onKeyDown={(e) => updateCheck(e)}
                />
                <TextField
                    InputLabelProps={{style: { color: '#45a29e' },}} 
                    InputProps={{style: {color: "white"}}}
                    className="loginPersonal"               
                    label="New Password"
                    id="filled-size-small"
                    defaultValue=""
                    type="password"
                    name="newpass"
                    size="small"
                    onChange={setCredentials}
                    onKeyDown={(e) => updateCheck(e)}
                />
                <Button onClick={() => updatePassword()} className="updatePersonal" variant="outlined">Uppdatera information</Button>
                </Stack>            
                </ThemeProvider>
            </div>
        </div>
    )
}

export default PersonalInfoComponent;
