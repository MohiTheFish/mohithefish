import React, { useState } from 'react';

/**
 * Basic toggle hook.
 * @param {Boolean} initialState enabled or disabled at start
 */
export default function useToggleState(initialState) {
  const [state, setState] = useState(initialState);
  return [state, toggle] = [state, setState(!state)];
}