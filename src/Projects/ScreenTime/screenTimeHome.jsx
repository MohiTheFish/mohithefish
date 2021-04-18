import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ScreenTimeEditor from './screenTime';
import ScreenTimeVisualizor from './screenTimeVisualizor';

import './screenTimeHome.scss';


export default function ScreenTimeHome() {

  const [editData, setEditData] = useState(false);

  return (
    <div className="screentime-wrapper">
      <header>
        <h1>Screentime</h1>
        <Button color="primary" variant="contained" onClick={() => setEditData(!editData)}> {editData ? 'View Visualization' : 'Edit Data'}</Button>
      </header>
      {
        editData
        ? <ScreenTimeEditor />
        : <ScreenTimeVisualizor />
      }
    </div>
  )
}