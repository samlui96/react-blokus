import React from 'react';
import Board from './components/Board'
import useStyles from './App.styles';

function App() {
  const classes = useStyles();


  return (
    <div className={classes.app}>
      <Board/>
    </div>
  );
}

export default App;
