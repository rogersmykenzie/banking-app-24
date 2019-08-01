import React from 'react';
//routes
import routes from './routes';
//components
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
