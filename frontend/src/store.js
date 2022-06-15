import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productIdReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
  productReviewReducers,
  productCarouselReducer,
  productReviewDeleteReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  facebookLoginReducer,
  userDeleteReducers,
  userListReducers,
  userLoginReducers,
  userUpdateProfileReducers,
  userUpdateReducers,
} from './reducers/userReducers';
import { userRegisterReducers } from './reducers/userReducers';
import { userDetailsReducers } from './reducers/userReducers';
import {
  createOrderReducer,
  deliverOrderReducer,
  detailsOrderReducer,
  myListOrderReducer,
  orderListReducer,
  payOrderReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducers,
  productIdList: productIdReducers,
  productDelete: productDeleteReducers,
  productCreate: productCreateReducers,
  productUpdate: productUpdateReducers,
  productReview: productReviewReducers,
  productReviewDelete: productReviewDeleteReducers,
  productCarousel: productCarouselReducer,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userList: userListReducers,
  userDelete: userDeleteReducers,
  userUpdate: userUpdateReducers,
  createOrder: createOrderReducer,
  detailsOrder: detailsOrderReducer,
  fbLogin: facebookLoginReducer,
  payOrder: payOrderReducer,
  myListOrder: myListOrderReducer,
  orderList: orderListReducer,
  deliverOrder: deliverOrderReducer,
});

const localStorageItem = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const fbInfoLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const userInfoLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const saveShippingAddressLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};
const paymentMethodLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};
const initialState = {
  cart: {
    cartItems: localStorageItem,
    shippingAddress: saveShippingAddressLocalStorage,
    paymentMethod: paymentMethodLocalStorage,
  },
  userLogin: { userInfo: userInfoLocalStorage },
  // fbLogin: { fbInfo: fbInfoLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
