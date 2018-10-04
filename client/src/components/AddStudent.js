import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Bar from "./Bar";
import addStudents from "../api/create";
import fetchStudents from "../api/read";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  center: {
    margin: "0 auto"
  },
  form: {
    width: "95%"
  }
});

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      rating: ""
    };
  }

  componentDidMount() {
    this.props.getStudents();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  clear = () => {
    this.setState({
      name: "",
      surname: "",
      rating: ""
    });
  };

  saveStudent = () => {
    const { name, surname, rating } = this.state;
    if (name && surname && rating) {
      let student = {
        name,
        surname,
        rating
      };
      this.props.add(student);
      this.setState({
        name: "",
        surname: "",
        rating: ""
      });
    }
  };
  render() {
    const { classes, count } = this.props;
    return (
      <Grid item xs={12} sm={12} md={10} lg={6} className={classes.center}>
        <Bar title={"Add student"} count={count} />
        <form className={classes.form}>
          <TextField
            autoFocus
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
            variant="outlined"
            required
            fullWidth={true}
          />
          <TextField
            id="outlined-name"
            label="Surname"
            className={classes.textField}
            value={this.state.surname}
            onChange={this.handleChange("surname")}
            margin="normal"
            variant="outlined"
            required
            fullWidth={true}
          />
          <TextField
            id="outlined-number"
            label="Rating"
            value={this.state.rating}
            onChange={this.handleChange("rating")}
            type="number"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            inputProps={{
              min: "0",
              max: "100"
            }}
            fullWidth={true}
            required
            error={!(this.state.rating >= 0 && this.state.rating <= 100)}
            helperText="Allowed rating interval is: 0 – 100"
          />
          <Button
            disabled={
              !(this.state.name || this.state.surname || this.state.rating)
            }
            variant="outlined"
            className={classes.button}
            onClick={this.clear}
          >
            Clear
          </Button>
          <Button
            disabled={
              !(this.state.rating >= 0 && this.state.rating <= 100) ||
              !(this.state.name && this.state.surname && this.state.rating)
            }
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.saveStudent}
          >
            Add student
          </Button>
        </form>
      </Grid>
    );
  }
}

AddStudent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  count: store.students.students.length
});

const mapDispatchToProps = dispatch => ({
  getStudents: () => {
    dispatch(fetchStudents());
  },
  add: data => {
    dispatch(addStudents(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddStudent));
