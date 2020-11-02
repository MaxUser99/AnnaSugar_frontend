import {
  loadAstro,
  loadTaro,
  loadRune,
  loadRitual,
} from './content/consultActions';

export default function () {
  return async function (dispatch) {
    await dispatch(loadAstro());
    await dispatch(loadTaro());
    await dispatch(loadRune());
    await dispatch(loadRitual());
  }
}
