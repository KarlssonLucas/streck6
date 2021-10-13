import React, { useState, useEffect } from 'react';
import "../css/inventory.css";
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@mui/material/TextField';

const styles = makeStyles({
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

const InventoryComponent = (props) => {
    const [amount, setAmount] = useState(0);
    const [items, setItems] = useState([]);
    const classes = styles();
    
const fetchItems = async () => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };

    await fetch("/api/inventory", requestOptions).then((response : any) => response.json()).then((response) => {
            setItems(response);
    });
}

const setNewAmount = async (item) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
  
    await fetch("/api/updateinventory/"+item+"/"+parseInt(document.getElementById("amountField").value), requestOptions).then(response => response.json()).then(response => {
        if (response === true) {
            
        }
    })
    window.location.reload();
};

useEffect(() => {
    fetchItems();
}, []);

    return (
        <div className="inventorymain">
            {items.map(i => ( 
                <div key={i.id} className="inventoryCont">
                    <Stack direction="row" spacing={2}>
                        <div className="inventoryInd"> 
                            {i.name === 'kosken 2cl' ? 'koskenkorva' : i.name} <br></br>
                            {i.amount + ' ' + i.unit}
                        </div> 
                        <ThemeProvider theme={theme}>
                            <div className="setAmount">
                                <Stack spacing={2}>
                                    <TextField className={classes.customOutline} InputLabelProps={{style: { color: '#45a29e' },}} InputProps={{style: {color: "white"}}} id="amountField" color="primary" name="amount" type="text" onChange={setAmount} label="Mängd" variant="outlined" />
                                    <Button color="primary" variant="outlined" onClick={() => document.getElementById("amountField").value.match(/^[0-9]+$/) != null ? setNewAmount(i.item) : alert(document.getElementById("amountField").value)}>Uppdatera Inventarie</Button>
                                </Stack>
                            </div>
                        </ThemeProvider>
                    </Stack>    
                    <hr className="linebreak"></hr>
                </div>
            ))}
        </div>
    )
}

export default InventoryComponent;
