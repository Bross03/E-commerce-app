import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import orderReducer from "./orders/orderReducer";
import productReducer from "./products/productReducer";

export default combineReducers({
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer
});