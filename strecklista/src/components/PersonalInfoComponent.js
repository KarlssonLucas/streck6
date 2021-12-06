import "../css/personal.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';

// Materials UI Styling
const styles = makeStyles({
    stack: {
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },

    root: {
        width: '50%',
        alignItems: 'center',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: '0',
        right: '0',
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

    // Gets the password from the same loginhook as the loginpage, updates in backend
    const updatePassword = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        };

        await fetch("/api/updatepassword/"+user.map((u) => {return u.id}), requestOptions).then(response => response.json()).then(response => {
            console.log(response)
            if (response === true) {
                window.location.reload();
                alert('Ditt lösenord är uppdaterat')
          }
            else {
                alert('Fel lösenord')
              }
          })
    }

    // Fetches the user connected to the login
    const getUser = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        await fetch("/api/users/"+props.id, requestOptions).then((response : any) => response.json()).then((response) => {
            setUser(response);
         });
    }

    // Enables enter to update password
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
                <Stack spacing={2} className={classes.stack}>
                    <TextField 
                    className={classes.customOutline+' '+'testPersonal'}
                    InputLabelProps={{style: { color: '#45a29e' },}} 
                    InputProps={{style: {color: "white"}}} 
                    id="username" 
                    color="primary" 
                    name="oldpass" 
                    type="password"         
                    onChange={setCredentials} 
                    onKeyDown={(e) => updateCheck(e)} 
                    label="Old Password" 
                    variant="outlined" />
                    <TextField 
                    className={classes.customOutline+' '+'testPersonal'}
                    InputLabelProps={{style: { color: '#45a29e' },}} 
                    InputProps={{style: {color: "white"}}} 
                    id="username" 
                    color="primary" 
                    name="newpass" 
                    type="password"         
                    onChange={setCredentials} 
                    onKeyDown={(e) => updateCheck(e)} 
                    label="New Password" 
                    variant="outlined" />
                
        <Button style={{borderRadius: '3px', border: '1px solid', borderColor: 'limegreen', color: 'limegreen'}} onClick={() => updatePassword()} className={classes.input + ' ' +'updatePersonal'} variant="outlined">Uppdatera information</Button>

                </Stack>            
                </ThemeProvider>
            </div>
        </div>
    )
}

export default PersonalInfoComponent;
