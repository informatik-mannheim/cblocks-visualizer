import React from 'react';
import CBlocksAppBar from './app/CBlocksAppBar.js';
import Canvas from './app/Canvas';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from './app/CustomDragLayer';
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
      light: '#DD302A',
      main: '#DD302A',
      dark: '#DD302A',
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
        background: '#a3445d'
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
      </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
