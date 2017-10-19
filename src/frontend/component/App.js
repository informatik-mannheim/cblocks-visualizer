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
    <section style={{ padding: 20 }}>
      <SuccessButton label='Success' primary raised />
      <Button label='Primary Button' primary />
    </section>
  </div>
);

export default DragDropContext(HTML5Backend)(App);
