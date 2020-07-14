import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddOutlined';
import TableCreateOrder from  './TableCreateOrder';
import {Link, Route, Router, Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Form from './Form';
import DialogSpecification from './DialogSpecification';
import DialogIsValid from './DialogIsValid';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      maxHeight:140
    },
    fixedHeight: {
      height: 240,
      margin: theme.spacing(1),
      padding: theme.spacing(1)
    }
  }));

export default function Buyers() {
  const [specification, setSpecification] = React.useState([]);
  const [open, setOpen]=useState(false);
  const [openIsValidate, setOpenIsValdiate] = useState(false);
  const [data, setData] = React.useState({
    buyer_id:"",
    payment_method: "10",
    totalSum: ""
  });
  const [redirect, setRedirect] =useState(false);
  
  function constains (a, obj) {
    for (var i = 0; i<a.length; i++) {
      if (a[i].name === obj) {
        return true;
      }
    } 
    return false;
  }
  
  const createOrder = async() =>{
    console.log(specification);
    if (data.buyer_id && data.payment_method && data.totalSum>0){
      try{
        const response = await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({data, specification})
        });
        const jsonData = await response.json();
        console.log(jsonData);
        } catch (err) {
          console.error(err.message);
        } 
        setRedirect(true);

    } else {
      console.log("nedostaju svi podaci");
    }
  }

  const updateFieldData = (e)=> {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    console.log(data);
  }

  const handleSpecification = (input) => {
    console.log(input.rose_name);
    console.log(specification);
    const isValid = constains (specification, input.rose_name);
    console.log(`isValid ${isValid}`);

    if(!isValid)  {
      console.log("unos je jedinstven");
      const sum = input.price * input.quantity;
      var qb = parseInt(input.quantity);
      
      setSpecification ((specification => [...specification, {  
        
        name: input.rose_name,
        quantity: qb,
        price:input.price,
        sum,
        rose_id:input.rose_id
      }

      ]));

      console.log(specification);
    } else {
      console.log(`isValid ${isValid}`);
      setOpenIsValdiate(true);
    }
}

  const openDialog = () => {
    setOpen(true);
  };
  const closeOpen = () => {
    setOpen(false);
  };
  const closeOpenIsValidate = () => {
    setOpenIsValdiate (false);
  };

  const handleTrigger = ()=>{
    // setTrigger(trigger => !trigger);
  };
  

  // Table edit data
const handleEditData = (data) => {
  console.log(data);
  // setRowData(data);
};

// Table open dialog
const handleOpenDialog = (data) => {
  console.log(data);
  // setRowData(data);
};
const handleSumFromSpecification = (sumFromSpecification) => {
  setData({...data,
    totalSum: sumFromSpecification
  });
  
}

  const deleteSpecification = (rowItem) => {
    const dataForSpecification = specification.filter(specificationItem =>specificationItem.name!==rowItem);
    console.log(dataForSpecification);
    setSpecification(dataForSpecification);
  }
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  if(redirect){

    return <Redirect push to = "/dashboard/orders"/>;

  } else {
  return (
    <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>

            <Paper className={fixedHeightPaper}>
              <Form
              openDialog={openDialog}
              handleSpecification={handleSpecification}
              updateFieldData={updateFieldData}
              />
            </Paper>

            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableCreateOrder 
                specification={specification}
                handleSumFromSpecification= {handleSumFromSpecification}
                deleteSpecification = {deleteSpecification}
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
                onClick={createOrder}
              >
                Kreiraj narudžbu
              </Button>
              </Box>
            </Grid>
          </Grid>
          <DialogSpecification open ={open} closeOpen= {closeOpen}/>
          <DialogIsValid open={openIsValidate} closeOpen= {closeOpenIsValidate}/>
        </Container>

    </div>
  
  );
 }
}