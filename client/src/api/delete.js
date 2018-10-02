import axios from 'axios';
import { removeStudent } from '../actions/students';

const deleteStudent = (studentId)  => async dispatch => {
  return axios.delete('http://localhost:8080/students/' + studentId)
    .then(response => {
      dispatch(removeStudent(studentId));
      return response;
    })
    .catch(e => {
      console.log(e);
    });
}
export default deleteStudent;