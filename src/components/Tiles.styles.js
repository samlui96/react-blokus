import { createUseStyles } from 'react-jss'

export default createUseStyles({
    tileGroup: {
        display: 'flex',
        backgroundColor: '#49505e',
        borderRadius: '5px',
        padding: '2vh 2vh 2vh',
        flexDirection: 'row',
        width: '60vh',
        height: '15vh', 
    },
    currentTile: {
        backgroundColor: '#49505e',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //minHeight: '15vh',
        width: '8vh',
        height: '8vh', 
        borderRadius: '5px',
        color: '#282c34',
        fontWeight: 'bold',
    },
    tile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //minHeight: '15vh',
        width: '8vh',
        height: '8vh', 
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: '5px',
        // color: '#282c34',
        color: '#FF0000',
        fontWeight: 'bold',
    }
})

