import React from 'react';
import PurpleAppBar from './PurpleAppBar.js';
import SuccessButton from './SuccessButton.js';
import { Button } from 'react-toolbox/lib/button';
import Canvas from './Canvas';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from './CustomDragLayer';

const App = () => (
  <div>
    <PurpleAppBar />
    <Canvas/>
    <CustomDragLayer/>
  </div>
);

export default DragDropContext(HTML5Backend)(App);
