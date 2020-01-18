import {authenticationConstants} from '../_constants';

export function authentication(state, action) {
    switch (action.type) {
        case authenticationConstants.LOGIN_SUCCESS:
            return {
                user: action.user
            };
        case authenticationConstants.LOGIN_FAILURE:
            return {
                loggedInFailed: true
            };
        case authenticationConstants.LOGOUT:
            return {user: null};
        case authenticationConstants.USER_UPDATE:
        case authenticationConstants.REGISTER_SUCCESS:
            return {user: action.user};
        case authenticationConstants.REGISTER_FAILURE:
            return {
                registerFailed: true
            };
        default:
            return {user: null}
    }
}
