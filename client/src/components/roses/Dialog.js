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
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">{"Jesi li siguran da želiš da izbrišeš kupca?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
  {`Ruža ${props.rowData.name} biće izbrisana iz baze podataka!`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeOpen} color="primary">
            Odustani
          </Button>
          <Button onClick={props.handleCloseDialog} color="primary" autoFocus>
            Briši
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
