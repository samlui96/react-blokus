import React, { useState, useRef } from "react";
import useStyles from "./Tiles.styles";
import { useSelector, useDispatch } from "react-redux";
import { changeGroup, changeTile, changeEndNode } from "../redux/tileSlice";
import { ListGroup, Tabs, Tab, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cell from "./Cell"
import POLYOMINOES from './constant'

const Tiles = () => {
  const id = useSelector((state) => state.tile.id);
  const group = useSelector((state) => state.tile.group);
  const endNode = useSelector((state) => state.tile.endNode);
  const [list, setList] = useState([POLYOMINOES[0]]);
  const [dragging, setDragging] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const dragItem = useRef();
  const dragNode = useRef();

  const handleSelect = (key) => {
    dispatch(changeGroup(key));
    setList([POLYOMINOES[key]])
  }

  const handleDragStart = (e, params) => {
    dispatch(changeTile(list[params.grpI].items[params.itemI]));
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    console.log("drag end", endNode);
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnter = (e, params) => {
    console.log("drag start with group(", group, ") and id(", id, ")");
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

  // const getStyles = (params) => {
  //   const currentItem = dragItem.current;
  //   if (
  //     currentItem.grpI === params.grpI &&
  //     currentItem.itemI === params.itemI
  //   ) {
  //     return classes.currentTile;
  //   }
  //   return classes.tile;
  // };

  return (
    <div >
      <Tabs 
        style={{fontSize: '80%'}}
        defaultActiveKey={list[0].grpI} 
        onSelect={(key) => handleSelect(key)}
      >
        {POLYOMINOES.map((grp, grpI) => (
          <Tab
            key={grpI}
            eventKey={grpI}
            title={grp.title}
          />
        ))}
      </Tabs>
      {list.map((grp, grpI) => (
        <ListGroup
          horizontal
          key={grp.title}
          className={classes.tileGroup}
          onDragEnter={
            dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itmeI: 0 })
              : null
          }
        >
          <Row sm="auto">
            {grp.items.map((item, itemI) => (
              <div 
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                onDragEnter={(e) =>
                  dragging ? handleDragEnter(e, { grpI, itemI }) : null
                }
              >
                <Cell tiles={grp.tiles[item]}></Cell> 
              </div>
            ))}
          </Row>
        </ListGroup>
      ))}
    </div>
  );
};

export default Tiles;
