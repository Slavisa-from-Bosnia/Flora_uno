import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddOutlined';
import Table from  './Table';
import Dialog from './Dialog';
import {Link}from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 140,
    }
  }));

export default function Buyers() {
  // const [trigger, setTrigger] = useState (true);
  // const [editData, setEditData] = useState (false);
  const [buyers, setBuyers] = useState ([]);
  const [orders, setOrders] = React.useState([]);
  const [rowData, setRowData] = React.useState("");
  
  useEffect(()=>{
    getOrders();
  },[]);

  // const handleTrigger = ()=>{
  //   // setTrigger(trigger => !trigger);
  // };
  
  const getOrders = async () => {
    try{
      const response = await fetch("http://localhost:5000/orders");
      const jsonData =await response.json();

      setOrders(jsonData);
      console.log(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };



  // Table edit data
// const handleEditData = (data) => {
//   console.log(data);
//   setRowData(data);
//   // setEditData(true);
// };

// From form
const editDataHendler = () => {
  // setEditData(false);
};

// Table open dialog
const handleOpenDialog = (data) => {
  console.log(data);
  // setOpen(true);
  setRowData(data);
};

// Delete from dialog
const handleCloseDialog = () => {
  // setOpen(false);
  console.log(rowData);
  onDeleteClick(rowData);
};

const onDeleteClick = async (rowData) => {
  try {
    console.log("podaci za brisanje")
    const deleteBuyers = await fetch (`http://localhost:5000/buyers/${rowData.buyer_id}`, {
      method: "DELETE"
  });
    getOrders();
    console.log(deleteBuyers);

  } catch (err) {
    console.error(err.message);
  }

};


// Close dialog
const closeOpen = () => {
  // setOpen(false);
} ;

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Table 
                // editData={handleEditData} 
                openDialog={handleOpenDialog}
                orders={orders}
                // data={data}
                rowData={rowData}
                />  
            </Grid>  
            <Grid item xs={12} md={12} lg={12} >
              {/* <Paper className={fixedHeightPaper}>
                <Form
                  setTrigger = {handleTrigger}
                  editData = {editData}
                  rowData={rowData}
                  editDataHendler = {editDataHendler}

                  getBuyers = {getBuyers}
                />
              </Paper> */}
              <Box display="flex" justifyContent ='flex-end'>
                <Button 
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<AddIcon />}
                  component ={Link}
                  to = "/dashboard/createOrder"
                >
                  Nova narudžba
                </Button>
              </Box>
            </Grid>
          </Grid>
          {/* <Dialog open = {open} closeOpen={closeOpen} rowData={rowData} handleCloseDialog={handleCloseDialog}/> */}
        </Container>

    </div>
  );
}