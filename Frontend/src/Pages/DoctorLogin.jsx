import axios from 'axios';

export const doctorLogin = (credentials) => async (dispatch) => {
  dispatch({ type: 'DOCTOR_LOGIN_REQUEST' });

  try {
    const response = await axios.post('http://localhost:8080/api/v1/appointment/doctor/login', credentials);
    dispatch({ type: 'DOCTOR_LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'DOCTOR_LOGIN_FAILURE',
      payload: error.response ? error.response.data : error.message,
    });
  }
};
