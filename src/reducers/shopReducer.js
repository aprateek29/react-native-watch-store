import {
  ADD_TO_CART,
  LOAD_CURRENT_ITEM,
  LOAD_CURRENT_BRAND,
  REMOVE_FROM_CART,
  GET_CART_TOTAL,
  CLEAR_DATA,
} from "../actions/types";
const watch_one = require("../assets/images/watch-one.jpg");
const watch_two = require("../assets/images/watch-two.jpg");
const watch_three = require("../assets/images/watch-three.jpg");
const watch_four = require("../assets/images/watch-four.jpg");

const initialState = {
  products: [
    {
      id: "1",
      name: "sliver 34rs9",
      brand: "Rolex",
      price: 659.99,
      origin: "UK",
      strapType: "metal",
      warranty: 1,
      image: watch_one,
    },
    {
      id: "2",
      name: "glider 34f",
      brand: "Devogue",
      price: 599.99,
      origin: "USA",
      strapType: "gold",
      warranty: 2,
      image: watch_two,
    },
    {
      id: "3",
      name: "Wrez o3sx",
      brand: "Grace",
      price: 899.99,
      origin: "Japan",
      strapType: "leather",
      warranty: 1,
      image: watch_three,
    },
    {
      id: "4",
      name: "Bxxy sr43",
      brand: "Gucci",
      price: 899.99,
      origin: "US",
      strapType: "leather",
      warranty: 3,
      image: watch_four,
    },
  ],
  brands: [
    {
      id: "1",
      origin: "Switzerland",
      name: "Patek Philippe",
      image: watch_one,
    },
    {
      id: "2",
      origin: "Switzerland",
      name: "Audemars Piguet",
      image: watch_two,
    },
    {
      id: "3",
      origin: "Geneva",
      name: "Vacheron Constantin",
      image: watch_three,
    },
    { id: "4", origin: "Geneva", name: "Hublot", image: watch_four },
    { id: "5", origin: "Germany", name: "Lange & Söhne", image: watch_one },
  ],
  currentItem: {},
  currentBrand: {},
  cartItems: [],
  cartTotal: 0,
  inCart: false,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_ITEM:
      let item = state.products.filter((item) => item.id === action.payload);
      return { ...state, currentItem: item };
    case LOAD_CURRENT_BRAND:
      let brand = state.brands.filter((brand) => brand.id === action.payload);
      return { ...state, currentBrand: brand[0] };
    case ADD_TO_CART:
      let citem = state.cartItems.filter((item) => item.id === action.payload);

      if (citem.length === 1) {
        return { ...state, inCart: true };
      }
      citem = state.products.filter((item) => item.id === action.payload);

      return {
        ...state,
        cartItems: [...state.cartItems, ...citem],
        inCart: false,
      };

    case REMOVE_FROM_CART:
      let newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      return { ...state, cartItems: newCartItems };

    case GET_CART_TOTAL:
      let total = 0;
      if (state.cartItems.length > 1) {
        total = state.cartItems
          .map((item) => item.price)
          .reduce((prev, next) => prev + next);
        total = total.toFixed(2);
      } else if (state.cartItems.length === 0) {
        total = 0;
      } else {
        total = state.cartItems[0].price;
      }

      return { ...state, cartTotal: total };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
export default shopReducer;
