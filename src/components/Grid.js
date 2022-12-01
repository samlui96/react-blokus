import React, { useState, useEffect } from "react";
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
  const [preCells, setPreCells] = useState(true);
  const [flag, setFlag] = useState(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
  }, [flag])

  const tileInBoard = (i) => {
    const tileMatirx = POLYOMINOES[tileState.group].tiles[tileState.id]
    let output = []
    let rowOperator = 0
    let colOperator = 0
    tileMatirx.map((row, rowI) => {
      rowOperator = 
        rowI === 2 
          ? 0 
          : rowI <= 1 
            ? (2-rowI)*20*(-1)
            : (rowI-2)*20
      row.map((col, colI) => {
        colOperator = 
          colI === 2 
            ? 0 
            : colI <= 1 
              ? (2-colI)*(-1)
              : colI-2
        if (col === 1 && i+rowOperator+colOperator <= 399 && i+rowOperator+colOperator >= 0) {
          output.push(i+rowOperator+colOperator)
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
    // setCells((oldCells) => {
    //   oldCells[i] = oldCells[i].lock ? oldCells[i] : onCell
    //   return oldCells;
    // }) 
    let curTiles = tileInBoard(i)
    setCells((oldCells) => {
      curTiles.map((item) => {
       oldCells[item] = oldCells[item].lock ? oldCells[item] : onCell
      })
      return oldCells;
    }) 
    setPreCells(curTiles)
    console.log(i, 'for update')
  }

  const clearTarget = (i) => (e) => {
    // dispatch(changeEndNode(i))
    // setCells((oldCells) => {
    //   //let newCells = JSON.parse(JSON.stringify(oldCells));
    //   oldCells[i] = oldCells[i].lock ? oldCells[i] : offCell
    //   return oldCells;
    // }) 
    // setFlag(!flag)
    dispatch(changeEndNode(i))
    console.log(i, 'for clear')
    let preTiles = tileInBoard(i)

    setCells((oldCells) => {
      //oldCells[i] = oldCells[i].lock || oldCells[i]  ? oldCells[i] : offCell
      preTiles.map((item) => {
         oldCells[item] = oldCells[item].lock || oldCells[item] === onCell ? oldCells[item] : offCell
      })
      return oldCells;
    }) 
    setFlag(!flag)
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
