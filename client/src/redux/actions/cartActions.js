import axios from "axios";
import * as actionType from '../constants/cartConstant.js';

const url = 'http://localhost:8000';

export const addToCart = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`${url}/product/${id}`);
        dispatch({type : actionType.ADD_TO_CART, payload : data});
    }
    catch(error) {
        console.log('Error while calling addtocart api');
    }
}

export const removeFromCart = (id) => async (dispatch) => {
    dispatch({type : actionType.REMOVE_FROM_CART, payload : id});
}