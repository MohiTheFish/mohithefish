import React from 'react';
import Paper from '@material-ui/core/Paper';
import './roleCount.scss';
function RoleName(props) {
  return (
    <div className="name">
      <p>{props.children}</p>
    </div>
  )
}
function RoleValue(props) {
  return (
    <div className="value">
      <p>{props.children}</p>
    </div>
  );
}
function RoleItem(props) {
  return (
    <div className="role-item">
      {props.children}
    </div>
  )
}

export default function RoleCount(props) {
  return (
    <Paper className="role-count-wrapper">
      <h2>Role Distribution</h2>
      <RoleItem>
        <RoleName>Mafia</RoleName>
        <RoleValue>2</RoleValue>
      </RoleItem>
      <RoleItem>
        <RoleName>Village</RoleName>
        <RoleValue>7</RoleValue>
      </RoleItem>
    </Paper>
  )
}