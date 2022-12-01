import React from "react";
// import useStyles from "./Board.style";
import {Container ,Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from "react-redux";
import Grid from "./Grid";
import Tiles from "./Tiles";
// import POLYOMINOES from './constant'

const Board = () => {
  const state = useSelector(state => state.tile)
  // const id = useSelector((state) => state.tile.id);
  // const group = useSelector((state) => state.tile.group);
  // const endNode = useSelector((state) => state.tile.endNode);

  return (
    <div>
      <Container>
        <Row>
          <Grid tileState={state} />
        </Row>
        <Row>
          <Tiles tileState={state}/>
        </Row>
      </Container>
    </div>
  );
};

export default Board;
