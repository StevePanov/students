import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import Bar from "./Bar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from '@material-ui/core/Tooltip';
import fetchStudents from "../api/read";
import removeStudent from "../api/delete";
import Info from "./Info";

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  root: {
    width: "90%",
    overflowX: "auto",
    margin: "0 auto"
  },
  table: {
    margin: "0 auto"
  }
});

class StudentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: ""
    };
  }

  delete = id => {
    this.props.removeStudent(id);
  };

  handleOpen = id => {
    this.setState({ open: true, id });
  };

  handleClose = () => {
    this.setState({ open: false, id: "" });
  };

  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    const { classes, students } = this.props;
    return (
      <div className={classes.root}>
        <Bar title={"Students list"} count={students.length} />

        {students && students.length ? (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell numeric>Rating</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map(student => {
                  return (
                    <TableRow key={student._id}>
                      <TableCell>
                        <Avatar className={classes.avatar}>
                          {student.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {student.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {student.surname}
                      </TableCell>
                      <TableCell numeric cope="row">
                        {student.rating}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Info/change">
                          <IconButton
                            aria-label="Info"
                            onClick={() => this.handleOpen(student._id)}
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Tooltip title="Delete student">
                          <IconButton
                            aria-label="Delete"
                            onClick={() => this.delete(student._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Typography variant="subheading" gutterBottom align="center">
            No data
          </Typography>
        )}
        <Info
          open={this.state.open}
          onClose={this.handleClose}
          students={students}
          id={this.state.id}
        />
      </div>
    );
  }
}

StudentsList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  students: store.students.students
});

const mapDispatchToProps = dispatch => ({
  getStudents: () => {
    dispatch(fetchStudents());
  },
  removeStudent: id => {
    dispatch(removeStudent(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StudentsList));
