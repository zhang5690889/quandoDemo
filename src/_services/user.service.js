import APIURL from './config'

export const userService = {
    logout,
    getLocalUser,
    }
;

function logout() {
    localStorage.removeItem('user');
}

function getLocalUser() {
    return {username:"bob",password:"",role:"Trader",plans:[],likedCompanies:[]};
}
