import React from "react";
// import useStyles from "./Board.style";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { changePlayer } from "../redux/playerSlice";
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
      <Row>
        <div className="mb-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {dispatch(
              changePlayer(playerState.curPlayer < 3 ? playerState.curPlayer + 1 : 0)
            )}}
          >
            Skip
          </Button>
        </div>
      </Row>
    </div>
  );
};

export default Board;
