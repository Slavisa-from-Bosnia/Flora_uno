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
    width: '100%',
  
    // position: 'relative',

    // width: "40%",
    backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
    // height: 0,
    // width:'auto',
    // paddingTop: '56.25%', // 16:9,
    // marginTop:'30'
    objectFit: 'cover'

  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day,month,year].join('-');
}


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
        <Typography variant="h6" component="h2">
        {`Faktura - otpremnica broj: ${props.order_id}, datum isporuke: ${formatDate(props.shipping_date)}`}
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