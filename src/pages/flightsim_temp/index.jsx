import React from 'react';
// https://rtyley.github.io/bfg-repo-cleaner/
export default function FlightSimIndex() {
  return (
    <div id="flightsim-div-wrapper">
      <h1>Coming Soon</h1>
    
      <form id="input_form" style={{flexGrow: 1, margin: '0 20px'}}>
          <div>
              <h2>Controls</h2>
              <ul>
                  <li>Control the PITCH of the camera (tilt up and down) with the <b>w</b> and <b>s</b> keys, or the <b>up</b> and <b>down</b> arrows.</li>
                  <li>Control the ROLL of the camera (turn sideways) with the <b>z</b> and <b>x</b> keys, or the <b>left</b> and <b>right</b> arrows</li>
                  <li>Control the YAW of the camera (swivel) with the <b>a</b> and <b>d</b> keys.</li>
                  <li>Increase and Decrease the speed with the <b>=</b> and <b>-</b> keys (respectively)</li>
                  <li>Press the "ESC" key to reset the camera position and orientation.</li>
                  <li>You can enable or disable fog with the checkbox next to "Enable Fog"</li>
                  <li>With "Continuous Update" enabled, you can hold down the keys to change the values. (When disabled, you will have to spam the key.)</li>
              </ul>
          </div>
          <fieldset>
              <legend>Rendering Options</legend>
              <div>
                  <input type="radio" name="primitive" id="wireframe" value="wireframe"/ > Wireframe
                  <input type="radio" name="primitive" id="polygon" value="polygon" defaultChecked /> Polygon
                  <input type="radio" name="primitive" id="wirepoly" value="wirepoly" /> Polygon with Edges
              </div>
              <div>
                  <input type="checkbox" id="fog" name="fog" defaultChecked={true}/>
                  <label htmlFor="fog">Enable Fog</label>
              </div>
              <div>
                  <input type="checkbox" id="continuous-update" name="continuous-update" defaultChecked/>
                  <label htmlFor="continuous-update">Continuous Update?</label>
              </div>
              <div>
                  <p id="cam_speed">Current Camera Speed: </p>
                  <p id="pitch">Current Pitch Speed: </p>
                  <p id="roll">Current Roll Speed: </p>
                  <p id="yaw">Current Yaw Speed: </p>
              </div>
          </fieldset>
      </form>
  </div>
  );
}