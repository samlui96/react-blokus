import { createUseStyles } from 'react-jss'

export default createUseStyles({
    cell: {
        width: 'auto',
        background: 'rgba('.concat(props => props.color,', 0.8)'),
        border: {
            width: props => (props.type === 0 ? '0px' : '4px'),
            style: props => (props.type === 0 ? 'solid' : 'solid'),
        },
        borderBottomColor: 'rgba('.concat(props => props.color,', 0.1)'),
        borderTopColor: 'rgba('.concat(props => props.color,', 1)'),
        borderRightColor: 'rgba('.concat(props => props.color,', 1)'),
        borderLeftColor: 'rgba('.concat(props => props.color,', 0.3)')
    }
})

