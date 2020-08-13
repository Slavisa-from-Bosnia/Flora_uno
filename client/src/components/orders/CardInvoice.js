import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { requirePropFactory, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    margin:"auto",
    alignContent:"right"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12
  },
  media: {
    height: 160,
    width: '80%',
    position: 'relative',

    // width: "40%",
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image= {require("../../static/images/logo.jpg")}
          title="Contemplative Reptile"
        />
         <Typography className={classes.pos} variant="body2" component="p" color="textSecondary">
          Novo Naselje bb, 76330 Ugljevik, PDV broj _______, tel: 065 -     /    
        </Typography>
        <Typography variant="h5" component="h2">
          Faktura - otpremnica broj: ____________
        </Typography>
       
        {/* <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}