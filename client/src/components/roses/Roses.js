import React, {useState, useEffect, useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from './Form.js';
import Table from  './Table';
import Description from './Description';
import Dialog from './Dialog';
import DialogForm from './DialogForm';
import {SignInContext} from '../../context/auth-context';


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
      // height: 144,
    },
  }));

export default function Buyers() {
  const [trigger, setTrigger] = useState (true);
  const [editData, setEditData] = useState (false);
  const [tableData, setTableData] = useState ([]);
  const [openDeleteDialog, setDeleteDialog] = React.useState(false);
  const [rowData, setRowData] = React.useState("");
  const [openDescriptionDialog, setDescriptionDialog] = useState(false);
  const [newData, setNewData] = React.useState("");
  const [formDialog, setFormDialog] = useState(false);
  const {signInData} = useContext(SignInContext);
  const {docker} = useContext(SignInContext);



  
  useEffect(()=>{
    getRoses();
  },[]);

  const handleTrigger = ()=>{
    setTrigger(trigger => !trigger);
  };
  
  const getRoses = async () => {
    try{
      const response = await fetch(`http://${docker.connection}:5000/roses`);
      const jsonData =await response.json();

      setTableData(jsonData);
      console.log(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };

  // Table edit data
const handleEditData = (rowData) => {
  console.log(rowData);
  setRowData(rowData);
  // findDescription(rowData.name);
  setEditData(true);
};

// From form
const editDataHendler = () => {
  setEditData(false);
};

// Table open delete dialog
const handleOpenDeleteDialog = (data) => {
  console.log(data);
  setDeleteDialog(true);
  setRowData(data);
};

// Form open description dialog
const handleOpenDescription = () =>{
  setDescriptionDialog(true);
  console.log(newData);
};

// Delete from dialog
const handleCloseDialog = () => {
  setDeleteDialog(false);
  console.log(rowData);
  onDeleteClick(rowData);
};

const handleCloseDescription = (description) =>{
  setDescriptionDialog(false);
};

const onDeleteClick = async (rowData) => {
  try {
    const deleteBuyers = await fetch (`http://${docker.connection}:5000/roses/${rowData.rose_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization:"Bearer" +" "+ signInData.token
      }
  });
    getRoses();
    console.log(deleteBuyers);

  } catch (err) {
    console.error(err.message);
  }

};

// Close dialog
const closeOpen = () => {
  setDeleteDialog(false);
} ;

const closeFormDialog = () => {
  setFormDialog(false);
} ;


const handleNewData = (data) =>{
 setNewData({
  name:data.name,
  initial_quantity:data.initial_quantity,
  image_url:data.image_url,
  description: data.description ,
  rose_id: data.rose_id,
  price:data.price,
  reserved: data.reserved,
  sum:data.sum,
  correction:data.correction
 });
};

const updateNewData = e => {
  setNewData({
    ...newData,
    [e.target.name]: e.target.value
  });
  // console.log(newData);
};

const updateNewData2 = e => {
  console.log(newData);
  console.log(parseInt(newData.sum)+parseInt(e.target.value));
  if(parseInt(newData.sum)+parseInt(e.target.value)<0){
    console.log("korekcija_veća_od_inicijalne_vrijednosti");
    setFormDialog(true);
    

  } else {
    console.log ("vrijsenost ok");
  setNewData({
    ...newData,
    [e.target.name]: e.target.value
  
  });
}
  // console.log(newData);
};


  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Table 
                editData={handleEditData} 
                openDialog={handleOpenDeleteDialog}
                getRoses={getRoses}
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
                  getRoses = {getRoses}
                  handleOpenDescription={handleOpenDescription}
                  handleCloseDescription={handleCloseDescription}
                  newData={newData} 
                  handleNewData={handleNewData}
                  updateNewData={updateNewData}
                  updateNewData2={updateNewData2}
                />
              </Paper>
            </Grid>
          </Grid>
          <Description 
            open ={openDescriptionDialog} 
            handleCloseDescription={handleCloseDescription} 
            updateNewData={updateNewData}
            newData={newData}
          />
          <Dialog open = {openDeleteDialog} closeOpen={closeOpen} rowData={rowData} handleCloseDialog={handleCloseDialog}/>
          <DialogForm open = {formDialog} closeOpen={closeFormDialog} />

        </Container>

    </div>
  );
}