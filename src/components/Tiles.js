import React, { useState, useRef } from "react";
import useStyles from "./Tiles.styles";
import { useSelector, useDispatch } from "react-redux";
import { changeGroup, changeTile } from "../redux/tileSlice";
import { ListGroup, Tabs, Tab, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cell from "./Cell"

const TETROMINOS = [
  [
    [0,1,1],
    [1,1,0],
    [0,1,0]
  ],
  [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0], 
    [0,0,0,0,0]
  ],
  [
    [0,0,0,0],
    [1,0,0,0],
    [1,1,1,1],
    [0,0,0,0]
  ],
  [
    [0,0,0,0],
    [1,1,0,0],
    [0,1,1,1],            
    [0,0,0,0]
  ],
  [
    [1,1,1],
    [1,1,0],
    [0,0,0]
  ],
  [
      [1,1,1],
      [0,1,0],
      [0,1,0]
  ],
  [
      [1,0,1],
      [1,1,1],
      [0,0,0]
  ],
  [
      [1,0,0],
      [1,0,0],
      [1,1,1]
  ],
  [
      [0,0,1],
      [1,1,1],
      [1,0,0]
  ],
  [
      [0,1,0],
      [1,1,1],
      [0,1,0]
  ],
  [
      [0,1,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
  ],
  [
      [1,1,0],
      [0,1,0],
      [0,1,1]
  ]
]

const pattern = [
    [0,0,0,0,0],
    [0,0,1,1,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ]

const Tiles = ({ data }) => {
  const id = useSelector((state) => state.tile.id);
  const group = useSelector((state) => state.tile.group);
  const [list, setList] = useState([data[0]]);
  const [dragging, setDragging] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const dragItem = useRef();
  const dragNode = useRef();

  const handleSelect = (key) => {
    dispatch(changeGroup(key));
    setList([data[key]])
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
    console.log("drag end");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnter = (e, params) => {
    console.log("drag start wthi group(", group, ") and id(", id, ")");
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

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpI === params.grpI &&
      currentItem.itemI === params.itemI
    ) {
      return classes.currentTile;
    }
    return classes.tile;
  };

  return (
    <div>
      <Tabs 
        defaultActiveKey={list[0].grpI} 
        onSelect={(key) => handleSelect(key)}
      >
        {data.map((grp, grpI) => (
          <Tab
            key={grpI}
            eventKey={grpI}
            title={grp.title}
          />
        ))}
      </Tabs>
      {/* {list.map((grp, grpI) => (
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
          {grp.items.map((item, itemI) => (
            <ListGroup.Item
              key={item}
              draggable
              onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
              onDragEnter={(e) =>
                dragging ? handleDragEnter(e, { grpI, itemI }) : null
              }
              className={
                dragging ? getStyles({ grpI, itemI }) : classes.tile
              }
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ))} */}
      <ListGroup
           horizontal
          // key={"1"}
          className={classes.tileGroup}
          // onDragEnter={
          //   dragging && !grp.items.length
          //     ? (e) => handleDragEnter(e, { grpI, itmeI: 0 })
          //     : null
          // }
        >
        <Row sm="auto" >
          {TETROMINOS.map((item, itemI) => (
              <ListGroup.Item style={{padding: 1}}>
                <div draggable>
                  <Cell key={itemI} pattern={item} tiles={[item]}></Cell> 
                </div>
              </ListGroup.Item>
          ))}
        </Row>
      </ListGroup>

    </div>
  );
};

export default Tiles;
