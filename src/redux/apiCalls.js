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
import {publicRequest, userRequest } from "../utilities/requestMethod";
import {
  addUserStart,
  addUserSuccess,
  addUserFailure,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  resetUsersSuccess,
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
import {
  getApartmentsStart,
  getApartmentsSuccess,
  getApartmentsFailure,
  createApartmentStart,
  createApartmentSuccess,
  createApartmentFailure,
  updateApartmentStart,
  updateApartmentSuccess,
  updateApartmentFailure,
  deleteApartmentStart,
  deleteApartmentSuccess,
  deleteApartmentFailure,
} from './apartmentSlice';

// Auth ------------------------------------------------------------------
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
  dispatch(resetUsersSuccess());
};

//------------------------------------------------------------------------------

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

export const sendOtpForgotPassword = async (formData) => {
  try {
    const res = await publicRequest.post("/api/forgot_password",formData);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi send otp forgot password"
    };
  }
}


//dat coc ---------------
export const depositCreate = async (formData) => {
  const form = {...formData,
    successUrl: `http://localhost:3000/payment/success`,
    cancelUrl: `http://localhost:3000/payment/cancel`,
  }
  try {
    const res = await publicRequest.post(`/deposit/create`, form);
    return res.data
  } catch (error) {
    return error.response
  }
};

export const depositSuccess = async (formData) => {
  try {
    const res = await publicRequest.post(`/payment/deposit_success`, formData);
    return res.data
  } catch (error) {
    return error.response
  }
};

export const depositCancel = async (formData) => {
  try {
    const res = await publicRequest.post(`/deposit/cancel`, formData);
    return res.data
  } catch (error) {
    return error.response
  }
};

//------------------------------------------------------------------------------CRUD Căn hộ----------------------------------------------------------------------------------
export const getApartments = async () => {
  try {
    const res = await publicRequest.get("/apartment/getAll");
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    console.error("Error fetching apartments:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách căn hộ"
    };
  }
}

export const createApartment = async (dispatch, apartmentDTO) => {
  dispatch(createApartmentStart());
  try {
    const res = await userRequest.post("/apartment/create", apartmentDTO);
    dispatch(createApartmentSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data,
      message: res.data.message
    };
  } catch (error) {
    dispatch(createApartmentFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi tạo căn hộ"
    };
  }
};

// Cập nhật căn hộ
export const updateApartment = async (dispatch, apartmentId, apartmentDTO) => {
  dispatch(updateApartmentStart());
  try {
    const res = await userRequest.put(`/apartment/update/${apartmentId}`, apartmentDTO);
    dispatch(updateApartmentSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data,
      message: res.data.message
    };
  } catch (error) {
    dispatch(updateApartmentFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật căn hộ"
    };
  }
};

// Xóa căn hộ
export const deleteApartment = async (dispatch, apartmentId) => {
  dispatch(deleteApartmentStart());
  try {
    const res = await userRequest.delete(`/apartment/delete/${apartmentId}`);
    dispatch(deleteApartmentSuccess(apartmentId));
    return {
      success: true,
      message: res.data.message
    };
  } catch (error) {
    dispatch(deleteApartmentFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi xóa căn hộ"
    };
  }
};

//------------------------------------------------------------------------------tạo bài viết mua bán căn hộ------------------------------------------------------------------------------

export const getPostsByUserId = async (dispatch, userId) => {
  try {
    const res = await publicRequest.get(`/post/user/${userId}`);
    return {
      success: true,
      data: res.data.data,
      message: res.data.message || "Lấy bài viết thành công"
    };
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi lấy bài viết"
    };
  }
};

//get tat ca bai viet
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

// get bai viet theo id
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

//------------------------------------------------------------------------------CRUD consumption Bill------------------------------------------------------------------------------
// get tat ca tieu thu 
export const getAllConsumption = async (dispatch) => {
  try {
    const res = await publicRequest.get(`/consumption/getAll`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách lượng tiêu thụ"
    };
  }
}

// import file excel to save to database
export const importFile = async (formData) => {
  try {
    const res = await publicRequest.post(`/consumption/upload_file `,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách lượng tiêu thụ"
    };
  }
}
//create bill
export const createBillConsumption = async (dispatch,formData) => {
  try {
    const res = await publicRequest.post(`/bill/createBillConsumption`,formData);
    return res.data;
  } catch (error) {
    return error.response;
  }
}

