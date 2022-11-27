import React from "react";
import useStyles from "./Board.style";
import {Container ,Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Grid from "./Grid";
import Tiles from "./Tiles";

const Board = ({data}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Container>
      <Row>
        <Grid />
      </Row>
      <Row>
        <Tiles data={data} />
      </Row>
      </Container>
    </div>
  );
};

export default Board;
