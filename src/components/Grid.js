import React, { useState } from "react";
import useStyles from "./Grid.styles";
import { useDispatch } from "react-redux";
import { changeEndNode } from "../redux/tileSlice";
import POLYOMINOES from './constant'

const onCell = {
  on: true,
  lock: false,
  color: "#F58207"
};
const offCell = {
  on: false,
  lock: false,
  color: "#000000"
};

const greenCell = {
  on: false,
  lock: false,
  color: "#0FF507"
};

const redCell = {
  on: false,
  lock: false,
  color: "#FF0000"
};

const initialCells = Array.from({ length: 400 }, () => offCell);

const Grid = ( {tileState} ) => {
  const [cells, setCells] = useState(initialCells);
  const [preCell, setPreCell] = useState();

  const classes = useStyles();
  const dispatch = useDispatch();


  const tileInBoard = (i) => {
    const tileMatirx = POLYOMINOES[tileState.group].tiles[tileState.id]
    let output = []
    let rowOperator = 0
    let colOperator = 0
    let isEndofLine = 0
    tileMatirx.map((row, rowI) => {
      rowOperator = 
        rowI === 2 
          ? 0 
          : rowI <= 1 
            ? (2-rowI)*20*(-1)
            : (rowI-2)*20
      row.map((col, colI) => {
        isEndofLine = 
          colI === 2 
          ? 0 
          : colI <= 1
            ? i % 20
            : 20 - i % 20 - 1
        colOperator = 
          colI === 2 
            ? 0 
            : colI <= 1 
              ? (2-colI)*(-1)
              : colI-2
        if (col === 1 && i+rowOperator+colOperator <= 399 && i+rowOperator+colOperator >= 0) {
          if (colI >= 2) {
            if (isEndofLine - colOperator >= 0)
              output.push(i+rowOperator+colOperator)
          } else {
            if (colOperator + isEndofLine  >= 0)
              output.push(i+rowOperator+colOperator)
          }
        }    
      })
    })
    return output
  }

  const updateCell = (i, defaultState) => (e) => {
    e.preventDefault()
    setCells(
      cells.map((cell, cellIndex) => {
        if (cellIndex === tileInBoard(i).find(item => item === cellIndex)) {
          return {
            on: true,
            lock: true,
            color: "#FF0000",
          };
        }
        return cell;
      })
    );
  };

  const updateTarget = (i) => (e) => {
    dispatch(changeEndNode(i))
    let curTiles = tileInBoard(i)
    setCells((oldCells) => {
      curTiles.map((item) => {
      oldCells[item] = oldCells[item].lock ? oldCells[item] : onCell
      })
      return oldCells;
    }) 
  }

  const clearTarget = (i) => (e) => {
    let preTiles = tileInBoard(tileState.endNode)
    let currentTiles = tileInBoard(i)
    // console.log('precell: ', preCell, '; i: ', i, '; endNode: ', tileState.endNode, )
    setCells((oldCells) => {
      if ((tileState.endNode !== preCell && tileState.endNode !== i) 
          || (tileState.endNode === preCell)) {
        currentTiles.filter(dif => !preTiles.includes(dif)).map((item) => {
        oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell
        })
      }
      else {
        currentTiles.map((item) => {
          oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell
          })
      }
      return oldCells;
    }) 
    setPreCell(i)
  }

  return (
    <div>
        <div className={classes.grid}>
          {cells.map((cell, i) => (
            <div
              key={i}
              style={{ background: cell.on ? cell.color : "#FFFFFF" }}
              className={classes.cell}
              onClick={updateCell(i)}
              onContextMenu={updateCell(i, offCell)}
              onDragEnter={updateTarget(i)}
              onDragLeave={clearTarget(i)}
            ></div>
          ))}
        </div>
    </div>
  );
};

export default Grid;
