import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0, //use in nav componenet
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0
};

//getting updated cart form the local storage
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find(i => i.cartID === product.cartID);
      //if item wont be true at first i.e undefined
      if (item) {
        item.amount += product.amount; //same product amount increased
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('items added successfully');
    },
    clearCart: state => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find(i => i.cartID === cartID);
      //id doesnt match will be returned(true condition)
      state.cartItems = state.cartItems.filter(i => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart');
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      //find first occurence
      const item = state.cartItems.find(i => i.id === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated');
    },
    calculateTotals: state => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

//addItems - we are checking the dispatched payload product id matches the product in the cart if so add the product amount with exsisting product
//if not push it as a new array in the cart
//find() gives the firstoccurence and fitler() gives the all occurence
