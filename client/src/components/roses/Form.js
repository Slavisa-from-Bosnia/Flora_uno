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
  
  const [input, setInput] = useState ({
    name:"",
    initial_quantity:"",
    imageUrl:"",
    description:"",
  });

  const addressRef = useRef();
  const cityRef = useRef();
  const phoneRef = useRef();
  const mailRef = useRef();
  const buttonRef = useRef();
  const firstNameRef =useRef();


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
    firstNameRef.current.focus();
  };
  
  useEffect(() => {
   if (props.editData){
      setInput({
        name:props.rowData.name,
        initial_quantity:props.rowData.initial_quantity,
        imageUrl:props.rowData.imageUrl,
        description: props.rowData.description
  
      })} else {
        setInput ({
          name:"",
          initial_quantity:"",
          imageUrl:"",
          description:"",
        });
      };

      console.log(props.editData);
    
      
    }, [props.rowData]
  );
  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  const updateField = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitForm =async e => {
    if(!props.editData){
      e.preventDefault();
      try{
        const data = input;
        const response = await fetch("http://localhost:5000/roses", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
        console.log(response);
        props.setTrigger();
        props.getBuyers();
        setInput({
          name:"",
          initial_quantity:"",
          imageUrl:"",
          description:"",
        });
        firstNameRef.current.focus();

      } catch (err) {
        console.error(err.message);
      
      }
     }   else{
      e.preventDefault();
      try{
        const data = {input};
        const response = await fetch(`http://localhost:5000/roses/:${input.rose_id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
        props.setTrigger();
        props.getBuyers();
        setInput({
          name:"",
          initial_quantity:"",
          imageUrl:"",
          description:"",
        });
        firstNameRef.current.focus();
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
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Naziv"
                autoFocus
                size="small"
                onChange={updateField}
                value={input.firstName}
                inputRef={firstNameRef}
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
                id="stanje"
                label="Početno stanje komada"
                name="stanje"
                autoComplete="lname"
                size="small"
                onChange={updateField}
                value={input.stanje}
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