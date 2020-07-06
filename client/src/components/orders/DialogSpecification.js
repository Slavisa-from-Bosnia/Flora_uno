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
        onClose={props.closeOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Nepravilan unos!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Jedna ili više pozicija stavke specifikacije koja se unosi, provjeri unose!`}
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