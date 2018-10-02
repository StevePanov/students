export const addStudent = data => ({
    type: 'ADD_STUDENT',
    payload: data,
  });

export const removeStudent = id => ({
    type: 'REMOVE_STUDENT',
    payload: id,
});

export const getStudents = data => ({
    type: 'GET_STUDENTS',
    payload: data,
});