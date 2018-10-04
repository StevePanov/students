import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import updStudent from "../api/update";

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
    const { onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Change info</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-name"
            label="Name"
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
            margin="normal"
            variant="outlined"
            inputProps={{
              min: "0",
              max: "100"
            }}
            fullWidth={true}
            error={!(this.state.rating >= 0 && this.state.rating <= 100)}
            helperText="Allowed rating interval is: 0 – 100"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.updateStudent}
            disabled={
              !(this.state.rating >= 0 && this.state.rating <= 100) ||
              !(this.state.name && this.state.surname && this.state.rating)
            }
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = store => ({});
const mapDispatchToProps = dispatch => ({
  update: data => {
    dispatch(updStudent(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
