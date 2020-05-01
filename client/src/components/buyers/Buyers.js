import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from './Form.js';
import Table from './Table';
import TableB from  './TableB';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 220,
    },
  }));

export default function Buyers() {
  const [trigger, setTrigger] = useState (true);

  const handleTrigger = ()=>{
    console.log("it's work.")
    setTrigger(trigger => !trigger);
    console.log(trigger);
  };
  



  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Form
                  setTrigger = {handleTrigger}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableB getTrigger={trigger}/>  
            </Grid>  
          </Grid>
        </Container>
      </main>
    </div>
  );
}