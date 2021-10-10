import "../css/paycomponent.css";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const PayComponent = (props) => {
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
            <Stack spacing={2}>
                <input id="inputPay" key={skuld ? 'notLoadedYet' : 'loaded'} type="number" className="if" defaultValue={skuld<0 ? skuld*-1 : 0} />
                <Button className="payButton" variant="outlined" onClick={() => document.getElementById("inputPay").value.match(/^[0-9]+$/) != null ? payDebt() : alert('hur full är du egentligen')}> Lägg till betalning </Button>
                <div className="addToPay"> 
                    <Button className="buttonAddToPay" variant="outlined" onClick={() => document.getElementById("inputPay").value = parseInt(document.getElementById("inputPay").value) + 50} > +50 </Button>
                    <Button className="buttonAddToPay" variant="outlined" onClick={() => document.getElementById("inputPay").value = parseInt(document.getElementById("inputPay").value) + 100}>  +100 </Button>
                    <Button className="buttonAddToPay" variant="outlined" onClick={() => document.getElementById("inputPay").value = parseInt(document.getElementById("inputPay").value) + 500}>  +500 </Button>
                </div>

            </Stack>
        </div>
    )
}

export default PayComponent;
