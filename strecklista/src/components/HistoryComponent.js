import "../css/historycomponent.css";
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Divider } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const styles = makeStyles({
    paper: {
        backgroundColor: 'red'
    },
});

const theme = createTheme({
    palette: {
      primary: {
        main: '#ff0000',
      },
      secondary: {
        main: '#45a29e',
      },
    },
  });

const HistoryComponent = (props) => {
    const [hist, setHist] = useState([]);
    const classes = styles();

    const getHistory = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/history/"+props.id, requestOptions).then((response : any) => response.json()).then((response) => {
            console.log(response);
            setHist(response);
        });
    }

    const removeFromHistory = async (hid, amount, itemid) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        await fetch("/api/remove/"+props.id+"/"+hid+"/"+itemid+"/"+amount, requestOptions).then((response : any) => response.json()).then((response) => {
            console.log(response);
            window.location.reload(false);
        });
    }

    useEffect(() => {
        getHistory();
    }, []);
    
    return (
        <div>
        {hist.slice(0).reverse().map(i => (
            <div key={i.id} className="">
                <Paper elevation={6} className="muipaper">
                    <Stack spacing={0.5}>
                        <div className="contentHistory">
                            <div> {i.name} </div>
                            <div> {i.streck}{i.name === "Inbetalning" ? "kr" : "st"} </div>
                            <div> {i.time.substring(0,10)} </div>
                            <hr className="lineBreakHistory"></hr>
                            <ThemeProvider theme={theme}>
                                <Button variant="outlined" onClick={() => removeFromHistory(i.id, i.streck, i.itemid)}startIcon={<DeleteIcon />}>Delete</Button>
                            </ThemeProvider>
                        </div>
                    </Stack>
                </Paper>
            </div>
            ))}
        </div>
    )
}
export default HistoryComponent;
