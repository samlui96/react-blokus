import { createUseStyles } from 'react-jss'


export default createUseStyles({
    cell: (props) => ({
        display: 'grid',
        gridTemplateRows:'repeat('.concat(props.length, ', 1fr)'),
        gridTemplateColumns: 'repeat('.concat(props.length, ', 1fr)'),
        width: '5vh',
        height: '5vh', 
        //outline: 'solid black',
        //margin: '1vh',
    }),
    inCell: {
        cursor: 'pointer',
        background: 'white',
        transition: 'all 100ms linear',
        position: 'relative',
        margin: '0.06vh',
    }
})

