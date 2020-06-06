import React from 'react';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const Footer = () => (
  <Paper style={{ 'position': 'fixed', 'left': 0, 'bottom': 0, 'right': 0, 'height': 64, 'zIndex': 9000 }}>
    <Toolbar>
      <Typography type="title" style={{ 'position': 'fixed', 'right': 10 }}>
        {'© Scott Rocha, 2017-' + new Date().getFullYear()}
      </Typography>
    </Toolbar>
  </Paper>
);

export default Footer;
