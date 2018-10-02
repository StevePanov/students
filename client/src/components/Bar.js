import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

function Bar(props) {
  const { classes, type, count } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            {props.title}
          </Typography>
          {type === 'add' ?
          <Link to="/">
          <Badge 
                badgeContent={count} 
                color="primary">
            <Button variant="fab" mini color="secondary" aria-label="List">
              
                <ListIcon />
              
            </Button></Badge>
          </Link> : 
          <Link to="/add">
            <Button variant="fab" mini color="secondary" aria-label="Add">
                <AddIcon />
            </Button>
          </Link>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);