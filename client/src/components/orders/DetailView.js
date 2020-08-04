import React, { useEffect, useState } from 'react';
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



const TAX_RATE = 0.17;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
      maxHeight: 360
  }
});

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

// function subtotal(items) {
//   return items.map(({ sum }) => sum).reduce((sumi, i) => sumi + i, 0);
// }


export default function SpanningTable(props) {
  const [specification, setSpecification] = useState([]);
  const classes = useStyles();
  // const invoiceSubtotal = subtotal(props.specification);
  // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  // const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  useEffect(()=> {
    getSpecification(props.order_id);
  }, []);

  const getSpecification = async (order_id) => {
    try{
      console.log(order_id);
      const response = await fetch(`http://localhost:5000/specification/${order_id}`);
      const jsonData =await response.json();

      setSpecification(jsonData);
      console.log(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} stickyHeader  aria-label="spanning table">
        <TableHead>
          
          <TableRow>
            <TableCell>Artikal</TableCell>
            <TableCell align="right">Količina (komada)</TableCell>
            <TableCell align="right">Jedinična cijena (KM)</TableCell>
            <TableCell align="right">Sum (KM)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {specification.map((row) => 
            <TableRow 
              // hover 
              // aria-checked={isItemSelected(row.name)}
              key={row.desc}
              // selected={isItemSelected(row.name)}

              >
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                {/* <TableCell align="right">{ccyFormat(row.sum)}</TableCell> */}
            </TableRow>
        )}

          <TableRow>
            <TableCell rowSpan={3} colSpan={2} />
            <TableCell colSpan={2}>Ukupni iznos</TableCell>
            {/* <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell>PDV</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            {/* <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Ukupno sa PDV</TableCell>
            {/* <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
