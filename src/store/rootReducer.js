import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import productReducer from "./products/productReducer";

export default combineReducers({
    auth: authReducer,
    products: productReducer
});