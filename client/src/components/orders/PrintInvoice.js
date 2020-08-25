import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Remove from '@material-ui/icons/Remove';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import CardAddress from "./CardAddress";
import CardInvoice from './CardInvoice';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Print from '@material-ui/icons/Print';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import ReactToPrint from 'react-to-print';

const useStyles = makeStyles((theme) =>({
 
  container: {
      // maxHeight: 360
      width: "100%"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
 
  fixedHeight: {
    height: 220,
  },
  address: {
    margin: theme.spacing(2),
  },
  paperPrinter: {
    height: 100,
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
  },
  printContainer: {
    justifyContent: 'space-between'
  }
}));
 




export default function SpanningTable(props) {
 
  const [delivered, setDelivered] = useState(false);
  const [payed, setPayed] = useState(false);
  const classes = useStyles();

 


  const handleDelivered =async e => {
    try{
      const data = props.data;
      console.log(data);
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data, delivered)
      });
      console.log(response);
      setDelivered(delivered=>
        !delivered
      );
      
    } catch (err) {
      console.error(err.message);
    }
      
   
    
  };
 
  
  

  function handlePayed (payed){
    setPayed(payed=>!payed);
  };


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <main className={classes.content}>

      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paperPrinter}>
          <Grid container spacing={1} className={classes.printContainer}>
            <Grid item xs={3} sm={3} md={3}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                startIcon={<Print />}
                onClick={props.handlePrint}
              >
                Štampaj fakturu
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
             <FormControlLabel
              control={
                <Checkbox
                checked={delivered}
                onChange={handleDelivered}
                name="checkedB"
                color="primary"
                />
              }
                label="Isporučeno"
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
             <FormControlLabel
              control={
                <Checkbox
                checked={payed}
                onChange={handlePayed}
                name="checkedB"
                color="primary"
                />
              }
                label="Plaćeno"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
  </main>
   
  );
}
