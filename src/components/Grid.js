import React, { useState, useEffect } from "react";
import useStyles from "./Grid.styles";
import { useDispatch } from "react-redux";
import { changeEndNode } from "../redux/tileSlice";
import {
  changePlayer,
  changePlayerTile,
  startPlayer,
} from "../redux/playerSlice";

const onCell = {
  on: true,
  lock: false,
  color: "#999E9E",
};
const offCell = {
  on: false,
  lock: false,
  color: "#000000",
};

// const lockCell = {
//   on: true,
//   lock: true,
//   color: "#030FFC"
// };

const wrongCell = {
  on: true,
  lock: false,
  color: "#F50202",
};

const initialCells = Array.from({ length: 400 }, () => offCell);

const Grid = ({ playerState, tileState }) => {
  const [cells, setCells] = useState(initialCells);
  const [lastCell, setLastCell] = useState();
  const [existCells, setExistCells] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {});

  const tilesInBoard = (i) => {
    const tileMatirx =
      playerState.tiles[playerState.curPlayer][tileState.group].tiles[
        tileState.id
      ];
    let output = [];
    let rowOperator = 0;
    let colOperator = 0;
    let isEndofLine = 0;
    tileMatirx.forEach((row, rowI) => {
      rowOperator =
        rowI === 2 ? 0 : rowI <= 1 ? (2 - rowI) * 20 * -1 : (rowI - 2) * 20;
      row.forEach((col, colI) => {
        isEndofLine = colI === 2 ? 0 : colI <= 1 ? i % 20 : 20 - (i % 20) - 1;
        colOperator = colI === 2 ? 0 : colI <= 1 ? (2 - colI) * -1 : colI - 2;
        if (
          col === 1 &&
          i + rowOperator + colOperator <= 399 &&
          i + rowOperator + colOperator >= 0
        ) {
          if (colI >= 2) {
            if (isEndofLine - colOperator >= 0)
              output.push(i + rowOperator + colOperator);
          } else {
            if (colOperator + isEndofLine >= 0)
              output.push(i + rowOperator + colOperator);
          }
        }
      });
    });
    return output;
  };

  const tilesNearBy = (tiles) => {
    /**
     * determine the filter array
     * filter[0]: isInTopLine => i <= 19
     * filter[1]: isInBottomLine => i >= 380 && i <= 399
     * filter[2]: isInLeftLine => i % 20 === 0
     * filter[3]: isRightLine => (i + 1) % 20 === 0
     */
    let output = [];
    tiles.forEach((til) => {
      let filter = [
        til <= 19,
        til >= 380 && til <= 399,
        til % 20 === 0,
        (til + 1) % 20 === 0,
      ];
      // initialize the output, add qualified cell to ouput
      let temp = [til - 20, til + 20, til - 1, til + 1];
      if (filter.length > 0) {
        filter.forEach((fil, filIndex) => {
          if (
            !fil &&
            !tiles.includes(temp[filIndex]) &&
            cells[temp[filIndex]].color !==
              playerState.color[playerState.curPlayer]
          ) {
            output.push(temp[filIndex]);
          }
        });
      }
    });
    return [...new Set(output)];
  };

  const updateCell = (i) => (e) => {
    if (i === tileState.endNode && cells[i] === onCell) {
      setCells(
        cells.map((cell, cellIndex) => {
          if (
            cellIndex === tilesInBoard(i).find((item) => item === cellIndex)
          ) {
            return {
              on: true,
              lock: true,
              color: playerState.color[playerState.curPlayer],
            };
          }
          return cell;
        })
      );
      dispatch(changeEndNode());
      /**
       * for updating state
       */
      // (special case) for first step
      if (playerState.start[playerState.curPlayer]) {
        let playerStartStatus = JSON.parse(JSON.stringify(playerState.start));
        playerStartStatus[playerState.curPlayer] = false;
        dispatch(startPlayer(playerStartStatus));
      }
      let temp = JSON.parse(JSON.stringify(playerState.tiles));
      // update item array of player tiles
      temp[playerState.curPlayer][tileState.group].items = temp[
        playerState.curPlayer
      ][tileState.group].items.filter((item) => item !== tileState.id);
      // update tiles object of player tiles
      delete temp[playerState.curPlayer][tileState.group].tiles[tileState.id];
      // update object
      dispatch(changePlayerTile(temp));
      dispatch(
        changePlayer(playerState.curPlayer < 3 ? playerState.curPlayer + 1 : 0)
      );
    }
  };

  const updateDefaultCell = (i) => (e) => {
    e.preventDefault();
    cells[i] = {
      on: true,
      lock: true,
      color: playerState.color[playerState.curPlayer],
    };
    setLastCell(i);
    setLastCell(i);
  };

  const updateTarget = (i) => (e) => {
    if (tileState.dragging) {
      // 1. clear the exist cells for dragging again
      if (existCells.length > 0) {
        setCells((oldCells) => {
          existCells.forEach((item) => {
            oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell;
          });
          return oldCells;
        });
        setExistCells([]);
      }
      // 2. initialized variables
      let curTiles = tilesInBoard(i);
      let surTiles = tilesNearBy(curTiles);
      let cornTiles = [];
      let customCell = onCell;
      dispatch(changeEndNode(i));
      // 3. reset the lastcell for end dragging
      if (i === tileState.endNode || lastCell === tileState.endNode)
        setLastCell(undefined);
      // if not first step case
      if (
        !(
          playerState.start[playerState.curPlayer] &&
          curTiles.length === 5 - tileState.group &&
          curTiles.find(
            (element) =>
              element === 0 ||
              element === 19 ||
              element === 380 ||
              element === 399
          ) !== undefined
        )
      ) {
        // 4. check corner to corner rules
        curTiles.forEach((item) => {
          if (!playerState.color.includes(cells[item].color))
          {
            // for top left cocner
            if (
              surTiles.includes(item - 20) &&
              surTiles.includes(item - 1) &&
              cells[item - 21].color === playerState.color[playerState.curPlayer]
            )
              cornTiles.push(item - 21);
            // for top right cocner
            if (
              surTiles.includes(item - 20) &&
              surTiles.includes(item + 1) &&
              cells[item - 19].color === playerState.color[playerState.curPlayer]
            )
              cornTiles.push(item - 19);
            // for bottom left cocner
            if (
              surTiles.includes(item + 20) &&
              surTiles.includes(item - 1) &&
              cells[item + 19].color === playerState.color[playerState.curPlayer]
            )
              cornTiles.push(item + 19);
            // for bottom right cocner
            if (
              surTiles.includes(item + 20) &&
              surTiles.includes(item + 1) &&
              cells[item + 21].color === playerState.color[playerState.curPlayer]
            )
              cornTiles.push(item + 21);
          } else {
            customCell = wrongCell;
          }
        });
        // console.log(surTiles)
        // 5. update the custom cells by checking rules
        if (curTiles.length === 5 - tileState.group && cornTiles.length > 0)
          surTiles.forEach((item) => {
            if (
              cells[item].lock &&
              cells[item] === playerState.color[playerState.curPlayer] &&
              customCell === onCell
            ) {
              customCell = wrongCell;
            }
          });
        else customCell = wrongCell;
      }
      // 6. update tiles
      setCells((oldCells) => {
        curTiles.forEach((item) => {
          oldCells[item] = oldCells[item].lock ? oldCells[item] : customCell;
        });
        return oldCells;
      });
    }
  };

  const clearTarget = (i) => (e) => {
    if (tileState.dragging) {
      let currentTiles = tilesInBoard(i);
      // console.log('endNode: ', tileState.endNode, '; i ', i, '; lastCell ', lastCell)
      // set exist cells if mouseup
      if (e.clientX === 0 && e.clientY === 0) {
        setExistCells(currentTiles);
      }
      // clear the last cells
      else {
        let preTiles = tilesInBoard(tileState.endNode);
        setCells((oldCells) => {
          if (
            (tileState.endNode !== lastCell && tileState.endNode !== i) ||
            tileState.endNode === lastCell
          ) {
            currentTiles
              .filter((dif) => !preTiles.includes(dif))
              .forEach((item) => {
                oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell;
              });
          } else {
            currentTiles.forEach((item) => {
              oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell;
            });
          }
          return oldCells;
        });
        setLastCell(i);
      }
    }
  };

  return (
    <div>
      <div className={classes.grid}>
        {cells.map((cell, i) => (
          <div
            key={i}
            style={{ background: cell.on ? cell.color : "#FFFFFF" }}
            className={classes.cell}
            onClick={updateCell(i)}
            // onDoubleClick={(e) => console.log(i)}
            // onContextMenu={updateDefaultCell(i)}
            onDragEnter={updateTarget(i)}
            onDragLeave={clearTarget(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
