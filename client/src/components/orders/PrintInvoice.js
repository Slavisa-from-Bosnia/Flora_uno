import React, { useEffect, useState, useRef, useContext } from 'react';
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
import {SignInContext} from '../../context/auth-context';

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
 
  // const [delivered, setDelivered] = useState(false);
  const [payed, setPayed] = useState(false);
  const [shipped, setShipped] = useState(false);
  const classes = useStyles();
  const {signInData} = useContext(SignInContext);


  useEffect(()=>{
    setShipped(props.data.shipped);  
    setPayed(props.data.payed);
  },[props.data.shipped]);


  const handleDelivered =async e => {
    try{
      const data = props.data.order_id;
      console.log(shipped);
      const nShipped = !shipped;
      console.log(nShipped);
      const response = await fetch(`http://localhost:5000/orders/shipped/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization:"Bearer" +" "+ signInData.token
        },
        body: JSON.stringify({nShipped})
      });
      console.log(response);
      setShipped(nShipped);
      
    } catch (err) {
      console.error(err.message);
    }
  };
  
  const handlePayed =async e => {
    try{
      const data = props.data.order_id;
      console.log(payed);
      const nPayed = !payed;
      console.log(nPayed);
      const response = await fetch(`http://localhost:5000/orders/payed/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization:"Bearer" +" "+ signInData.token
        },
        body: JSON.stringify({nPayed})
      });
      console.log(response);
      setPayed(nPayed);
      
    } catch (err) {
      console.error(err.message);
    }
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
                checked={shipped}
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
