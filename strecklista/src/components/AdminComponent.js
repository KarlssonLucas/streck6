import "../css/admin.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
  

const AdminComponent = (props) => {
    const [users, setUsers] = useState([]);
    const [credentials, setCredentials] = useLoginHook({
        newuser: "",
        newpass: "",
        createuser: "",
        createpass: ""
    });
    const [clickedUser, setClickedUser] = useState(-1);
    const classes = styles(); 

    const updateUser = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        };

        await fetch("/api/updateuser/"+clickedUser.toString(), requestOptions).then(response => response.json()).then(response => {
            console.log(response)
            if (response === true) {
                window.location.reload();
                alert('Anv??ndarens credentials ??r uppdaterade')
          }
            else {
                alert('??hh oogabooga n??gonting gick fel, f??rs??k igen eller s??g till kakan')
              }
          })
    }

    const createUser = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        };

        await fetch("/api/createuser", requestOptions).then(response => response.json()).then(response => {
            console.log(response)
            if (response === true) {
                window.location.reload();
                alert('Anv??ndare skapad')
          }
            else {
                alert('??hh oogabooga n??gonting gick fel, f??rs??k igen eller s??g till kakan')
              }
          })
    }

    const getUsers = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        await fetch("/api/users", requestOptions).then((response : any) => response.json()).then((response) => {
            setUsers(response);
         });
    }

    useEffect(() => {
        getUsers();

        return () => {
            setUsers();
        }
    },[])

    const selected = (u) => {
        clear();
        document.getElementById(u).style.backgroundColor = 'red';
        setClickedUser(u);
    }
    
    const clear = () => {
        if (clickedUser !== -1) {
            document.getElementById(clickedUser).style.backgroundColor = '';
        }
    }

    return (
        <div className="adminMain">
            <div className="adminHeader">
                <Stack direction="row" className={classes.stack}>
                    <input name="newuser" type="text" id="newuser" placeholder="Nytt avn??ndarnamn" onChange={setCredentials}></input>
                    <input name="newpass" type="text" id="newpass" placeholder="Nytt l??senord" onChange={setCredentials}></input>
                </Stack>
                <button className="adminButton" onClick={() => updateUser()}>UPDATE</button>
                <p> V??lj anv??ndare att redigera nedanf??r, den som highlightas i r??tt ??r den du ??ndrar p?? </p>
            </div>
            {users.map(u => (
                <div id={u.id} key={u.id} className="adminContent" onClick={() => selected(u.id)}>
                    <p>{u.login}</p>
                </div>
            ))}

            <div className="adminFooter">
                <Stack direction="row" className={classes.stack}>
                    <input name="createuser" type="text" id="createuser" placeholder="Avn??ndarnamn" onChange={setCredentials}></input>
                    <input name="createpass" type="text" id="createpass" placeholder="L??senord" onChange={setCredentials}></input>
                </Stack>
                <button className="adminButton" onClick={() => createUser()}>SKAPA ANV??NDARE</button>
            </div>

        </div>
    )
}

export default AdminComponent;
