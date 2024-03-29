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
        justifyContent: "center",
        bottom: "100px"
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
    const [item, setItem] = useLoginHook({
        createName: "",
        createPris: "",
        createUnits: ""
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
                alert('Användarens credentials är uppdaterade')
          }
            else {
                alert('Öhh oogabooga någonting gick fel, försök igen eller säg till kakan')
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
                alert('Användare skapad')
          }
            else {
                alert('Öhh oogabooga någonting gick fel, försök igen eller säg till kakan')
              }
          })
    }

    const createItem = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };

        console.log("hej")

        await fetch("/api/createitem", requestOptions).then(response => response.json()).then(response => {
            console.log(response)
            if (response === true) {
                window.location.reload();
                alert('Nytt item är tillagt')
          }
            else {
                alert('Öhh oogabooga någonting gick fel, försök igen eller säg till kakan')
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
                    <input name="newuser" type="text" id="newuser" placeholder="Nytt avnändarnamn" onChange={setCredentials}></input>
                    <input name="newpass" type="text" id="newpass" placeholder="Nytt lösenord" onChange={setCredentials}></input>
                </Stack>
                <button className="adminButton" onClick={() => updateUser()}>UPDATE</button>
                <p> Välj användare att redigera nedanför, den som highlightas i rött är den du ändrar på </p>
            </div>
            {users.map(u => (
                <div id={u.id} key={u.id} className="adminContent" onClick={() => selected(u.id)}>
                    <p>{u.login}</p>
                </div>
            ))}

            <div className="adminFooter">
                <Stack direction="row" className={classes.stack}>
                    <input name="createuser" type="text" id="createuser" placeholder="Avnändarnamn" onChange={setCredentials}></input>
                    <input name="createpass" type="text" id="createpass" placeholder="Lösenord" onChange={setCredentials}></input>
                </Stack>
                <button className="adminButton" onClick={() => createUser()}>SKAPA ANVÄNDARE</button>
            </div>

            <div className="adminFooter">
                <Stack direction="column" className={classes.stack}>
                    <Stack direction="row" className={classes.stack}>
                        <input name="createPris" type="number" id="createPris" placeholder="Pris" onChange={setItem}></input>
                        <input name="createUnits" type="number" id="createUnits" placeholder="Antal standardenheter" onChange={setItem}></input>
                    </Stack>
                    <Stack direction="row" className={classes.stack}>
                        <input name="createName" type="text" id="createName" placeholder="Namn" onChange={setItem}></input>
                    </Stack>
                </Stack>
                <button className="adminButton" onClick={() => createItem()}>LÄGG TILL ITEM</button>
            </div>

        </div>
    )
}

export default AdminComponent;
