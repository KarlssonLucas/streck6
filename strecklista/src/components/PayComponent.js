import "../css/paycomponent.css";
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { withStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const styles = (theme) => ({
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

    button: {
        borderColor: 'green',
        color: 'green',
    }
});

const theme = createTheme({
    palette: {
      primary: {
        main: '#32cd32',
      },
      secondary: {
        main: '#32cd32',
      },
    },
  });

const PayComponent = (props) => {
    const classes = styles();
    const [skuld, setSkuld] = useState(0);

    const fetchSkuld = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch("/api/skuld/"+props.id, requestOptions).then((response : any)      => response.json()).then((response) => {
            setSkuld(parseInt(response[0].pay));
        });
 
    }

    const payDebt = async () => {
        const requestOptions = {
            method: 'GET',
            hearders: {'Content-Type': 'application/json' },
        };

        await fetch("/api/pay/"+props.id +"/" + parseInt(document.getElementById("inputPay").value), requestOptions).then((response : any) => response.json()).then((response) => {
            console.log("done")
            window.location.reload(false);
        });
    }

    useEffect(() => {
        fetchSkuld();
        console.log("5a9".match(/^[0-9]+$/) != null)
    }, []);
   
    return (
        <div className="payMain">
            <ThemeProvider theme={theme}>
            <Stack spacing={2}>
                <input id="inputPay" key={skuld ? 'notLoadedYet' : 'loaded'} type="number" className="if" defaultValue={skuld<0 ? skuld*-1 : 0} />
                <Button className="payButton" color="primary" variant="outlined" onClick={() => document.getElementById("inputPay").value.match(/^[0-9]+$/) != null ? payDebt() : alert('hur full är du egentligen')}> Lägg till betalning </Button>
                <div className="addToPay"> 
                    <Button className="buttonAddToPay" color="primary" variant="outlined" onClick={() => document.getElementById("inputPay").value = parseInt(document.getElementById("inputPay").value) + 50} > +50 </Button>
                    <Button className="buttonAddToPay" color="primary" variant="outlined" onClick={() => document.getElementById("inputPay").value = parseInt(document.getElementById("inputPay").value) + 100}>  +100 </Button>
                    <Button className="buttonAddToPay" color="primary" variant="outlined" onClick={() => document.getElementById("inputPay").value = parseInt(document.getElementById("inputPay").value) + 500}>  +500 </Button>
                </div>

            </Stack>
            </ThemeProvider>
        </div>
    )
}

export default withStyles(styles)(PayComponent);
