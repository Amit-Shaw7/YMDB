export const getToken = () => {
    const token = localStorage.getItem('_MOVIE_DB_TOKEN')
    if (!token) {
        return null;
    }
    return token;
}

export const setToken = (token) => {
    if (token) {
        localStorage.setItem('_MOVIE_DB_TOKEN', token);
    } else {
        console.log('Invalid Response from Server');
    }
}
