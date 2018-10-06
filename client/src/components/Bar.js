import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { Input } from "@material-ui/core";
import searchStudents from "../api/search";
import { setSearchQuery } from "../actions/search";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }
  setSearch(value) {
    this.setState({
      searchQuery: value
    });
    this.props.search(value);
    this.props.searchStudents(value);
  }

  render() {
    const { classes, count, match } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              {this.props.title}
            </Typography>
            {match.path === "/add" ? (
              <Link to="/">
                <Tooltip title="List students">
                  <Badge badgeContent={count} color="primary">
                    <Button
                      variant="fab"
                      mini
                      color="secondary"
                      aria-label="List"
                    >
                      <ListIcon />
                    </Button>
                  </Badge>
                </Tooltip>
              </Link>
            ) : (
              <div>
                <Input
                  placeholder="Search…"
                  disableUnderline
                  onChange={e => this.setSearch(e.target.value)}
                  value={this.state.searchQuery}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
                <Link to="/add">
                  <Tooltip title="Add student">
                    <Button
                      variant="fab"
                      mini
                      color="secondary"
                      aria-label="Add"
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({});

const mapDispatchToProps = dispatch => ({
  search: value => {
    dispatch(setSearchQuery(value));
  },
  searchStudents: value => {
    dispatch(searchStudents(value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Bar)));
