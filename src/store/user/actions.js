export const LOG_IN = 'LOG_IN';

export const logIn = (email, password) => dispatch => dispatch({
  type: LOG_IN,
  payload: { email, password }
});
