import React, { useEffect, useState, useContext } from 'react';
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Buyers from './CreateOrder';
import {SignInContext} from '../../context/auth-context';



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

  const [buyers, setBuyers]= useState([]);
  const [roses, setRoses]= useState([]);
  const [input, setInput]= useState({
    rose_id:"",
    rose_name:"",
    quantity:"",
    price:"",
    current_sum:"",
    reserved_sum:"",
  });
  const {signInData} = useContext(SignInContext);
  const {docker} = useContext(SignInContext);



  useEffect(() => {
    getBuyers();
    getRoses();
  }, []);

  // const handleInput = (input) =>{
  //   // const i_id =input.input_id +1 ;
  // //   setInput({
  // //     rose_id:"",
  // //     rose_name:"",
  // //     quantity:"",
  // //     price:"",
  // //     current_sum:"",
  // //     reserved_sum:"",
  // //     // input_id:i_id
  // //   });
  // // }


  const checkInput = () => {

    const diff = input.current_sum-input.reserved_sum;
    console.log(diff);
    
    if (input.rose_id && input.quantity && input.quantity>0 && input.quantity <= diff ){
      console.log("input validan");
      console.log (input);
      props.handleSpecification(input);
    }else{
      console.log("input nije validan");
      props.openDialog();
    }
  };
  
  const getBuyers = async () => {
    try{
      const response = await fetch(`http://${docker.connection}:5000/buyers_for_orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization:"Bearer" +" "+ signInData.token
        }
      });
      const jsonData =await response.json();
      console.log(jsonData);
      setBuyers(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };

  const getRoses = async () => {
    try{
      const response = await fetch(`http://${docker.connection}:5000/roses`);
      const jsonData =await response.json();
      setRoses(jsonData);
      console.log(jsonData);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const roseInfo =(e)=> {

    console.log(e.target);
    const roseRow = roses.filter((item) => {
      return item.rose_id == e.target.value;
    });
    console.log(roseRow);
    console.log(roseRow[0].name)
    setInput ({
      ...input,
      rose_id: roseRow[0].rose_id,
      rose_name:roseRow[0].name,
      current_sum: roseRow[0].sum,
      price: roseRow[0].price,
      reserved_sum:roseRow[0].reserved,

    })

  };

  const updateFieldS = e => {
      roseInfo(e);
  };

  const updateField = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

  };

  

  const classes = useStyles();
  // const proba = [{name:"prvi", proba_id:1},{name:"drugi", proba_id:2},{name:"treći", proba_id:3} ]
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div>
        <form className={classes.form}  >
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3} md={3} className={classes.grid}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Kupac</InputLabel>
                <Select className={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value = {input.buyer_id}
                  label="Kupac"
                  onChange={props.updateFieldData}
                  name = "buyer_id"
                >
                  {buyers.map((buyer)=> (
                    <MenuItem key={buyer.buyer_id} value ={buyer.buyer_id}>
                      {buyer.name}
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={6} sm={4} md={4}>
               <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Adresa</InputLabel>
                <Select className ={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  // value={age}

                  label="Adresa"
                  value={buyers.buyer_id}
                >
                  { buyers.map((buyer) => (
                    <MenuItem value={buyer.buyer_id} key={buyer.buyer_id}>
                     {buyer.address}
                    </MenuItem>
                  ))}
                 
               
                  
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={6} sm={4} md={2}>
            <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Način plaćanja</InputLabel>
                <Select className={classes.select}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={props.updateFieldData}
                  label="Način plaćanja"
                  name = "payment_method"
                  defaultValue={10}

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
                  // value={input.rose_id}
                  label="Artikal"
                  onChange ={updateFieldS}
                  name ="rose_id"
                > 

                 { roses.map((rose) => (
                    <MenuItem value={rose.rose_id} key={rose.rose_id}>
                     {rose.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2} sm={2} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="current_sum"
                label="Zalihe"
                type="text"
                id="email"
                autoComplete="current-password"
                size="small"
                value={input.current_sum || "" }
                InputProps={{
                  readOnly:true
                }}
               
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="reserved_sum"
                label="Rezervisano"
                type="text"
                id="email"
                autoComplete="current-password"
                value={input.reserved_sum || ""}
                size="small"
                InputProps={{
                  readOnly:true
                }}
               
              />
            </Grid>
           
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="quantity"
                label="Količina"
                type="number"
                id="quantity"
                autoComplete="current-password"
                size="small"
                onChange ={updateField}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Tooltip title="Dodaj stavku" aria-label="add">
                <Fab color="primary" className={classes.fab} size ="small" onClick={checkInput}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}
export default Form;