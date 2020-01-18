import {authenticationConstants} from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case authenticationConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case authenticationConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case authenticationConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}
