import { combineReducers } from "redux";
import productApi, { productReducer } from "../api/product";
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    [productApi.reducerPath]:productReducer
})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({}).concat(productApi.middleware)
})

export default store