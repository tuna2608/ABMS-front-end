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
import { getAllPostsFailure, getAllPostsStart, getAllPostsSuccess, getPostFailure, getPostsFailure, getPostsStart, getPostsSuccess, getPostStart, getPostSuccess } from "./postSlice";

import {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFailure,
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
  markMessagesAsReadStart,
  markMessagesAsReadSuccess,
  markMessagesAsReadFailure,
  addNewContact
} from "./chatSlice";

// Auth
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/login", user);
    dispatch(loginSuccess(res.data.data));
    return res.data;
  } catch (error) {
    dispatch(loginFailure());
    return error.response.data;
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
    return res;
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

export const getPostsByUId = async (dispatch, userId) => {
  dispatch(getOrdersStart());
  try {
    const res = await publicRequest.get(`orders/find/${userId}`);
    dispatch(getOrdersSuccess(res.data));
  } catch (error) {
    dispatch(getOrdersFailure());
  }
};

export const getAllPosts = async (dispatch) => {
  dispatch(getAllPostsStart());
  try {
    const res = await publicRequest.get(`/post`);
    dispatch(getAllPostsSuccess(res.data.data));
    return res.data;
  } catch (error) {
    dispatch(getAllPostsFailure());
    return error;
  }
}

export const getPostById = async (dispatch,postId) => {
  dispatch(getPostStart());
  try {
    const res = await publicRequest.get(`/post/${postId}`);
    dispatch(getPostSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getPostFailure());
    return error;
  }
}

export const getUserByUserName = async (dispatch,username) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get(`/user/find?username=${username}`);
    dispatch(getUserSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getUserFailure());
    return error;
  }
}

// export const createOrder = async (dispatch, order) => {
//   dispatch(createOrderFailure());
//   try {
//     const res = await publicRequest.post(`/orders`, order);
//     dispatch(createOrderSuccess(res.data));
//   } catch (error) {
//     dispatch(createOrderFailure());
//   }
// };

// export const resetOrders = async (dispatch) => {
//   try {
//     dispatch(resetOrdersSuccess());
//   } catch (error) { }
// };

// export const updateOrderStatus = async (dispatch, orderId, status) => {
//   try {
//     const res = userRequest.put(`/orders/${orderId}`, { status: status });
//     dispatch(updateOrderStatusSuccess(res.data));
//   } catch (error) { }
// };

// // Order

// export const getOrdersByUId = async (dispatch, userId) => {
//   dispatch(getOrdersStart());
//   try {
//     const res = await publicRequest.get(`orders/find/${userId}`);
//     dispatch(getOrdersSuccess(res.data));
//   } catch (error) {
//     dispatch(getOrdersFailure());
//   }
// };

// export const getAllOrders = async (dispatch) => {
//   dispatch(getAllOrdersStart());
//   try {
//     const res = await publicRequest.get(`/orders`);
//     dispatch(getAllOrdersSuccess(res.data));
//   } catch (error) {
//     dispatch(getAllOrdersFailure());
//   }
// }

// export const createOrder = async (dispatch, order) => {
//   dispatch(createOrderFailure());
//   try {
//     const res = await publicRequest.post(`/orders`, order);
//     dispatch(createOrderSuccess(res.data));
//   } catch (error) {
//     dispatch(createOrderFailure());
//   }
// };

// export const resetOrders = async (dispatch) => {
//   try {
//     dispatch(resetOrdersSuccess());
//   } catch (error) { }
// };

// export const updateOrderStatus = async (dispatch, orderId, status) => {
//   try {
//     const res = userRequest.put(`/orders/${orderId}`, { status: status });
//     dispatch(updateOrderStatusSuccess(res.data));
//   } catch (error) { }
// };

// Chat functions
// Lấy lịch sử tin nhắn
export const getMessages = (receiverId, currentUserId) => async (dispatch) => {
  dispatch(getMessagesStart());
  try {
    const res = await userRequest.get(`/chat/history/${receiverId}?currentUserId=${currentUserId}`);
    dispatch(getMessagesSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getMessagesFailure());
    console.error("Lỗi khi lấy tin nhắn:", error);
    throw error;
  }
};

// Lấy danh sách người liên hệ
export const fetchContacts = (currentUserId) => async (dispatch) => {
  dispatch(fetchContactsStart());
  try {
    const res = await userRequest.get(`/chat/contacts?currentUserId=${currentUserId}`);
    dispatch(fetchContactsSuccess(res.data));
    return res.data;
  } catch (error) {
    console.log("Lỗi khi lấy danh sách người liên hệ:", error);
    dispatch(fetchContactsFailure(error.message));
    throw error;
  }
};

// Đánh dấu tin nhắn là đã đọc
export const markMessagesAsRead = (otherUserId, currentUserId) => async (dispatch) => {
  dispatch(markMessagesAsReadStart());
  try {
    await userRequest.post(`/chat/read/${otherUserId}?currentUserId=${currentUserId}`);
    dispatch(markMessagesAsReadSuccess(otherUserId));
    return true;
  } catch (error) {
    console.log("Lỗi khi đánh dấu tin nhắn đã đọc:", error);
    dispatch(markMessagesAsReadFailure(error.message));
    throw error;
  }
};

// Tìm kiếm thông tin người dùng theo ID
export const getUserInfo = (userId) => async (dispatch) => {
  try {
    const res = await userRequest.get(`/user/get/${userId}`);
    if (res.data && res.data.data) {
      dispatch(addNewContact({
        userId: res.data.data.userId,
        userName: res.data.data.userName,
        fullName: res.data.data.fullName,
        userImgUrl: res.data.data.userImgUrl,
        unreadCount: 0
      }));
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return null;
  }
};