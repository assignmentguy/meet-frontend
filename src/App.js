import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import MeetComponent from './components/meet-component'



function App() {
  return (
<BrowserRouter>
<div>
  <MeetComponent></MeetComponent>
</div>
</BrowserRouter>
  );
};

export default App;
