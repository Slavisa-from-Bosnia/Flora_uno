import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  return (
    <div>
       
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Neispravan unos korekcije!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Korigovana količina ne može biti veća od stanja na skladištu`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeOpen} color="primary">
            OK
          </Button>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}