import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Print from '@material-ui/icons/Print';
import Invoice from'./Invoice';
import PrintInvoice from './PrintInvoice';
import {useReactToPrint} from 'react-to-print';

const useStyles = makeStyles((theme) =>({

  container: {
      // maxHeight: 360
      width: "100%"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
 


export default function Detail (props) {

  const [delivered, setDelivered] = useState(false);
  const [payed, setPayed] = useState(false);
  const classes = useStyles();
  

  function handleDelivered(){
    setDelivered(delivered=>
      !delivered
    );
  };

  function handlePayed (payed){
    setPayed(payed=>!payed);
  };
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <main className={classes.content}>
      <div ref={componentRef}>
        <Invoice 
          order_id ={props.order_id}
          address = {props.address}
          city = {props.city}
          buyerName = {props.buyerName}
          // ref={componentRef}
        />
      </div>
      <PrintInvoice handlePrint={handlePrint} data = {props.data}/>
  </main>
   
  );
}
