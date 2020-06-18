import React from 'react';

export function SettingsItem({children}) {
  return (
    <div className="settings-item">
      {children}
    </div>
  )
} 

export function SettingsName({children}) {
  return (
    <div className="item-name">
      <h3>{children}</h3>
    </div>
  )
}

export function SettingsValue({children}) {
  return (
    <div className="item-value">
      <h3>{children}</h3>
    </div>
  )
}