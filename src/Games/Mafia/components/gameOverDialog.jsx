import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import {closeDialog} from 'Games/redux-store/actions/specificGameActions/mafiaActions';
import store from 'Games/redux-store';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <h1>{children}</h1>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


function GameOverDialog(props) {
  const {showGameOverDialog, winners, closeDialog} = props;
  const [members, ] = useState(store.getState().gameData.members);
  // const [profiles, ] = useState(store.getState().playState.playerProfiles);
  let iWin = winners.indexOf(store.getState().gameData.myIndex) >= 0;
  return (
    <div>
      <Dialog className="my-dialog" onClose={closeDialog} aria-labelledby="customized-dialog-title" open={showGameOverDialog}>
        <DialogTitle>Game Over!</DialogTitle>
        <DialogContent dividers>
          <h2>{iWin ? "You've won!" : "You've lost!"}</h2>
          <div className="winners-wrapper">
            <h3 className="header">All winners:</h3>
            <div className="winners-list">
              {
                winners.map(index => {
                  const name = members[index];
                  return <h3>{name}</h3>;
                })
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  const ps = state.playState;
  const game = ps.mafia;
  return {
    showGameOverDialog: game.showGameOverDialog,
    winners: game.winners,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeDialog: () => {
      dispatch(closeDialog())
    }
  };
}

const SubscribedGameOverDialog = connect(mapStateToProps, mapDispatchToProps)(GameOverDialog);
export default SubscribedGameOverDialog;