import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import theme from './AddButton.css';

const AddButton = (props) => <Button {...props} theme={theme} icon='add' />;
export default AddButton;
