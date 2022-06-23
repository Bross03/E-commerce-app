import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import productReducer from "./products/productReducer";

export default combineReducers({
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
});