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
import CardAddress from "./CardAddress";
import CardInvoice from './CardInvoice';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


const TAX_RATE = 0.17;

const useStyles = makeStyles((theme) =>({
  table: {
    // minWidth: 700,
    width: '100%'
    
  },
  container: {
      // maxHeight: 360
      width: "100%"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
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
 
function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ sum }) => sum).reduce((sumi, i) => sumi + i, 0);
}


export default function SpanningTable(props) {
  const [specification, setSpecification] = useState([]);
  const [specificationWithSum, setSpecificationWithSum] = useState([]);
  const classes = useStyles();
  const invoiceSubtotal = subtotal(specificationWithSum);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  

  useEffect(()=> {
    getSpecification(props.order_id);
    console.log(specification);
  }, []);


  function calculateSum(data){
    var i = 0;
    var sum =[];
   for(i=0; i<data.length; i++){
     var rowSum = data[i].reserved * data[i].price;
     var rowData = {"name":data[i].name, "price":data[i].price, "reserved":data[i].reserved, "sum": rowSum};
     sum.push(rowData);
     console.log(rowData);
   }
   setSpecificationWithSum(sum);
   console.log(sum);
  };


  const getSpecification = async (order_id) => {
    try{
      console.log(order_id);
      const response = await fetch(`http://localhost:5000/specification/${order_id}`);
      const jsonData =await response.json();

      setSpecification(jsonData);
      console.log(jsonData);
      calculateSum(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <main className={classes.content}>

      <Container maxWidth="lg" className={classes.container}>
      
        <Grid container spacing={3}>
          <Grid item xs={8} md={8} lg={8}>
              <CardInvoice order_id={props.order_id}/>
          </Grid>
          <Grid item xs={4} md={4} lg={4} 
          >
              <CardAddress
               address={props.address}
               city={props.city}
               buyerName={props.buyerName}
              />
          </Grid>
          <Grid item xs={12} md ={12} lg={12}>
              <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} stickyHeader  aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Artikal</TableCell>
                      <TableCell align="right">Količina (komada)</TableCell>
                      <TableCell align="right">Jedinična cijena (KM)</TableCell>
                      <TableCell align="right">Ukupno (KM)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {specificationWithSum.map((row) => 
                      <TableRow 
                        // hover 
                        // aria-checked={isItemSelected(row.name)}
                        key={row.turnover_id}
                        // selected={isItemSelected(row.name)}

                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="right">{row.reserved}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{ccyFormat(row.sum)}</TableCell>
                      </TableRow>
                  )}

                    <TableRow>
                      <TableCell rowSpan={3} colSpan={2}/>
                      {/* <TableCell rowSpan={4}/> */}
                      <TableCell align="right" >Ukupni iznos</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                     
                      <TableCell align="right">{`PDV ${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                    
                      <TableCell align="right" >Ukupno sa PDV</TableCell>
                      <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                      
                    </TableRow>
                    
                    
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>
          
        </Grid>
      
       
      </Container>
  </main>
   
  );
}
