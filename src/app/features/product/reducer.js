import * as product from './constants';

const initialState = {
    data: [],
}

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case product.START_FETCHING_PRODUCT:
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}

export default productReducer;