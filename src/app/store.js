import { combineReducers, compose, createStore } from "redux";
// import thunk from "redux-thunk";
import userReducer from "./features/auth/reducer";
import productReducer from "./features/product/reducer";
import cartReducer from "./features/cart/reducer";


let rootReducers = combineReducers({
    dataUser: userReducer,
    dataProduct: productReducer,
    dataCart: cartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducers, composeEnhancers());
export default store;