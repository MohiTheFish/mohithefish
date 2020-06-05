import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Loading from 'components/Loading/loading';
import { setSelectedChoice, setIsLoadingRoom } from 'redux/actions/gameActions';
import { createRoom } from '../socketHandlers';

const CREATE = 'create';
const JOIN = 'join';

function setDisableProps(obj) {
  obj.className += " disabled";
  obj.variant = "outlined";
}

function ConnectedChoices(props) {
  const { isConnected, selectedChoice, handleSelect } = props;
  if (!isConnected) { return <Loading />; }

  const createButtonProps = {
    variant: "contained",
    className: "button",
    onClick: () => handleSelect(CREATE),
  };
  const joinButtonProps = {
    variant: "contained",
    className: "button",
    onClick: () => handleSelect(JOIN),
  };


  if (selectedChoice === CREATE) {
    setDisableProps(joinButtonProps);
    delete createButtonProps.onClick;
  }
  else if (selectedChoice === JOIN) {
    setDisableProps(createButtonProps);
    delete joinButtonProps.onClick;
  }
  return (
    <div className="connected-choices">
      <Button 
        disableFocusRipple={true}
        color="primary"
        {...createButtonProps}
        >Create Room</Button>
      <Button 
        disableFocusRipple={true}
        color="primary"
        {...joinButtonProps}
        >Join Room</Button>
    </div>
  );
}

function mapStateToPropsCC(state) {
  const gd = state.gameData;
  return {
    isConnected: gd.isConnected,
    selectedChoice: gd.selectedChoice
  }
}

function mapDispatchToPropsCC(dispatch) {
  return {
    handleSelect: (e) => {
      console.log(e);
      dispatch(setSelectedChoice(e));
      dispatch(setIsLoadingRoom(true));
      if(e === CREATE) {
        createRoom();
      }
    }
  }
}
const SubscribedConnectedChoices = connect(mapStateToPropsCC, mapDispatchToPropsCC)(ConnectedChoices);
export default SubscribedConnectedChoices;