import React, {useState, useEffect, useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddOutlined';
import Table from  './Table';
import Dialog from './Dialog';
import {Link, withRouter}from 'react-router-dom';
import DetailView from '../orders/DetailView';
import {SignInContext} from '../../context/auth-context';
import {useHistory, Route, Redirect} from 'react-router-dom';



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

export default function Orders(props) {
  // const [trigger, setTrigger] = useState (true);
  // const [editData, setEditData] = useState (false);
  const [buyers, setBuyers] = useState ([]);
  // const [orders, setOrders] = React.useState([]);
  const [rowData, setRowData] = React.useState("");
  const [dataForDetailView, setDataForDetailView] = useState("");
  const [dataView, setDataView] = useState(false);
  const [rows, setRows]=React.useState([]);
  const {signInData} = useContext(SignInContext);
  const {docker} = useContext(SignInContext); 

  const history = useHistory();



  const handleClick = (event, data) => {
    setDataForDetailView(data);
    // setDataView(true);
    console.log (data);

    history.push({
      pathname:'/dashboard/orders/detailview', 
      dataSecond:data
    })
  };
  
  const getOrders_jb = async () => {
    try{
      const response = await fetch(`http://${docker.connection}:5000/orders_jb`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization:"Bearer" +" "+ signInData.token
        }
      });
      const jsonData = await response.json();
  
      setRows(jsonData);
      console.log(jsonData);
  
    } catch (err) {
      console.error(err.message);
    }
  };

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

const changeDelivered =()=> {
  getOrders_jb();
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
                // orders={orders}
                // data={data}
                rowData={rowData}
                handleClick={handleClick}
                rows={rows}
                setRows={setRows}
                getOrders_jb={getOrders_jb}
                />  
            </Grid>  
            <Grid item xs={12} md={12} lg={12} >
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
        </Container>
      </div>
  )
  
}