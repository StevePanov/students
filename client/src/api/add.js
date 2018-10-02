import axios from 'axios';
import { addStudent } from '../actions/students';

const addStudents = (data) => async dispatch => {
  return axios.post('http://localhost:8080/students', data)
    .then(response => {
      dispatch(addStudent(response.data));
      return response;
    })
    .catch(e => {
      console.log(e);
    });
}
export default addStudents;