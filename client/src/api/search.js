import axios from "axios";
import { getStudents } from "../actions/students";

const searchStudents = (query) => async dispatch => {
  return axios.get('http://localhost:8080/students/'+ query)
    .then(response => {
      dispatch(getStudents(response.data));
      return response;
    })
    .catch(e => {
        console.log(e);
    });
}

export default searchStudents;