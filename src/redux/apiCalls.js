import {
  logout,
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFail,
  verifyStart,
  verifySuccess,
  verifyFail,
  editProfileStart,
  editProfileSuccess,
  editProfileFail,
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
  addUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  resetUsersSuccess,
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

import { getAllPostsFailure, getAllPostsStart, getAllPostsSuccess, getPostFailure, getPostStart, getPostSuccess } from "./postSlice";

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

export const editProfile = async (dispatch,formData) => {
  dispatch(editProfileStart());
  try {
    const res = await userRequest.put(`/user/edit_profile`, formData);
    dispatch(editProfileSuccess(res.data.data))
    return res.data
  } catch (error) {
    dispatch(editProfileFail())
    return error.response
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/api/register", user);
    // console.log(res);
    dispatch(registerSuccess(res.data.data));
    return res.data
  } catch (error) {
    dispatch(registerFail());
    return error.response
  }
};

export const verifyOTP = async (dispatch, user) => {
  dispatch(verifyStart());
  try {
    const res = await publicRequest.post("/api/verify", user.user);
    dispatch(verifySuccess());
    return res.data;
  } catch (error) {
    dispatch(verifyFail());
    return error.response
  }
};



export const logoutDispatch = async (dispatch) => {
  dispatch(logout());
  dispatch(resetUsersSuccess())
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



export const getImageCloud = async (formData) => {
  try {
    const res = await userRequest.post(`/user/update_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data
  } catch (error) {
    return error.response
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

//------------------------------------------------------------------------------tạo bài viết mua bán căn hộ------------------------------------------------------------------------------

export const getPostsByUId = async (dispatch, userId) => {
  dispatch(getPostStart());
  try {
    const res = await publicRequest.get(`orders/find/${userId}`);
    dispatch(getPostSuccess(res.data));
  } catch (error) {
    dispatch(getPostFailure());
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

export const getPostById = async (dispatch, postId) => {
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

//get own apartment by userId
export const getOwnApartments = async (userId) => {
  try {
    const res = await publicRequest.get(`/apartment/get_own_apartment?userId=${userId}`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    console.error("Error fetching own apartments:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách căn hộ"
    };
  }
};

//create post
export const createPost = async (formData) => {
  try {
    const res = await userRequest.post("/post/add_post", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi tạo bài đăng"
    };
  }
};

//check truoc khi dang bai
export const checkExistingPost = async (apartmentName, postType) => {
  try {
    const res = await publicRequest.get("/post/check-existing-post", {
      params: { apartmentName, postType }
    });
    return {
      success: true,
      exists: res.data.exists
    };
  } catch (error) {
    console.error("Error checking existing post:", error);
    return {
      success: false,
      exists: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi kiểm tra bài đăng"
    };
  }
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const getUserByUserName = async (dispatch, username) => {
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


// -----------------------------------------------------------------------------Chat functions------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------gửi form duyệt-----------------------------------------------------------------------------------
//tim user bang username va email
export const searchUserByUsernameOrEmail = async (dispatch, query) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get(`/user/search?query=${query}`);
    dispatch(getUserSuccess(res.data.data));
    return res.data;
  } catch (error) {
    dispatch(getUserFailure());
    return error.response;
  }
};

//input 
export const verifyUserInfo = async (dispatch, formData) => {
  dispatch(verifyStart());
  try {
    if (formData.get('verificationFormType') === '2') {
      formData.set('contractEndDate', null);
    } 
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }
    const res = await userRequest.post("/user/verify_user", formData);
    
    dispatch(verifySuccess());
    return res.data;
  } catch (error) {
    console.error("API error:", error);
    dispatch(verifyFail());
    return error.response ? error.response.data : { message: "Unknown error" };
  }
};
//------------------------------------------------------------------------------duyệt user--------------------------------------------------------------------------------------
// Hàm lấy danh sách tài khoản chờ duyệt
export const getResidentList = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/user/list_resident");
    
    console.log("API Response from list_resident:", res.data);
    
    // Xử lý dữ liệu từ API
    if (res.data && res.data.data) {
      // Đảm bảo từng user có đủ trường dữ liệu cần thiết, bao gồm imageFiles
      const processedData = res.data.data.map(user => ({
        ...user,
        // Đảm bảo imageFiles là mảng
        imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : []
      }));
      
      dispatch(getUserSuccess(processedData));
      return res.data;
    } else if (res.data && Array.isArray(res.data)) {
      // Trường hợp API trả về mảng trực tiếp
      const processedData = res.data.map(user => ({
        ...user,
        imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : []
      }));
      
      dispatch(getUserSuccess(processedData));
      return { data: processedData };
    } else if (res.data && res.data.status === 200 && res.data.message === "Không có cư dân nào cần được duyệt") {
      // Trường hợp không có tài khoản cần duyệt
      dispatch(getUserSuccess([]));
      return res.data;
    } else {
      // Mặc định trả về mảng rỗng nếu không thể xác định cấu trúc dữ liệu
      dispatch(getUserSuccess([]));
      return { data: [] };
    }
  } catch (error) {
    console.error("Error fetching resident list:", error);
    dispatch(getUserFailure());
    return error.response?.data || { error: true, message: "Lỗi khi lấy danh sách cư dân" };
  }
};

// Hàm duyệt tài khoản
export const verifyAndAddUser = async (dispatch, verifyUserResponseDTO) => {
  dispatch(addUserStart());
  try {
    console.log("Data sent to /user/add API:", verifyUserResponseDTO);
    const res = await userRequest.post("/user/add", verifyUserResponseDTO);
    console.log("Response from /user/add API:", res.data);
    dispatch(addUserSuccess(res.data));
    await getResidentList(dispatch);
    return {
      success: true,
      status: res.status,
      data: res.data
    };
  } catch (error) {
    console.error("Error in verifyAndAddUser:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    dispatch(addUserFailure());
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Có lỗi xảy ra khi duyệt tài khoản",
      data: error.response?.data
    };
  }
};

// Hàm từ chối tài khoản
export const rejectVerificationRequest = async (dispatch, verificationFormId) => {
  try {
    const res = await userRequest.delete(`/user/reject_verification?verificationFormId=${verificationFormId}`);
    await getResidentList(dispatch);
    return {
      success: true,
      status: res.status,
      data: res.data
    };
  } catch (error) {
    console.error("Error in rejectVerificationRequest:", error);
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Có lỗi xảy ra khi từ chối tài khoản"
    };
  }
};
//------------------------------------------------------------------------------lọc căn hộ theo trạng thái------------------------------------------------------------------------------------
//unrented
export const getUnrentedApartments = async (dispatch) => {
  try {
    const res = await publicRequest.get("/apartment/getAll/unrented");
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    console.error("Error fetching unrented apartments:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách căn hộ chưa cho thuê"
    };
  }
};

//khong co householder
export const getApartmentsWithoutHouseholder = async (dispatch) => {
  try {
    const res = await publicRequest.get("/apartment/getAll/no-householder");
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    console.error("Error fetching apartments without householder:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách căn hộ không có chủ hộ"
    };
  }
};
