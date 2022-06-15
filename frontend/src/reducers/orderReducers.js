import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  DETAILS_ORDER_REQUEST,
  DETAILS_ORDER_SUCCESS,
  DETAILS_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_RESET,
  MY_LIST_ORDER_REQUEST,
  MY_LIST_ORDER_SUCCESS,
  MY_LIST_ORDER_FAIL,
  MY_LIST_ORDER_RESET,
  DETAILS_ORDER_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const detailsOrderReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action,
) => {
  switch (action.type) {
    case DETAILS_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAILS_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case DETAILS_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DETAILS_ORDER_RESET:
      return {
        orderItems: [],
        shippingAddress: {},
      };
    default:
      return state;
  }
};

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PAY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const deliverOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const myListOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_LIST_ORDER_REQUEST:
      return {
        loading: true,
      };
    case MY_LIST_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_LIST_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MY_LIST_ORDER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
