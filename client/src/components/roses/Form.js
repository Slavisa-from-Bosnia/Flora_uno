import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import Description from '@material-ui/icons/Description';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

 const Form = (props)=> {

  const addressRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const buttonRef = useRef();
  const nameRef =useRef();


  const changeFocusToAdress = () => {
    addressRef.current.focus();
  };
  const changeFocusToCity = () => {
    cityRef.current.focus();
  };
  const changeFocusToPhone = () => {
    phoneRef.current.focus();
  };
  const changeFocusToMail = () => {
    mailRef.current.focus();
  };
  const changeFocusToName = () => {
    nameRef.current.focus();
  };
  
  // useEffect(() => {
  //  if (props.editData){
  //     props.handleNewData({
  //       name:props.rowData.name,
  //       initial_quantity:props.rowData.initial_quantity,
  //       imageUrl:props.rowData.imageUrl,
  //       description: props.rowData.description
  
  //     })} else {
  //       props.handleNewData ({
  //         name:"",
  //         initial_quantity:"",
  //         image_url:"",
  //         description:"",
  //       });
  //     };      
  //   }, [props.rowData]
  // );

 

  const onSubmitForm =async e => {
    if(!props.editData){
      e.preventDefault();
      try{
        const data = props.newData;
        const response = await fetch("http://localhost:5000/roses", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
        console.log(response);
        props.setTrigger();
        props.getRoses();
        props.handleNewData({
          name:"",
          initial_quantity:"",
          image_url:"",
          description:"",
        });
        nameRef.current.focus();

      } catch (err) {
        console.error(err.message);
      }
     }   else{
      e.preventDefault();
      try{
        const data = props.newData;
        const response = await fetch(`http://localhost:5000/roses/:${data.rose_id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
        props.setTrigger();
        props.getRoses();
        props.handleNewData({
          name:"",
          initial_quantity:"",
          image_url:"",
          description:"",
        });
        nameRef.current.focus();
        props.editDataHendler();
        
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  // changeFocusToName();

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}  onSubmit ={onSubmitForm}>
          <Grid container spacing={4}>
            <Grid item xs={3} sm={3} md={3}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Naziv"
                autoFocus
                size="small"
                onChange={props.updateNewData}
                value={props.newData.name}
                inputRef={nameRef}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    changeFocusToAdress();
                  }
                }}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="initial_quantity"
                label="Početno initial_quantity komada"
                name="initial_quantity"
                autoComplete="lname"
                size="small"
                onChange={props.updateNewData}
                value={props.newData.initial_quantity}
                inputRef={addressRef}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    changeFocusToCity();
                  }
                }}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<InsertPhotoIcon />}
              >
                Unesi sliku
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
               <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<Description />}
                onClick = {props.handleOpenDescription}
              >
                Unesi opis
                
              </Button>
            </Grid>
            
          </Grid>
          {props.editData &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className = {classes.submit}
            inputref={buttonRef}
          >
            Koriguj 
          </Button>}
          {!props.editData &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className = {classes.submit}
            inputref={buttonRef}
          >
            Snimi 
          </Button>}
        </form>
      </div>
      
    </Container>
  );
}
export default Form;