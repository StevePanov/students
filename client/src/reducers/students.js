const initialState = {
  students: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return Object.assign({}, state, {
        students: [...state.students, action.payload]
      });
    case "REMOVE_STUDENT":
      return Object.assign({}, state, {
        students: state.students.filter(o => o._id !== action.payload)
      });
    case "GET_STUDENTS":
      return Object.assign({}, state, {
        students: action.payload
      });
    case "GET_STUDENT":
      const student = state.students.find(s => s._id === action.payload._id);
      return {
        ...state,
        students: [
          ...state.students.filter(s => s !== student),
          { ...action.payload }
        ]
      };
    default:
      return state;
  }
};
