import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    alignItems: 'center',
    border:'2px solid black',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid({grid}) {
  const classes = useStyles();

  function FormRow({gridRow}) {
    let list_items = [];
    for (let element_index in gridRow){
      list_items.push(
        <Grid item xs='auto' xl='auto'>
          <Paper className={classes.paper}>{gridRow[element_index]}</Paper>
        </Grid>
      )
    }
    return (
      <div>
        <React.Fragment>
          <Grid container spacing={1} xs='auto' xl='auto' direction='row'>
            {list_items}
          </Grid>
        </React.Fragment>
      </div>
    );
  }

  let grid_items = [];
  for (let row_index in grid){
    grid_items.push(
      <Grid container item xs='auto' xl='auto' spacing={3}>
        <FormRow gridRow={grid[row_index]}/>
      </Grid>
    )
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={4} xs='auto' xl='auto' direction='column'>
        {grid_items}
      </Grid>
    </div>
  );
}
