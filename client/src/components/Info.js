import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import blue from "@material-ui/core/colors/blue";
import updStudent from "../api/update";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      rating: ""
    };
  }
  handleClose = () => {
    this.props.onClose();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  updateStudent = () => {
    const { name, surname, rating, _id } = this.state;
    if (name && surname && rating && _id) {
      this.props.update(this.state);
      this.handleClose();
    }
  };
  componentWillReceiveProps(nextProps) {
    const student = nextProps.students.filter(o => o._id === nextProps.id)[0];
    if (student) {
      this.setState({
        _id: student._id,
        name: student.name,
        surname: student.surname,
        rating: student.rating
      });
    }
  }
  render() {
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Change info</DialogTitle>

        <TextField
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
        />
        <Button size="small" color="secondary" onClick={this.handleClose}>
          Cancel
        </Button>
        <Button size="small" color="primary" onClick={this.updateStudent}>
          Change
        </Button>
      </Dialog>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({});
const mapDispatchToProps = dispatch => ({
  update: data => {
    dispatch(updStudent(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Info));
