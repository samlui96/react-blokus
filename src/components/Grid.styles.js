import { createUseStyles } from 'react-jss'

export default createUseStyles({
    grid: {
        display: 'grid',
        gridTemplateRows: 'repeat(20, 1fr)',
        gridTemplateColumns: 'repeat(20, 1fr)',
        //margin: 'auto',
        //justifyContent: 'center',
        //alignContent: 'center',
        width: '60vh',
        height: '60vh', 
        outline: 'solid black',
        marginBottom: '5vh',
    },
    cell: {
        cursor: 'pointer',
        outline: 'solid black',
        background: 'white',
        transition: 'all 100ms linear',
        '&:hover':{
            transform: 'scale(1.2)',
            backgroundColor: 'red'
        }
    }
})

