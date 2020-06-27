import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddOutlined';
import TableCreateOrder from  './TableCreateOrder';
import Dialog from './Dialog';
import {Link} from 'react-router-dom';
import Form from './Form';
import Paper from '@material-ui/core/Paper';


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
      overflow: 'hidden',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 160,
    }
  }));

export default function Buyers() {
  const [specification, setSpecification] = React.useState([]);

  
  useEffect(()=>{
  },[]);

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

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>

            <Paper className={fixedHeightPaper}>
              <Form
                
              />
            </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableCreateOrder 
                specification={specification}
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
              >
                Kreiraj narudžbu
              </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

    </div>
  );
}