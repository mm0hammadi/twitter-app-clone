import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  header: {
    padding: 18,
    backgroundColor: 'white',
    display: 'flex'
  }, headerTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginRight: '0.5rem'
  },
}));


export default useStyles;