//create bill
export const createBillMonthPaid = async (dispatch,formData) => {
  try {
    const res = await publicRequest.post(`/bill/createBillMonthPaid`,formData);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi tạo hóa đơn"
    };
  }
}
// get tat ca hoa don
export const getAllBill = async (dispatch) => {
  try {
    const res = await publicRequest.get(`/bill/viewAll`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách hóa đơn"
    };
  }
}

// get tat ca bill theo owner
export const getAllBillOwner = async (dispatch,ownerId) => {
  try {
    const res = await publicRequest.get(`/bill/view_own_bill_list/${ownerId}`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách hóa đơn"
    };
  }
}

// get tat ca bill theo rentor
export const getAllBillRentor = async (dispatch,rentorId) => {
  try {
    const res = await publicRequest.get(`/bill/getRentorBills/${rentorId}`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách hóa đơn"
    };
  }
}


// thanh toan hoa don bill
export const paymentBill = async (formData) => {
  try {
    const res = await publicRequest.post(`/order/create`,formData);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi thanh toan hóa đơn"
    };
  }
}

//payment Bill success
export const paymentBillSuccess = async (formData) => {
  try {
    const res = await publicRequest.post(`/payment/success`,formData);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || ''
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách hóa đơn"
    };
  }
}

//get own apartment by userId
export const getOwnApartmentRented = async (userId) => {
  try {
    const res = await publicRequest.get(`/apartment/getOwnerApartmentRented/${userId}`);
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

//-------------------------------------------------------------------------------------
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

//update post
export const updatePost = async (postId, formData) => {
  try {
    const res = await userRequest.put(`/post/update/${postId}`, formData, {
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
    console.error("Error updating post:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật bài đăng"
    };
  }
};

//delete post
export const deletePost = async (postId) => {
  try {
    const res = await userRequest.delete(`/post/delete/${postId}`);
    return {
      success: true,
      message: 'Xóa bài viết thành công',
      status: res.data.status
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi xóa bài viết"
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
    if (res.data && res.data.data) {
      const processedData = res.data.data.map(user => ({
        ...user,
        imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : []
      }));
      
      dispatch(getUserSuccess(processedData));
      return res.data;
    } else if (res.data && Array.isArray(res.data)) {
      const processedData = res.data.map(user => ({
        ...user,
        imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : []
      }));
      
      dispatch(getUserSuccess(processedData));
      return { data: processedData };
    } else if (res.data && res.data.status === 200 && res.data.message === "Không có cư dân nào cần được duyệt") {
      dispatch(getUserSuccess([]));
      return res.data;
    } else {
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
//------------------------------------------------------------------------------thông báo------------------------------------------------------------------------------------
//lay noti tu id
  export const fetchNotifications = async (userId) => {
    try {
      const res = await userRequest.get(`/notification/view_all?userId=${userId}`);
      return {
        success: true,
        data: res.data.data || [],
        message: res.data.message || 'Lấy thông báo thành công'
      };
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Có lỗi xảy ra khi lấy thông báo'
      };
    }
  };

  // xoa noti
export const deleteNotification = async (notificationId, userId) => {
  try {
    const res = await userRequest.delete(`/notification/delete?notificationId=${notificationId}&userId=${userId}`);
    return {
      success: true,
      message: res.data.message || 'Xóa thông báo thành công'
    };
  } catch (error) {
    console.error("Error deleting notification:", error);
    return {
      success: false,
      message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa thông báo'
    };
  }
};

// gui noti
export const sendNotification = async (notificationData) => {
  try {
    const res = await userRequest.post('/notification/send', {
      content: notificationData.content,
      type: notificationData.type,
      userId: notificationData.userId
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message || 'Gửi thông báo thành công'
    };
  } catch (error) {
    console.error("Error sending notification:", error);
    return {
      success: false,
      message: error.response?.data?.message || 'Có lỗi xảy ra khi gửi thông báo'
    };
  }
};

// broadcast noti (noti toàn cuc, chi admin hoac staff)
export const broadcastNotification = async (notificationData, role) => {
  try {
    const res = await userRequest.post(`/notification/broadcast-all?role=${role}`, {
      content: notificationData.content,
      type: notificationData.type
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message || 'Gửi thông báo toàn cục thành công'
    };
  } catch (error) {
    console.error("Error broadcasting notification:", error);
    return {
      success: false,
      message: error.response?.data?.message || 'Có lỗi xảy ra khi gửi thông báo toàn cục'
    };
  }
};