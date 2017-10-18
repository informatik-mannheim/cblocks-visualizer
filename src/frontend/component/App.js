import React from 'react';
import PurpleAppBar from './PurpleAppBar.js';
import SuccessButton from './SuccessButton.js';
import { Button } from 'react-toolbox/lib/button';

const App = () => (
  <div>
    <PurpleAppBar />
    <section style={{ padding: 20 }}>
      <SuccessButton label='Success' primary raised />
      <Button label='Primary Button' primary />
    </section>
  </div>
);

export default App;
