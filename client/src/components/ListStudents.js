import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Bar from './Bar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import fetchStudents from '../api/fetch';
import removeStudent from '../api/delete';

const styles = theme => ({
  // root: {
  //   flexGrow: 1,
  //   maxWidth: 752,
  // },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  root: {
    width: '90%',
    overflowX: 'auto',
    margin: '0 auto',
  },
  table: {
    // minWidth: 500,
    margin: '0 auto',
  },
});

class ListStudents extends React.Component {
  
  deleteStudent = ( id ) => {
    this.props.removeStudent(id);
  }

  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    const { classes, students } = this.props;
    return (
      <div className={classes.root}>
      <Bar title={'Students list'} type={'list'} count={students.length}/>
          {students && students.length ? 
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell numeric>Rating</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => {
            return (
              <TableRow key={student._id}>
                <TableCell>
                  <Avatar className={classes.avatar}>{student.name.charAt(0).toUpperCase()}
                  </Avatar>
                </TableCell>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                <TableCell component="th" scope="row">{student.surname}</TableCell>
                <TableCell numeric cope="row">{student.rating}</TableCell>
                <TableCell component="th" scope="row">
                  <IconButton aria-label="Delete" onClick={() => this.deleteStudent(student._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper> : <p>No data</p>}
      </div>
    );
  }
}

ListStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => ({
  students: store.students.students,
});

const mapDispatchToProps = dispatch => ({
  getStudents: () => {dispatch(fetchStudents())},
  removeStudent: (id) => {dispatch(removeStudent(id))},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ListStudents));