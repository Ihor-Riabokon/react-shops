class Auth {

    static isUserAuthenticated() {
        return localStorage.getItem('authentificated') !== null;
    }

    static deAuthenticateUser() {
        localStorage.removeItem('authentificated')
    }
}

export default Auth;