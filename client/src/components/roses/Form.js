import React, { useEffect, useState, useRef, Fragment } from 'react';
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

  useEffect(() => {
   if (props.editData){
      props.handleNewData({
        name:props.rowData.name,
        sum:props.rowData.sum,
        imageUrl:props.rowData.imageUrl,
        description: props.rowData.description,
        rose_id:props.rowData.rose_id,
        price: props.rowData.price,
        correction: "0"
      });
    } else {
        props.handleNewData ({
          name:"",
          initial_quantity:"",
          image_url:"",
          description:"",
          rose_id:"",
          price:"",
          correction: "0"
        });
      };      
    }, [props.rowData]
  );

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
          rose_id:"",
          price:"",
          correction: "0"
        });
       

      } catch (err) {
        console.error(err.message);
      }
     }   else{
      e.preventDefault();
      try{
        const data = props.newData;
        console.log(`podaci koji se šalju ${data}`);
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
          rose_id:"",
          price:0,
          correction: "0"
        });
        
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
          <Grid container spacing={1}>
            { !props.editData &&
              <Fragment>
                <Grid item xs={3} sm={3} md={3}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Naziv"
                    // autoFocus
                    size="small"
                    onChange={props.updateNewData}
                    value={props.newData.name ||""}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="initial_quantity"
                    label="Poč. kol."
                    name="initial_quantity"
                    autoComplete="lname"
                    size="small"
                    onChange={props.updateNewData}
                    value={props.newData.initial_quantity||""}
                    type="number"
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="initial_quantity"
                    label="Jed.cjena."
                    name="price"
                    autoComplete="lname"
                    size="small"
                    onChange={props.updateNewData}
                    value={props.newData.price||""}
                    type="number"
                  />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<InsertPhotoIcon />}
                  >
                    Unesi sliku
                  </Button>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<Description />}
                    onClick = {props.handleOpenDescription}
                  >
                    Unesi opis
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className = {classes.submit}
                  >
                    Snimi 
                  </Button>
                </Grid>
              </Fragment>
            }
            {props.editData && 
              <Fragment>
                <Grid item xs={3} sm={3} md={3}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Naziv"
                    // autoFocus
                    size="small"
                    onChange={props.updateNewData}
                    value={props.newData.name ||""}
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="correction"
                    label="Kor. kol."
                    name="correction"
                    // autoComplete="lname"
                    size="small"
                    onChange={props.updateNewData2}
                    value={props.newData.correction||""}
                    type="number"
                  />
                </Grid>
                <Grid item xs={1} sm={1} md={2}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="initial_quantity"
                    label="Jed.cjena."
                    name="price"
                    autoComplete="lname"
                    size="small"
                    onChange={props.updateNewData}
                    value={props.newData.price||""}
                    type="number"
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
                    Koriguj sliku
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
                    Koriguj opis
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className = {classes.submit}
                  >
                    Koriguj 
                  </Button>
                </Grid>    
              </Fragment>
            }
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default Form;