import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';
//import Logo from './Logo.js';
import theme from './PurpleAppBar.css';
import logo from '../img/CBlocks_v1.png';

const PurpleAppBar = ({ children, ...other }) => (
  <AppBar {...other} theme={theme}>
    <img src={logo} />
    {children}
  </AppBar>
);

PurpleAppBar.propTypes = {
  children: PropTypes.node
};

export default PurpleAppBar;
