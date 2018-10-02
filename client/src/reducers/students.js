const initialState = {
    students: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_STUDENT':
        return Object.assign({}, state, {
          students: [...state.students, action.payload],
        });
      case 'REMOVE_STUDENT':
        return Object.assign({}, state, {
          students: state.students.filter(o => o._id !== action.payload),
        });
      case 'GET_STUDENTS':
        return Object.assign({}, state, {
          students: action.payload
        });
      default:
        return state;
    }
  };