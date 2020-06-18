import React, { useEffect, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  // grid: {
  //   display: 'flex',
  // },
  formControl: {
    // flexGrow: 1,
    width: "100%"
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
  divider: {
    marginBottom: 15,
    marginTop: 15
  },
  select: {
    maxHeight: 40
  }
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

  const onSubmitForm =async e => {
    if(!props.editData){
      e.preventDefault();
      try{
        const data = input;
        const response = await fetch("http://localhost:5000/buyers", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
        console.log(response);
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
        const response = await fetch(`http://localhost:5000/buyers/:${input.buyer_id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        });
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
      <div>
        <form className={classes.form}  onSubmit ={onSubmitForm}>
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3} md={3} className={classes.grid}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Kupac</InputLabel>
                <Select className={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}
                  // onChange={handleChange}
                  label="Kupac"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Adresa</InputLabel>
                <Select className ={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}
                  // onChange={handleChange}
                  label="Adresa"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
            <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Način plaćanja</InputLabel>
                <Select className={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}
                  // onChange={handleChange}
                  label="Adresa"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Pouzećem</MenuItem>
                  <MenuItem value={20}>Žiralno</MenuItem>
                  <MenuItem value={30}>Avansno</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider variant = 'middle' className={classes.divider}/>
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3} md={3} className={classes.grid}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Artikal</InputLabel>
                <Select className={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}
                  // onChange={handleChange}
                  label="Kupac"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
           
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="meil"
                label="Količina"
                type="e-mail"
                id="email"
                autoComplete="current-password"
                size="small"
                onChange={updateField}
                value={input.meil}
                inputRef={mailRef}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className = {classes.submit}
                inputref={buttonRef}
              >
                Koriguj kupca
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}
export default Form;