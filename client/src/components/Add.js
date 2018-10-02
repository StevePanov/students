import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Bar from './Bar';
import { Link } from "react-router-dom";
import addStudents from '../api/add';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Add extends React.Component {
  state = {
    name: '',
    surname: '',
    rating: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  saveStudent = () => {
    const {name, surname, rating} = this.state;
    if (name && surname && rating) {
      let student = {
        name,
        surname,
        rating,
      }
      this.props.add(student);
      this.setState({
        name: '',
        surname: '',
        rating: '',
      });
    }
    
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Bar title={'Add student'}></Bar>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Surname"
          className={classes.textField}
          value={this.state.surname}
          onChange={this.handleChange('surname')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Rating"
          value={this.state.rating}
          onChange={this.handleChange('rating')}
          type="number"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Link to="/">
          <Button variant="contained" color="primary" className={classes.button} onClick={this.saveStudent}>
          Add student
          </Button>
        </Link>
      </form>
      </div>
    );
  }
}

Add.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => ({
});

const mapDispatchToProps = dispatch => ({
  add: (data) => {dispatch(addStudents(data))}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Add));