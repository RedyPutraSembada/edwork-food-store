import * as user from './constants';

let initialState = {
    user: null,
    token: null
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case user.USER_LOGIN:
            return {
                ...state,
                user: payload.user,
                token: payload.token
            }
        case user.USER_LOGOUT:
            return {
                ...state,
                product: null,
                token: null
            }
        default:
            return state;
    }
}

export default userReducer;