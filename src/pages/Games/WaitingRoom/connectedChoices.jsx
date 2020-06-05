import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Loading from 'components/Loading/loading';
import { setSelectedChoice, setIsLoadingRoom } from 'redux/actions/gameActions';

function setDisableProps(obj) {
  obj.className += " disabled";
  obj.variant = "outlined"
}

function ConnectedChoices(props) {
  const { isConnected, selectedChoice, handleSelect } = props;
  if (!isConnected) { return <Loading />; }

  const createButtonProps = {
    variant: "contained",
    className: "button",
  };
  const joinButtonProps = {
    variant: "contained",
    className: "button",
  };


  if (selectedChoice === "create") {
    setDisableProps(joinButtonProps);
  }
  else if (selectedChoice === "join") {
    setDisableProps(createButtonProps);
  }
  return (
    <div className="connected-choices">
      <Button 
        disableFocusRipple={true}
        color="primary"
        {...createButtonProps}
        onClick={() => handleSelect('create')}>Create Room</Button>
      <Button 
        disableFocusRipple={true}
        color="primary"
        {...joinButtonProps}
        onClick={() => handleSelect('join')}>Join Room</Button>
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
    }
  }
}
const SubscribedConnectedChoices = connect(mapStateToPropsCC, mapDispatchToPropsCC)(ConnectedChoices);
export default SubscribedConnectedChoices;