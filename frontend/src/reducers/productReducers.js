import {
  PRODUCT_LIST_FETCH,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_ID_FETCH,
  PRODUCT_ID_SUCCESS,
  PRODUCT_ID_FAIL,
  PRODUCT_DELETE_FETCH,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_REVIEW_DELETE_REQUEST,
  PRODUCT_REVIEW_DELETE_SUCCESS,
  PRODUCT_REVIEW_DELETE_FAIL,
  PRODUCT_REVIEW_DELETE_RESET,
} from '../constants/productConstants';

export const productListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_FETCH:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productIdReducers = (
  state = { product: { reviews: [] } },
  action,
) => {
  switch (action.type) {
    case PRODUCT_ID_FETCH:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_ID_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_FETCH:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};

export const productReviewReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const productCarouselReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const productReviewDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
