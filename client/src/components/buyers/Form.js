import React, { useEffect, useState, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {SignInContext} from '../../context/auth-context'; 
import DialogIsValid from './DialogIsValid';


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
    firstName:"",
    address:"",
    city:"",
    phone:"",
    meil:"",
    buyer_id:""
  });

  const [isNew, setNew] = useState (false);

  const {signInData} = useContext(SignInContext);
  const {docker} = useContext(SignInContext);



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
        firstName:props.rowData.name,
        address:props.rowData.address,
        city:props.rowData.city,
        phone:props.rowData.phone,
        meil:props.rowData.email,
        buyer_id:props.rowData.buyer_id
      })} else {
        setInput ({
        firstName:"",
        address:"",
        city:"",
        phone:"",
        meil:"",
        buyer_id:""
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
  
  const closeDialogIsValid = ()=> {
    setNew(false);
  };

  const onSubmitForm =async e => {
    if(!props.editData){
      e.preventDefault();
      try{
        const data = input;
        const response = await fetch(`http://${docker.connection}:5000/buyers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization:"Bearer" +" "+ signInData.token
          },
          body: JSON.stringify(data)
        });
        const dataFromS = await response.json();
        setNew (dataFromS.isExist);
        console.log(dataFromS);
        props.setTrigger();
        props.getBuyers();
        setInput({
          firstName:"",
          address:"",
          city:"",
          phone:"",
          meil:"",
          buyer_id:""
          
        });
        firstNameRef.current.focus();

      } catch (err) {
        console.error(err.message);
      
      }
     }   else{
      e.preventDefault();
      try{
        const data = {input};
        const response = await fetch(`http://${docker.connection}:5000/buyers/:${input.buyer_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization:"Bearer" +" "+ signInData.token
          },
          body: JSON.stringify(data)
        });
        const dataFromS = await response.json();
        setNew (dataFromS.isExist);
        props.setTrigger();
        props.getBuyers();
        setInput({
          firstName:"",
          address:"",
          city:"",
          phone:"",
          meil:"",
          buyer_id:""
          
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
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
            <Grid item xs={12} sm={6} md={2}>
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
            <Grid item xs={12} sm={6} md={2}>
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
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="phone"
                label="Telefon"
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
            <Grid item xs={12} sm={6} md={2}>
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
          {props.editData &&
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className = {classes.submit}
            inputref={buttonRef}
          >
            Koriguj kupca
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
            Snimi novog kupca
          </Button>}
        </form>
      </div>
      <DialogIsValid open = {isNew} closeOpen = {closeDialogIsValid}/>
      
    </Container>
  );
}
export default Form;