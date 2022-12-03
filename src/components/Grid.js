import React, { useState, useRef } from "react";
import useStyles from "./Grid.styles";
import { useDispatch } from "react-redux";
import { changeEndNode } from "../redux/tileSlice";
import POLYOMINOES from './constant'

const onCell = {
  on: true,
  lock: false,
  color: "#999E9E"
};
const offCell = {
  on: false,
  lock: false,
  color: "#000000"
};

const lockCell = {
  on: true,
  lock: true,
  color: "#030FFC"
};

const wrongCell = {
  on: true,
  lock: false,
  color: "#F50202"
};

const initialCells = Array.from({ length: 400 }, () => offCell);

const Grid = ( {tileState} ) => {
  const [cells, setCells] = useState(initialCells);
  const [lastCell, setLastCell] = useState();
  const [existCells, setExistCells] = useState([]);
  const [isAllow, setIsAllow] = useState(true);

  const classes = useStyles();
  const dispatch = useDispatch();

  const tileInBoard = (i) => {
    const tileMatirx = POLYOMINOES[tileState.group].tiles[tileState.id]
    let output = []
    let rowOperator = 0
    let colOperator = 0
    let isEndofLine = 0
    tileMatirx.forEach((row, rowI) => {
      rowOperator = 
        rowI === 2 
          ? 0 
          : rowI <= 1 
            ? (2-rowI)*20*(-1)
            : (rowI-2)*20
      row.forEach((col, colI) => {
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

  const updateCell = (i) => (e) => {
  // e.preventDefault()
  if (i === tileState.endNode) {
    setCells(
      cells.map((cell, cellIndex) => {
        if (cellIndex === tileInBoard(i).find(item => item === cellIndex)) {
          return lockCell;
        }
        return cell;
      })
    );
    dispatch(changeEndNode())
  }
  };
  
  const updateTarget = (i) => (e) => {
    // clear the exist cells
    if (existCells.length > 0) {
      setCells((oldCells) => {
        existCells.forEach((item) => {
          oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell
          })
        return oldCells;
      })
      setExistCells([])
    }
    // update the dragging cells 
    if ((i === tileState.endNode || lastCell === tileState.endNode))
      setLastCell(undefined)
    dispatch(changeEndNode(i))
    let curTiles = tileInBoard(i)
    let customCell
    setCells((oldCells) => {
        if (curTiles.length === 5) {
          customCell = onCell
          setIsAllow(curTiles.length === 5)
        } else {
          customCell = wrongCell
          setIsAllow(false)
        }  
        curTiles.forEach((item) => {
            oldCells[item] = oldCells[item].lock 
              ? oldCells[item] 
              : customCell
          })
      return oldCells;
    })
  }

  const clearTarget = (i) => (e) => {
    let currentTiles = tileInBoard(i)
    //console.log('endNode: ', tileState.endNode, '; i ', i, '; lastCell ', lastCell)
    // set exist cells if mouseup
    if ((e.clientX === 0 && e.clientY === 0) && isAllow) {
      setExistCells(currentTiles)
    } 
    // clear the last cells
    else {  
      let preTiles = tileInBoard(tileState.endNode)
      setCells((oldCells) => {
        if ((tileState.endNode !== lastCell && tileState.endNode !== i) 
            || (tileState.endNode === lastCell)) {
          currentTiles.filter(dif => !preTiles.includes(dif)).forEach((item) => {
            oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell
          })
        } else {
          currentTiles.forEach((item) => {
            oldCells[item] = oldCells[item].lock ? oldCells[item] : offCell
            })
        }
        return oldCells;
      }) 
      setLastCell(i)
    }
  }

  return (
    <div>
        <div className={classes.grid} >
          {cells.map((cell, i) => (
            <div
              key={i}
              style={{ background: cell.on ? cell.color : "#FFFFFF" }}
              className={classes.cell}
              onClick={updateCell(i)}
              onDragEnter={updateTarget(i)}
              onDragLeave={clearTarget(i)}
            ></div>
          ))}
        </div>
    </div>
  );
};

export default Grid;
