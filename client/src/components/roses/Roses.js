import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from './Form.js';
import Table from  './Table';
import Description from './Description';
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
  const [tableData, setTableData] = useState ([]);
  const [openDeleteDialog, setDeleteDialog] = React.useState(false);
  const [rowData, setRowData] = React.useState("");
  const [openDescriptionDialog, setDescriptionDialog] = useState(false);
  
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

      setTableData(jsonData);
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

// Table open delete dialog
const handleOpenDialog = (data) => {
  console.log(data);
  setDeleteDialog(true);
  setRowData(data);
};

// Form open description dialog
const handleOpenDescription = () =>{
  setDescriptionDialog(true);
};

// Delete from dialog
const handleCloseDialog = () => {
  setDeleteDialog(false);
  console.log(rowData);
  onDeleteClick(rowData);
};

const handleCloseDescription = (description) =>{
  setDescriptionDialog(false);
  console.log('jses');
};

const onDeleteClick = async (rowData) => {
  try {
    console.log("podaci za brisanje")
    const deleteBuyers = await fetch (`http://localhost:5000/buyers/${rowData.buyer_id}`, {
      method: "DELETE"
  });
    getBuyers();
    console.log(deleteBuyers);

  } catch (err) {
    console.error(err.message);
  }

};


// Close dialog
const closeOpen = () => {
  setDeleteDialog(false);
} ;

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Table 
                editData={handleEditData} 
                openDialog={handleOpenDialog}
                getBuyers={getBuyers}
                data={tableData}
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
                  handleOpenDescription={handleOpenDescription}
                  handleCloseDescription={handleCloseDescription}
                />
              </Paper>
            </Grid>
          </Grid>
          <Description open ={openDescriptionDialog} handleCloseDescription={handleCloseDescription}/>
          <Dialog open = {openDeleteDialog} closeOpen={closeOpen} rowData={rowData} handleCloseDialog={handleCloseDialog}/>
        </Container>

    </div>
  );
}