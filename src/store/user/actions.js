import { emailUrl } from '../api';

export const LOG_IN = 'LOG_IN';

export const postMessage = data => {
  return (dispatch, getState, api) => {
    const url = emailUrl();
    return api.post(url, data)
      .catch((e) => {
        console.error('post error: ', e);
      })
  }
}

export const logIn = (email, password) => dispatch => dispatch({
  type: LOG_IN,
  payload: { email, password }
});
