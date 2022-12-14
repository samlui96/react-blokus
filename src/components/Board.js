import React from "react";
// import useStyles from "./Board.style";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { changePlayer, endPlayer } from "../redux/playerSlice";
import Grid from "./Grid";
import Tiles from "./Tiles";
// import POLYOMINOES from './constant'

const Board = () => {
  const dispatch = useDispatch();
  const tileState = useSelector((state) => state.tile);
  const playerState = useSelector((state) => state.player);
  return (
    <div>
      <Row>
        <Grid playerState={playerState} tileState={tileState} />
      </Row>
      <Row>
        <Tiles playerState={playerState} tileState={tileState} />
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              dispatch(changePlayer(playerState.curPlayer));
            }}
          >
            Skip
          </Button>
        </Col>
        <Col md="auto">
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              dispatch(endPlayer(playerState.curPlayer));
              dispatch(changePlayer(playerState.curPlayer));
            }}
          >
            Lose
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Board;
