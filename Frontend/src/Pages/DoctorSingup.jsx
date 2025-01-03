import axios from 'axios';

export const doctorSignup = (doctorData) => async (dispatch) => {
  dispatch({ type: 'DOCTOR_SIGNUP_REQUEST' });

  try {
    const response = await axios.post('http://localhost:8080/api/v1/appointment/doctor/signup', doctorData);
    dispatch({ type: 'DOCTOR_SIGNUP_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'DOCTOR_SIGNUP_FAILURE',
      payload: error.response ? error.response.data : error.message,
    });
  }
};
