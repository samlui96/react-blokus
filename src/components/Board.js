import React from "react";
// import useStyles from "./Board.style";
import { Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from "react-redux";
import Grid from "./Grid";
import Tiles from "./Tiles";
// import POLYOMINOES from './constant'

const Board = () => {
  const tileState = useSelector(state => state.tile)
  const playerState = useSelector(state => state.player)

  return (
    <div>
        <Row>
          <Grid playerState={playerState} tileState={tileState} />
        </Row>
        <Row>
          <Tiles playerState={playerState} tileState={tileState}/>
        </Row>
    </div>
  );
};

export default Board;
