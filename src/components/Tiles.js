import React, { useState, useRef, useEffect } from "react";
import useStyles from "./Tiles.styles";
import { useDispatch } from "react-redux";
import {
  changeGroup,
  changeTile,
  changeEndNode,
  changeDragging,
} from "../redux/tileSlice";
import { ListGroup, Tabs, Tab, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cell from "./Cell";
import { changePlayerTile } from "../redux/playerSlice";

const Tiles = ({ playerState, tileState }) => {
  const [list, setList] = useState([
    playerState.tiles[playerState.curPlayer][tileState.group],
  ]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(() => {
    setList([playerState.tiles[playerState.curPlayer][tileState.group]]);
  }, [tileState]);

  const handleSelect = (key) => {
    dispatch(changeGroup(key));
    dispatch(changeEndNode());
    setList([playerState.tiles[playerState.curPlayer][key]]);
  };

  const handleDragStart = (e, params) => {
    dispatch(changeTile(list[params.grpI].items[params.itemI]));
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      dispatch(changeDragging(true));
    }, 0);
  };

  function getArray2dCW(a, x, y) {
    var t = x;
    x = y;
    y = a.length - t - 1;
    return a[y][x];
  }

  const changeTilePos = (e, params) => {
    e.preventDefault()
    let tempList = JSON.parse(JSON.stringify(list))
    let tempPlayerTiles = JSON.parse(JSON.stringify(playerState.tiles))
    var newarr = [];
    if (params.grp === undefined) {
      tempList[0].tiles[params.item][0].forEach(() => newarr.push(new Array(tempList[0].tiles[params.item].length)));
      for (var i = 0; i < newarr[0].length; i++) {
        for (var j = 0; j < newarr.length; j++) {
          newarr[j][i] = getArray2dCW(tempList[0].tiles[params.item], i, j);
        }
      }
    } else {
      newarr = tempList[0].tiles[params.item].map(function(arr){return arr.reverse();});
    }
    tempList[0].tiles[params.item] = newarr
    tempPlayerTiles[playerState.curPlayer][tileState.group].tiles[params.item] = newarr
    
    dispatch(changePlayerTile(tempPlayerTiles))
    setList(tempList)
  }

  const handleDragEnd = () => {
    dispatch(changeDragging(false));
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnter = (e, params) => {
    // console.log("drag start with group(", tileState.group, ") and id(", tileState.id, ")");
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  return (
    <div>
      <Tabs
        style={{
          maxWidth: "80vh",
          maxHeight: "10vh",
          overflow: "auto",
          fontSize: "1.5vmin",
        }}
        onSelect={(key) => handleSelect(key)}
      >
        {playerState.tiles[playerState.curPlayer].map((grp, grpI) => (
          <Tab key={grpI} eventKey={grpI} title={grp.title} />
        ))}
      </Tabs>
      {list.map((grp, grpI) => (
        <ListGroup
          horizontal
          key={grp.title}
          className={classes.tileGroup}
          onDragEnter={
            tileState.dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itmeI: 0 })
              : null
          }
        >
          <Row style={{ marginLeft: 0 }}>
            {grp.items.map((item, itemI) => (
              <div
                style={{
                  maxWidth: "70vh",
                  maxHeight: "10vh",
                  width: "10vh",
                  padding: 0,
                }}
                key={item}
                draggable={Object.keys(grp.tiles).length !== 0}
                onClick={(e) => changeTilePos(e, {item})}
                onContextMenu={(e) => changeTilePos(e, {grp, item})}
                onDragStart={(e) => handleDragStart(e, { grpI, itemI})}
                onDragEnter={(e) =>
                  tileState.dragging
                    ? handleDragEnter(e, { grpI, itemI })
                    : null
                }
              >
                <Cell
                  tiles={grp.tiles[item]}
                  color={playerState.color[playerState.curPlayer]}
                ></Cell>
              </div>
            ))}
          </Row>
        </ListGroup>
      ))}
    </div>
  );
};

export default Tiles;
