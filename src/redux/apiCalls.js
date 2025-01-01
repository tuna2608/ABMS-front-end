import {
  logout,
  loginFailure,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
  signupFail,
} from "./authSlice";
import { publicRequest, userRequest } from "../utilities/requestMethod";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productSlice";
import {
  addUserStart,
  addUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userSlice";
import {
  getCartStart,
  getCartFailure,
  getCartSuccess,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  resetCartSuccess,
  decreaseCartQuantitySuccess,
  deleteCartItemSuccess,
  deleteCartSuccess,
} from "./cartSlice";
import { toast } from "react-toastify";
import {
  createOrderFailure,
  createOrderSuccess,
  getAllOrdersFailure,
  getAllOrdersStart,
  getAllOrdersSuccess,
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
  resetOrdersSuccess,
  updateOrderStatusSuccess,
} from "./orderSlice";

// Auth
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(signupSuccess(res.data));
  } catch (error) {
    dispatch(signupFail());
  }
};

export const logoutDispatch = async (dispatch) => {
  dispatch(logout());
};

// Product

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

// User

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

export const addUser = async (dispatch, user) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post("/auth/register", user);
    dispatch(addUserSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

// Cart

export const getCartByUId = async (dispatch, currentUserId) => {
  dispatch(getCartStart());
  try {
    const res = await publicRequest.get(`carts/find/${currentUserId}`);
    dispatch(getCartSuccess(res.data));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

export const addToCart = async (dispatch, product) => {
  dispatch(addToCartStart());
  try {
    const res = await userRequest.post(`/carts`, product);
    dispatch(addToCartSuccess(res.data));
    toast.success("Product Added Successfully!", {});
  } catch (error) {
    dispatch(addToCartFailure());
  }
};

export const resetCart = async (dispatch) => {
  try {
    dispatch(resetCartSuccess());
  } catch (error) { }
};

export const deleteCartItem = async (dispatch, cartItemID) => {
  try {
    const res = await userRequest.delete(`/carts/${cartItemID}`);
    dispatch(deleteCartItemSuccess(res.data));
    toast.success("Item deleted from cart!", {});
  } catch (error) { }
};
export const deleteCart = async (dispatch, cartID) => {
  try {
    const res = await userRequest.delete(`/carts`);
    dispatch(deleteCartSuccess(res.data));
    toast.success("Thanks for purchasing, your order is placed!", {});
  } catch (error) { }
};

export const decreaseCartQuantity = async (
  dispatch,
  { cartItemID, quantity }
) => {
  try {
    const res = await userRequest.put(`/carts/decreaseQuantity`, {
      cartItemID,
      quantity,
    });
    dispatch(decreaseCartQuantitySuccess(res.data));
    if (quantity !== 0) {
      toast.warning("Decreased Quantity Successfully!", {});
    } else {
      toast.warning("Quantity must be greater than 0!", {});
    }
  } catch (error) { }
};

// Order

export const getOrdersByUId = async (dispatch, userId) => {
  dispatch(getOrdersStart());
  try {
    const res = await publicRequest.get(`orders/find/${userId}`);
    dispatch(getOrdersSuccess(res.data));
  } catch (error) {
    dispatch(getOrdersFailure());
  }
};

export const getAllOrders = async (dispatch) => {
  dispatch(getAllOrdersStart());
  try {
    const res = await publicRequest.get(`/orders`);
    dispatch(getAllOrdersSuccess(res.data));
  } catch (error) {
    dispatch(getAllOrdersFailure());
  }
}

export const createOrder = async (dispatch, order) => {
  dispatch(createOrderFailure());
  try {
    const res = await publicRequest.post(`/orders`, order);
    dispatch(createOrderSuccess(res.data));
  } catch (error) {
    dispatch(createOrderFailure());
  }
};

export const resetOrders = async (dispatch) => {
  try {
    dispatch(resetOrdersSuccess());
  } catch (error) { }
};

export const updateOrderStatus = async (dispatch, orderId, status) => {
  try {
    const res = userRequest.put(`/orders/${orderId}`, { status: status });
    dispatch(updateOrderStatusSuccess(res.data));
  } catch (error) { }
};
