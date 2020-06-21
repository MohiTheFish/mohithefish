import React, {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';

const ENTER_KEY = 13;

export default function TextInput() {
  const [roomId, setRoomId] = useState("");
  const preventDefault = (e) => {
    e.preventDefault();
  }

  function handleKeyPress(e) {
    if (e.which === ENTER_KEY || e.keyCode === ENTER_KEY) {
      // submit();
    }
  }
  
  return (
    <FormControl id="event-recap-input" variant="outlined">
      <Input
        className="event-input"
        id="standard-basic"
        multiline
        
        value={roomId}
        onChange={(e) => {setRoomId(e.target.value);}}
        onKeyPress={handleKeyPress}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              className="icon-color"
              children={<ArrowForward />}
              // onClick={submit}
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

