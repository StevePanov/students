import axios from "axios";
import { getStudent } from "../actions/students";

const updStudent = data => async dispatch => {
  const { name, surname, rating, _id } = data;
  const body = { name, surname, rating };
  return axios
    .put("http://localhost:8080/students/" + _id, body)
    .then(response => {
      dispatch(getStudent(data));
      return response;
    })
    .catch(e => {
      console.log(e);
    });
};

export default updStudent;
