import React from 'react';
import {connect} from 'react-redux';
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

function mapStateToProps(state) {
  return {
    roleCount: state.playState.mafia.roleCount
  };
}
function RoleCount(props) {
  const roles = [];
  const { mafiaCount, villagerCount, jokerCount, skCount, crazyExCount} = props.roleCount;
  if (mafiaCount) {
    roles.push(
      <RoleItem key="mafia">
        <RoleName>Mafia</RoleName>
        <RoleValue>{mafiaCount}</RoleValue>
      </RoleItem>
    );
  };
  if (villagerCount) {
    roles.push(
      <RoleItem key="villager">
        <RoleName>Villager</RoleName>
        <RoleValue>{villagerCount}</RoleValue>
      </RoleItem>
    );
  };
  if (jokerCount) {
    roles.push(
      <RoleItem key="joker">
        <RoleName>Joker</RoleName>
        <RoleValue>{jokerCount}</RoleValue>
      </RoleItem>
    );
  };
  if (skCount) {
    roles.push(
      <RoleItem key="sk">
        <RoleName>SK</RoleName>
        <RoleValue>{skCount}</RoleValue>
      </RoleItem>
    )
  }
  if (crazyExCount) {
    roles.push(
      <RoleItem key="crazy-ex">
        <RoleName>Crazy Ex</RoleName>
        <RoleValue>{crazyExCount}</RoleValue>
      </RoleItem>
    )
  }
  return (
    <div className="papermui role-count-wrapper">
      <h2>Role Distribution</h2>
      {roles}
    </div>
  )
}

const SubscribedRoleCount = connect(mapStateToProps)(RoleCount);
export default SubscribedRoleCount;