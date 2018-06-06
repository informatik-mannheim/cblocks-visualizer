import React from 'react';
import CBlocksAppBar from './CBlocksAppBar.js';
import Canvas from './Canvas';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from '../component/CustomDragLayer';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#a3445d',
      main: '#8d2d56',
      dark: '#2b193e',
      contrastText: '#fff'
    },
    secondary: {
      light: '#d52c3c',
      main: '#d52c3c',
      dark: '#d52c3c',
      contrastText: '#000'
    }
  }
});

class App extends React.Component {
  render (){
    return (
      <MuiThemeProvider theme={theme}>
        <CBlocksAppBar />
        <Canvas/>
        <CustomDragLayer/>
      </MuiThemeProvider>
    );
  }
}

const dragDropApp = DragDropContext(HTML5Backend)(App);
//export default withStyles(styles)(dragDropApp);
export default dragDropApp;
