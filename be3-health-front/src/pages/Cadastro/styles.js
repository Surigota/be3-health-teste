import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme =>  ({
    root: {
        flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: '5vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70vw',
        borderRadius: 10


    },
}));

export default styles;
   