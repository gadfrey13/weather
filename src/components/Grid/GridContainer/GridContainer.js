import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
  export default function CenteredGrid(props) {
    const classes = useStyles();
    const arrayItems = props.items.map(item => {
    
    })
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            {arrayItems}
        </Grid>
      </div>
    );
  }