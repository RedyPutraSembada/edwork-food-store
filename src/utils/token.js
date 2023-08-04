export const getUserToken = () => {
    return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth'))?.token : null;
}