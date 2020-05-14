import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from './Form.js';
import TableB from  './TableB';
import Dialog from './Dialog';

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
    },
  }));

export default function Buyers() {
  const [trigger, setTrigger] = useState (true);
  const [editData, setEditData] = useState (false);
  const [data, setData] = useState ([]);
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState("");
  
  useEffect(()=>{
    getBuyers();
  },[]);

  const handleTrigger = ()=>{
    setTrigger(trigger => !trigger);
  };
  
  const getBuyers = async () => {
    try{
      const response = await fetch("http://localhost:5000/buyers");
      const jsonData =await response.json();

      setData(jsonData);
      console.log(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };

  // Table edit data
const handleEditData = (data) => {
  console.log(data);
  setRowData(data);
  setEditData(true);
};

// From form
const editDataHendler = () => {
  setEditData(false);
};

// Table open dialog
const handleOpenDialog = (data) => {
  console.log(data);
  setOpen(true);
  setRowData(data);
};

// Delete from dialog
const handleCloseDialog = () => {
  setOpen(false);
  // onDeleteClick();
};

// Close dialog
const closeOpen = () => {
  setOpen(false);
} ;

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <TableB 
                editData={handleEditData} 
                openDialog={handleOpenDialog}
                getBuyers={getBuyers}
                data={data}
                rowData={rowData}
                />  
            </Grid>  
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Form
                  setTrigger = {handleTrigger}
                  editData = {editData}
                  rowData={rowData}
                  editDataHendler = {editDataHendler}
                  getBuyers = {getBuyers}
                />
              </Paper>
            </Grid>
          </Grid>
          <Dialog open = {open} closeOpen={closeOpen} rowData={rowData} handleCloseDialog={handleCloseDialog}/>
        </Container>

    </div>
  );
}