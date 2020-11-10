import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';

import store from 'Games/redux-store';
import { sendMafiaMessage } from 'Games/socketHandlers';

const ENTER_KEY = 13;

export default function TextInput() {
  const [message, setMessage] = useState("");
  const [myIndex, ] = useState(store.getState().gameData.myIndex)
  const preventDefault = (e) => {
    e.preventDefault();
  }

  function handleKeyPress(e) {
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY) {
      submit();
    }
  }

  function submit() {
    if(Boolean(message)) { //length greater than 0
      sendMafiaMessage(message, myIndex);
      setMessage("");
    }
  }
  
  return (
    <FormControl id="event-recap-input" variant="outlined">
      <Input
        className="event-input"
        id="standard-basic"
        value={message}
        onChange={(e) => {setMessage(e.target.value);}}
        onKeyPress={handleKeyPress}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="icon-color"
              children={<ArrowForward />}
              onClick={submit}
              size="small"
              onMouseDown={preventDefault}
              edge="end"
            />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

