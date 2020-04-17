import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  paper: {
    marginTop: theme.spacing(4),
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

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="mdlg">
      <CssBaseline />
      <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
            Kupci
        </Typography>
        <form className={classes.form} noValidate>
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
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <TextField
                variant="outlined"
                fullWidth
                name="mejl"
                label="E-mail"
                type="e-mail"
                id="email"
                autoComplete="current-password"
                size="small"
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Snimi
          </Button>
        </form>
      </div>
      
    </Container>
  );
}