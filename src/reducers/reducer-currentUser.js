import { SELECT_USER, ADD_USER } from '../actions/action-types';

export default function currentUserReducer(state = "", action) {

  switch (action.type) {
    case SELECT_USER:
      return action.payload;

    // handles when first user is added
    // that user is selected as current user by default
    case ADD_USER:
      if (state === "") {
        console.log('yo');
        return action.payload.userName;
      }

    default:
      return state;

  }
}
