import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function AlertDialog(props) {
  return (
    <div>
       
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">{"Unesi opis!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
            placeholder="Maksimalno 1000 karaktera"
            multiline
            rows={10}
            rowsMax={10}
            fullWidth={true}
            label="Opis proizvoda"
            variant="outlined"
/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <Button onClick={props.handleCloseDescription} color="primary" autoFocus>
            Zatvori
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}