import { createUseStyles } from 'react-jss'

export default createUseStyles({
    tileGroup: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        borderRadius: '5px',
        padding: '1vh 1vh 1vh',
        //flexDirection: 'row',
        width: '70vh',
        height: '20vh', 
    },
    // currentTile: {
    //     backgroundColor: '#49505e',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '8vh',
    //     height: '8vh', 
    //     borderRadius: '5px',
    //     color: '#282c34',
    //     fontWeight: 'bold',
    // },
    // tile: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '8vh',
    //     height: '8vh', 
    //     flexDirection: 'row',
    //     backgroundColor: 'white',
    //     borderRadius: '5px',
    //     // color: '#282c34',
    //     color: '#FFFFFF',
    //     fontWeight: 'bold',
    // },
    // cell: {
    //     width: 'auto',
    //     background: 'rgba('.concat(props => props.color,', 0.8)'),
    //     border: {
    //         width: props => (props.type === 0 ? '0px' : '4px'),
    //         style: props => (props.type === 0 ? 'solid' : 'solid'),
    //     },
    //     borderBottomColor: 'rgba('.concat(props => props.color,', 0.1)'),
    //     borderTopColor: 'rgba('.concat(props => props.color,', 1)'),
    //     borderRightColor: 'rgba('.concat(props => props.color,', 1)'),
    //     borderLeftColor: 'rgba('.concat(props => props.color,', 0.3)')
    // }
})

