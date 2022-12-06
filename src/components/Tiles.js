import React, { useState, useRef } from "react";
import useStyles from "./Tiles.styles";
import { useDispatch } from "react-redux";
import { changeGroup, changeTile, changeDragging } from "../redux/tileSlice";
import { ListGroup, Tabs, Tab, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cell from "./Cell"
import POLYOMINOES from './constant'

const Tiles = ( {tileState} ) => {
  const [list, setList] = useState([POLYOMINOES[0]]);

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
      dispatch(changeDragging(true))
    }, 0);
  };

  const handleDragEnd = () => {
    dispatch(changeDragging(false))
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
        style={{maxWidth: '70vh', maxHeight: '10vh', overflow: 'auto', fontSize: '1.5vmin'}}
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
            tileState.dragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itmeI: 0 })
              : null
          }
        >
          <Row 
            style={{ marginLeft: 0}}>
            {grp.items.map((item, itemI) => (
              <div 
                style={{maxWidth: '70vh', maxHeight: '10vh', width: '10vh', padding: 0}}
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                onDragEnter={(e) =>
                  tileState.dragging ? handleDragEnter(e, { grpI, itemI }) : null
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
