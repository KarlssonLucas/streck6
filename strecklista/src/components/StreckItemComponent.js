import "../css/streckitemcomponent.css";
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles'

const theme = createTheme({
    palette: {
      primary: {
        main: '#32CD32',
      },
      secondary: {
        main: '#66fcf1',
      },
    },
  });

  const styles = makeStyles({
    root: {
      color: "#32CD32"
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

const StreckItemComponent = (props) => {
    const classes = styles();
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(1);
    const [open, setOpen] = useState(false);

    //Try to streck, backend check if its possible
    const streckInsert = async () => {
        handleClose();
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/strecka/"+props.user +"/"+props.id+"/"+amount, requestOptions).then((response : any) => response.json()).then((response) => {
        });
        props.logParent();
        props.alertPurchase();
    }

    // Open and close the detailview for the item
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    return (
        <ThemeProvider theme={theme}>
        <Paper className="item" elevation={6}>
            <div> {props.name} </div> 
            <div> {props.pris} kr</div> 
            <Button style={{borderRadius: '3px', border: '1px solid', borderColor: 'limegreen', color: 'limegreen'}} className={'buttonBuy'} variant="outlined" onClick={handleClickOpen}>Köp</Button>
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
                <Button style={{height: '32px', borderRadius: '3px', border: '1px solid', borderColor: 'red', color: 'red'}} onClick={() => amount<2 ? true : setAmount(amount-1)} variant="outlined" className="subtract">-</Button>
                <input type="text" className="inputfield" readOnly={true} value={amount}/>
                <Button style={{height: '32px', borderRadius: '3px', border: '1px solid', borderColor: 'limegreen', color: 'limegreen'}} onClick={() => setAmount(amount+1)} variant="outlined" className="addition">+</Button>
            </div>
            <Button style={{borderRadius: '3px', border: '1px solid', borderColor: 'black', color: 'black'}} onClick={() => streckInsert()} variant="outlined" className="buttonBuy2">{props.pris * amount} kr</Button>
        </Stack>
        </DialogContent>
        </Dialog>
        </Paper>
    </ThemeProvider>
    )
}
export default StreckItemComponent;
