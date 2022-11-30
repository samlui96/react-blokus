import { createUseStyles } from 'react-jss'

const useStyles =  createUseStyles({
    app: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%', 
        //justifyContent: 'center',
        alignItems: 'center'
    }
})

export default useStyles