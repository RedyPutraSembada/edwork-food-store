import { UPDATE_DATA_CART, CHECKOUT_CART } from './constants';

export const getAllCart = (payload) => ({
    type: UPDATE_DATA_CART,
    payload
});

export const checkoutCart = () => ({
    type: CHECKOUT_CART,
    payload: []
});