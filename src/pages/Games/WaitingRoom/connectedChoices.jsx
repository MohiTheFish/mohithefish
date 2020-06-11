import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Loading from 'components/Loading/loading';
import { setSelectedChoiceAndLoadingRoom } from 'redux/actions/gameActions';
import { getAvailableRooms, informOtherRoomMembers } from '../socketHandlers';
import { lobbyStates } from 'redux/actions/gameActions';

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
    onClick: () => handleSelect(lobbyStates.CREATE),
  };
  const joinButtonProps = {
    variant: "contained",
    className: "button",
    onClick: () => handleSelect(lobbyStates.JOIN),
  };


  if (selectedChoice === lobbyStates.CREATE || selectedChoice === lobbyStates.CREATED) {
    setDisableProps(joinButtonProps);
    delete createButtonProps.onClick;
    createButtonProps.disableRipple = true;
  }
  else if (selectedChoice === lobbyStates.JOIN || selectedChoice === lobbyStates.JOINED) {
    setDisableProps(createButtonProps);
    delete joinButtonProps.onClick;
    joinButtonProps.disableRipple = true;
  }
  return (
    <div className="connected-choices">
      <Button 
        color="primary"
        disableElevation
        {...createButtonProps}
        >Create Room</Button>
      <Button 
        color="primary"
        disableElevation
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
      if(e === lobbyStates.CREATE) {
        informOtherRoomMembers();
      }
      if(e === lobbyStates.JOIN) {
        getAvailableRooms();
      }
      dispatch(setSelectedChoiceAndLoadingRoom(e));
    }
  }
}
const SubscribedConnectedChoices = connect(mapStateToPropsCC, mapDispatchToPropsCC)(ConnectedChoices);
export default SubscribedConnectedChoices;