import {authenticationConstants} from '../_constants';
import {userService} from '../_services';

export const authenticationActions = {
    login,
    logout,
    register
};

function login(username, password) {
    return dispatch => {
        userService.login(username, password)
            .then(user => {
                    if (user)
                        dispatch({type: authenticationConstants.LOGIN_SUCCESS, user});
                    else
                        dispatch({
                            type: authenticationConstants.LOGIN_FAILURE
                        })
                }
            )
    };
}

function logout() {
    userService.logout();
    return {type: authenticationConstants.LOGOUT};
}

function register(user) {
    return dispatch => {
        userService.register(user)
            .then(user => {
                if (user)
                    dispatch({type:authenticationConstants.REGISTER_SUCCESS, user});
                else
                    dispatch({type:authenticationConstants.REGISTER_FAILURE})
            })
    }
}

