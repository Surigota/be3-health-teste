import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme =>  ({
    table: {
        minWidth: 650,
        backgroundColor: '#f7fff9',
        border: 'solid',
        borderWidth: 2,
      },

    tableHead: {
        backgroundColor: '#cee3c8'
    }
}));

export default styles;