import React, {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';

import {joinRoom} from '../../socketHandlers';

const ENTER_KEY = 13;

export default function TextInput() {
  const [roomId, setRoomId] = useState("");
  const preventDefault = (e) => {
    e.preventDefault();
  }

  function submit() {
    joinRoom(roomId);
  }
  function handleKeyPress(e) {
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY) {
      submit();
    }
  }
  
  return (
    <FormControl className="form-wrapper" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-roomid">Room ID</InputLabel>
      <OutlinedInput
        id="outlined-adornment-roomid"
        value={roomId}
        onChange={(e) => {setRoomId(e.target.value);}}
        onKeyPress={handleKeyPress}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              children={<ArrowForward />}
              onClick={submit}
              onMouseDown={preventDefault}
              edge="end"
            />
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  )
}

