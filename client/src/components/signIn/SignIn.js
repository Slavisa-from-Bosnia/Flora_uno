import React, {useState, useEffect, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import rosesImages from '../../static/images/roses.jpg';
import {Redirect, useHistory} from 'react-router-dom';
import Orders from '../orders/Orders';
import {SignInContext} from '../../context/auth-context';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${rosesImages})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {

  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

    // const [imgs, setImgs]= useState();

  // useEffect (()=>{
  //   fetchImage();
  // }, []);
    const classes = useStyles();
  //   const fetchImage = () =>{
  //     fetch(`https://api.unsplash.com/photos?query=roses&client_id=F-juXhRNetnMUiF-yY-lZP7oXuKhdT0ngxx5krIS8aI`)
  //       .then(res => res.json())
  //       .then(data => {
  //         this.setImgs({data});
  //         console.log( "getting images"+imgs);
  //       })
  //       .catch(err =>{
  //         console.log('Error happened during fetching!',err);
  //       });
  //   }
  let history = useHistory();
  const clickSignIn = () => {
    isThereUser(signInData);
    
    // if(signInData.email === "pirossi" && signInData.password === "pirossi"){
    //   history.push('/dashboard/orders/Orders');
      
    // } else {
    //   console.log("false");
    // }
  };

  // const postUser =async (data) => {
  //     try{
  //       const response = await fetch("http://localhost:5000/insertUser", {
  //         method: "POST",
  //         headers: {"Content-Type": "application/json"},
  //         body: JSON.stringify(data)
  //       });
  //       const jsonData = await response.json();
  //       console.log(jsonData);
  //     } catch (err) {
  //       console.error(err.message);
  //     }  
  // };
  const {addData} = useContext(SignInContext);
  const isThereUser = async (data) => {
    try{
      const response = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const jsonData =await response.json();
      if(jsonData){
        console.log(jsonData.token);
        addData(jsonData.token);
        history.push('/dashboard/orders/Orders');
      } else {
      console.log(`ne postoje podaci ${jsonData}`);
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  const changeData = e => { 
    setSignInData({
      ...signInData,
      [e.target.name]:e.target.value
    });
    console.log(e.target.value);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={changeData}
              value={signInData.email||""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changeData}
              value={signInData.password||""}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={clickSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}