import { makeStyles } from "@material-ui/core"

const styles = makeStyles(theme=> ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            
        },

      },

    button: {
        margin: theme.spacing(1),
        backgroundColor: '#76ba61'
    },

    input: {
        margin: '5px 5px 15px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            ].join(','),
        '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },

    selectorInput: {
        margin: theme.spacing(1),
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        fontSize: 16,
        width:240,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            ].join(','),
        '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        position: 'absolute',

        }
        
    },

    font: {
        marginLeft: theme.spacing(1),
        color: '#5c5c5c' 
    }


}));

export default styles;