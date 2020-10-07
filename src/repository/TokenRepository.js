const KEY = 'arcomcaa-token';

class TokenRepository {

    static set(value) {

        localStorage.setItem(KEY, value);
    }

    static get() {

        return localStorage.getItem(KEY);
    }

    static delete() {

        return localStorage.removeItem(KEY);
    }

    static isAuthenticated() {

        let token = localStorage.getItem(KEY);
        return token && token !== 'null' && token !== '';
    }

    static clear() {
        localStorage.clear();
    }

}

export default TokenRepository;