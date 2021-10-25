import "../css/streckitemcomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

const StreckItemComponent = (props) => {
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(1);
    const [open, setOpen] = useState(false);

    const streckInsert = async () => {
        handleClose();
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/strecka/"+props.user +"/"+props.id+"/"+amount, requestOptions).then((response : any) => response.json()).then((response) => {
            props.logParent();
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    return (
        <Paper className="item" elevation={6}>
            <div> {props.name} </div> 
            <div> {props.pris} kr</div> 
            <Button className="buttonBuy" variant="outlined" onClick={handleClickOpen}>Köp</Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {props.name}
        </DialogTitle>
        <DialogContent>
            <Stack>
            <div> 
                <Button onClick={() => amount<2 ? true : setAmount(amount-1)} variant="outlined" className="subtract">-</Button>
                <input type="text" className="inputfield" readOnly={true} value={amount}/>
                <Button onClick={() => setAmount(amount+1)} variant="outlined" className="addition">+</Button>
            </div>
            <Button onClick={() => streckInsert()} variant="outlined" className="buttonBuy2">{props.pris * amount} kr</Button>
        </Stack>
        </DialogContent>
      </Dialog>
        </Paper>
    )
}
export default StreckItemComponent;
