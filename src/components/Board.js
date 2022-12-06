import React from "react";
// import useStyles from "./Board.style";
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from "react-redux";
import Grid from "./Grid";
import Tiles from "./Tiles";
// import POLYOMINOES from './constant'

const Board = () => {
  const state = useSelector(state => state.tile)

  return (
    <div>
        <Row>
          <Grid tileState={state} />
        </Row>
        <Row>
          <Tiles tileState={state}/>
        </Row>
    </div>
  );
};

export default Board;
