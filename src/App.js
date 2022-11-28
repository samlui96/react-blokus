import React from 'react';
import Board from './components/Board'
import useStyles from './App.styles';
import tetrominos from './redux/constant'

const data = [
  {title:'group 1', items: ['1','2','3','4','5']},
  {title:'group 2', items: ['6','7','8','9','10']},
  {title:'group 3', items: ['11','12']}
]

function App() {
  const classes = useStyles();
  const pic = tetrominos;


  return (
    <div className={classes.app}>
      <Board data={data}/>
    </div>
  );
}

export default App;
