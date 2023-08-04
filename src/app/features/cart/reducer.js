import * as cart from './constants';

const initialState = {
    data: [],
}

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case cart.UPDATE_DATA_CART:
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}

export default cartReducer;