import React from 'react';
import CBlocksAppBar from './app/CBlocksAppBar.js';
import Canvas from './app/Canvas';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from './app/CustomDragLayer';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ModalRoot from './app/ModalRoot';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#B1557C',
      main: '#8D2D55',
      dark: '#691035',
      contrastText: '#fff'
    },
    secondary: {
      light: '#489665',
      main: '#267845',
      dark: '#0E592A',
      contrastText: '#fff'
    }
  },
  overrides: {
    MuiCard: {
      root: {
        borderRadius: 10
      }
    },
    MuiCardHeader: {
      root: {
        background: '#691035'
      },
      title: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '1.35417em'
      }
    },
    MuiCardContent: {
      root: {}
    },
    Slider: {
      root: {
      }
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
        <ModalRoot/>
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
