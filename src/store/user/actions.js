import { emailUrl } from '../api';

export const LOG_IN = 'LOG_IN';

export const postMessage = data => {
  return (dispatch, getState, api) => {
    const url = emailUrl();
    return api.post(url, data)
      .then(() => true)
      .catch((e) => {
        console.error('post message error: ', e);
        return false;
      });
  }
}

export const logIn = (email, password) => dispatch => dispatch({
  type: LOG_IN,
  payload: { email, password }
});
