import React from 'react';
import { TETROMINOS } from '../redux/constant';
import useStyles from "./Cell.style";

const test = [
    [0,1,1],
    [1,1,0],
    [0,1,0]
]

const Cell = ({ type }) => {
    const classes = useStyles();
    return  (
    <div className={classes.cell} type={0} color={'red'}>
        cell
    </div>
)
};

// export default React.memo(Cell);
export default Cell;