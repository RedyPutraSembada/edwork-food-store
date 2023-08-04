import { START_FETCHING_PRODUCT } from './constants';

export const getAllProducts = (payload) => ({
    type: START_FETCHING_PRODUCT,
    payload
});