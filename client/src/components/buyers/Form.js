import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SelectInput from '@material-ui/core/Select/SelectInput';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 const Form = (props)=> {
  
  const [input, setInput] = useState ({
    firstName:"",
    address:"",
    city:"",
    phone:"",
    meil:""
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

  const updateField = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitForm =async e => {
    e.preventDefault();
    try{
      const data = {input};
      const response = await fetch("http://localhost:5000/buyers", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      console.log(response);
      props.setTrigger();
      setInput({
        firstName:"",
        address:"",
        city:"",
        phone:"",
        meil:""
      });
      firstNameRef.current.focus();

    } catch (err) {
      console.error(err.message);
  
    }
    
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
          Unos kupaca
        </Typography>
        <form className={classes.form}  onSubmit ={onSubmitForm}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Ime i prezime"
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
            <Grid item xs={6} sm={4} md={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Adresa"
                name="address"
                autoComplete="lname"
                size="small"
                onChange={updateField}
                value={input.address}
                inputRef={addressRef}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    changeFocusToCity();
                  }
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="Grad"
                name="city"
                autoComplete="city"
                size="small"
                onChange={updateField}
                value={input.city}
                inputRef={cityRef}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    changeFocusToPhone();
                  }
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Telefon"
                type="password"
                id="phone"
                autoComplete="phone"
                size="small"
                onChange={updateField}
                value={input.phone}
                inputRef={phoneRef}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    changeFocusToMail();
                  }
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="meil"
                label="E-mail"
                type="e-mail"
                id="email"
                autoComplete="current-password"
                size="small"
                onChange={updateField}
                value={input.meil}
                inputRef={mailRef}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className = {classes.submit}
            inputref={buttonRef}
          >
            Snimi
          </Button>
        </form>
      </div>
      
    </Container>
  );
}
export default Form;