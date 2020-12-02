import React, { useEffect, Fragment, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import Description from '@material-ui/icons/Description';
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

  const [isNew, setNew] = useState (false);

  const {signInData} = useContext(SignInContext);
  const {docker} = useContext(SignInContext);



  useEffect(() => {
   if (props.editData){
      props.handleNewData({
        name:props.rowData.name,
        sum:props.rowData.sum,
        imageUrl:props.rowData.imageUrl,
        description: props.rowData.description,
        rose_id:props.rowData.rose_id,
        price: props.rowData.price,
        reserved:props.rowData.reserved,
        correction: "0",
      });
    } else {
        props.handleNewData ({
          name:"",
          initial_quantity:"",
          image_url:"",
          description:"",
          rose_id:"",
          price:"",
          reserved:"",
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
        console.log(data);
        const response = await fetch(`http://${docker.connection}:5000/roses`, {
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
        props.getRoses();
        props.handleNewData({
          name:"",
          initial_quantity:"",
          image_url:"",
          description:"",
          rose_id:"",
          price:"",
          reserved:"",
          correction: "0",
          sum:""
        });
      } catch (err) {
        console.error(err.message);
      }
     }   else{
      e.preventDefault();
      try{
        const data = props.newData;
        console.log(data);
        const response = await fetch(`http://${docker.connection}:5000/roses/:${data.rose_id}`, {
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
        props.getRoses();
        props.handleNewData({
          name:"",
          initial_quantity:"",
          image_url:"",
          description:"",
          rose_id:"",
          price:0,
          reserved:"",
          correction: "0",
          sum:"",
        });
        
        props.editDataHendler();
        console.log(response);
        
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  
  const closeDialogIsValid = ()=> {
    setNew(false);
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
                <Grid item xs={12} sm={6} md={2}>
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
                <Grid item xs={12} sm={6} md={2}>
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
                <Grid item xs={12} sm={6} md={2}>
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
                {/* <Grid item xs={12} sm={6} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    startIcon={<InsertPhotoIcon />}
                  >
                    Unesi sliku
                  </Button>
                </Grid> */}
                <Grid item xs={12} sm={6} md={2}>
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
                <Grid item xs={12} sm={6} md={2}>
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
                <Grid item xs={12} sm={6} md={2}>
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
                <Grid item xs={12} sm={6} md={2}>
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
                {/* <Grid item xs={3} sm={3} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<InsertPhotoIcon />}
                  >
                    Koriguj sliku
                  </Button>
                </Grid> */}

                <Grid item xs={12} sm={6} md={2}>
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

      <DialogIsValid open = {isNew} closeOpen = {closeDialogIsValid}/>

    </Container>
  );
}
export default Form;