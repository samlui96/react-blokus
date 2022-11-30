import React from "react";
// import useStyles from "./Board.style";
import {Container ,Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Grid from "./Grid";
import Tiles from "./Tiles";

const Board = () => {
  // const classes = useStyles();
  return (
    <div>
      <Container>
        <Row>
          <Grid />
        </Row>
        <Row>
          <Tiles />
        </Row>
      </Container>
    </div>
  );
};

export default Board;
