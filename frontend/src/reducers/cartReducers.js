import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducers = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: [] },
  action,
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.product_id === action.payload.product_id,
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product_id === existItem.product_id ? action.payload : item,
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    case CART_REMOVE_ITEM:
      console.log(action.payload, 'remove');
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.product_id !== action.payload;
        }),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
