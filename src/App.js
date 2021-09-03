import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Meet from './components/meet-component'



function App() {
  return (
    <BrowserRouter>
      <div>
        <Meet></Meet>
      </div>
    </BrowserRouter>
  );
};

export default App;
