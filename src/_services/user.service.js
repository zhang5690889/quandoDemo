import APIURL from './config'

export const userService = {
    login,
    logout,
    findAllManagers,
    findAllUsers,
    register,
    updateUserProfile,
    getUserInfoByUsername,
    getLocalUser,
    findUnfollowedUser,
    findfollowedUser,
    followUser,
    unfollowUser,
    updateLikedCompanies,
    findLikedCompanies,
    deleteLikedCompanies,
    getAllFollowersForUser
    }
;

function getUserInfoByUsername(username) {
    return fetch(`${APIURL}users/getUserInfoById/`+username, {
        method: 'GET',
    }).then(handleResponse)
        .then(user => {
            return user;
        })
}

function findAllUsers() {
    return fetch(`${APIURL}users/users`).then(response => response.json())
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(`${APIURL}users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }
            return null;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function findAllManagers() {
    return fetch(`${APIURL}users/managers`).then(response => response.json())
}

function findUnfollowedUser(username) {
    return fetch(`${APIURL}users/getAllUnfollowedTraders/`+username).then(response => response.json())
}

function findfollowedUser(username) {
    return fetch(`${APIURL}users/getAllfollowedTraders/`+username).then(response => response.json())
}


function getAllFollowersForUser(username) {
    return fetch(`${APIURL}users/getAllFollowers/`+username)
        .then(response => response.json())
}

function followUser(followedUsername,MyUsername) {
    return fetch(`${APIURL}users/`+MyUsername+`/follow/`+followedUsername,{
        method: 'POST'
    })
}

function unfollowUser(followedUsername, myUsername) {
    return fetch(`${APIURL}users/`+myUsername+`/unfollow/`+followedUsername,{
        method: 'POST'
    })
}

function register(user) {
    return fetch(`${APIURL}users/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(handleResponse)
        .then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    return user;
                }
                return null;
            }
        )
}

function updateUserProfile(user, username) {
    return fetch(`${APIURL}users/` + username + `/update`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        })
}

function updateLikedCompanies(ticker, username) {
    return fetch(`${APIURL}trader/` + username +"/likedCompanies/" +ticker, {
        method: 'POST',
        body: JSON.stringify(ticker),
        headers: {
            'content-type': 'application/json'
        }
    })
}

function deleteLikedCompanies(ticker, username){
    return fetch(`${APIURL}trader/delete/` + username +"/likedCompanies/" +ticker, {
        method: 'POST'
    });
}

function findLikedCompanies(username) {
    return fetch(`${APIURL}trader/` + username + `/likedCompanies`).then(response => response.json())

}

function getLocalUser() {
    return {username:"bob",password:"",role:"Trader",plans:[],likedCompanies:[]};
}
