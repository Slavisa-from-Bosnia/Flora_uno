import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    // margin:"30px",
    alignContent:"right",
    height: 300
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    marginBottom:35
  },
  pos: {
    marginTop: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Naziv i adresa kupca:
        </Typography>
        <Typography variant="h5" component="h2" align="center">
          {props.buyerName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" align="center">
          {props.address}
        </Typography>
        <Typography variant="body2" component="p" align="center">
          {props.city}
          {/* <br />
          {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}