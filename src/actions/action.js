import {
  ADD_TO_CART,
  LOAD_CURRENT_BRAND,
  LOAD_CURRENT_ITEM,
  REMOVE_FROM_CART,
  GET_CART_TOTAL,
  CLEAR_DATA,
} from "./types";

export const loadCurrentItem = (id) => {
  return {
    type: LOAD_CURRENT_ITEM,
    payload: id,
  };
};

export const loadCurrentBrand = (id) => {
  return {
    type: LOAD_CURRENT_BRAND,
    payload: id,
  };
};

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const getCartTotal = () => {
  return {
    type: GET_CART_TOTAL,
  };
};

export const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};
