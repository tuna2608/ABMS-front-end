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
  forgotPasswordStart,
  forgotPasswordOtpSent,
  forgotPasswordFailure,
  forgotPasswordOtpVerified,
  forgotPasswordReset,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} from "./authSlice";
import {
  publicRequest,
  userRequest,
  PAYMENT_RETURN_URL,
  PAYMENT_CANCEL_URL,
} from "../utilities/requestMethod";
import {
  addUserStart,
  addUserSuccess,
  addUserFailure,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  resetUsersSuccess,
} from "./userSlice";
import moment from "moment";
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
  addNewContact,
} from "./chatSlice";
import {
  createApartmentStart,
  createApartmentSuccess,
  createApartmentFailure,
  updateApartmentStart,
  updateApartmentSuccess,
  updateApartmentFailure,
  deleteApartmentStart,
  deleteApartmentSuccess,
  deleteApartmentFailure,
} from "./apartmentSlice";
import {
  getAllPostsFailure,
  getAllPostsStart,
  getAllPostsSuccess,
  getPostFailure,
  getPostStart,
  getPostSuccess,
} from "./postSlice";
import {
  getFormStart,
  getFormSuccess,
  getFormFailure,
  getAllFormsStart,
  getAllFormsSuccess,
  getAllFormsFailure,
  createFormStart,
  createFormSuccess,
  createFormFailure,
  updateFormStatusSuccess,
} from "./formSlice";
import axios from "axios";

// Helper: bọc try/catch cho nhóm API trả về { success, data, message } đồng nhất.
// - request: hàm gọi axios, vd () => publicRequest.get('/x')
// - errorMessage: message mặc định khi lỗi (nếu BE không trả message)
// - options.successMessage: message mặc định khi thành công
// - options.emptyData: giá trị data mặc định ([] hoặc {})
const apiCall = async (
  request,
  errorMessage = "",
  { successMessage = "", emptyData = [] } = {}
) => {
  try {
    const res = await request();
    return {
      success: true,
      data: res.data.data || emptyData,
      message: res.data.message || successMessage,
    };
  } catch (error) {
    return {
      success: false,
      data: emptyData,
      message: error.response?.data?.message || errorMessage,
    };
  }
};

// Auth ------------------------------------------------------------------
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/login", user);
    dispatch(loginSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "",
    };
  } catch (error) {
    dispatch(loginFailure());
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi đăng nhập tài khoản",
    };
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/api/register", user);
    dispatch(registerSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "",
    };
  } catch (error) {
    dispatch(registerFail());
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi đăng ký tài khoản",
    };
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
    return error.response;
  }
};

export const logoutDispatch = async (dispatch) => {
  dispatch(logout());
  dispatch(resetUsersSuccess());
};

//------------------------------------------------------------------------------

export const getImageCloud = async (formData) => {
  return apiCall(
    () =>
      userRequest.post(`/user/update_image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    "Có lỗi xảy ra khi tải ảnh lên",
    { successMessage: "Tải ảnh lên thành công" }
  );
};

export const editProfile = async (dispatch, formData) => {
  dispatch(editProfileStart());
  try {
    const res = await publicRequest.put(`/user/edit_profile`, formData);
    dispatch(editProfileSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Thay đổi thông tin cá nhân thành công",
    };
  } catch (error) {
    dispatch(editProfileFail());
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Có lỗi xảy ra khi thay đổi thông tin cá nhân",
    };
  }
};

// Forgot Password APIs
export const forgotPassword = async (dispatch, email) => {
  dispatch(forgotPasswordStart(email));
  try {
    const res = await publicRequest.post("/api/forgot_password", { email });
    dispatch(forgotPasswordOtpSent());
    return res.data;
  } catch (error) {
    dispatch(forgotPasswordFailure());
    return error.response.data;
  }
};

export const verifyForgotPasswordOTP = async (dispatch, user) => {
  dispatch(verifyStart());
  try {
    const res = await publicRequest.post("/api/verify_otp", user);
    dispatch(forgotPasswordOtpVerified());
    return res.data;
  } catch (error) {
    dispatch(verifyFail());
    return error.response.data;
  }
};

export const resetPassword = async (dispatch, resetPasswordDTO) => {
  dispatch(verifyStart());
  try {
    const res = await publicRequest.post("/api/reset_password", resetPasswordDTO);
    dispatch(forgotPasswordReset());
    return res.data;
  } catch (error) {
    dispatch(verifyFail());
    return (
      error.response?.data || {
        message: "Có lỗi xảy ra. Vui lòng thử lại.",
        status: 500,
      }
    );
  }
};
// Thêm hàm API để đổi mật khẩu
export const changePassword = async (dispatch, changePasswordDTO) => {
  dispatch(changePasswordStart());
  try {
    const res = await userRequest.post("/api/change_password", changePasswordDTO);

    if (res.data.status === 200) {
      dispatch(changePasswordSuccess());
      return {
        success: true,
        message: res.data.message || "Đổi mật khẩu thành công",
      };
    } else {
      dispatch(changePasswordFailure());
      return {
        success: false,
        message: res.data.message || "Đổi mật khẩu thất bại",
      };
    }
  } catch (error) {
    dispatch(changePasswordFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu",
    };
  }
};

//------------------------------------------------------Deposit View---------------------------------------------------------------------------------

// Lấy danh sách deposit
export const getAllDeposits = async () => {
  return apiCall(
    () => publicRequest.get(`/deposit/getAll`),
    "Có lỗi xảy ra khi lấy danh sách deposit",
    { successMessage: "Lấy danh sách deposit thành công" }
  );
};

//dat coc ---------------
export const depositCreate = async (formData) => {
  const form = {
    ...formData,
    successUrl: PAYMENT_RETURN_URL,
    cancelUrl: PAYMENT_CANCEL_URL,
  };
  return apiCall(
    () => publicRequest.post(`/deposit/create`, form),
    "Lỗi khi chuyển sang trang đặt cọc"
  );
};

export const getAllPayment = async () => {
  return apiCall(() => publicRequest.get(`/bill/viewAll`), "Lỗi khi lấy danh sách thanh toán", {
    successMessage: "Lấy danh sách thanh toán thành công",
  });
};

export const depositSuccess = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/payment/deposit_success`, formData),
    "Lỗi khi thực hiện đặt cọc thành công"
  );
};

export const depositCancel = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/deposit/cancel`, formData),
    "Lỗi khi thực hiện hủy đặt cọc"
  );
};

//------------------------------------------------------------------------------CRUD Căn hộ----------------------------------------------------------------------------------
export const getApartments = async () => {
  return apiCall(() => publicRequest.get("/apartment/getAll"), "Lỗi khi lấy danh sách căn hộ");
};

export const createApartment = async (dispatch, apartmentDTO) => {
  dispatch(createApartmentStart());
  try {
    const res = await userRequest.post("/apartment/create", apartmentDTO);
    dispatch(createApartmentSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    dispatch(createApartmentFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi tạo căn hộ",
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
      message: res.data.message,
    };
  } catch (error) {
    dispatch(updateApartmentFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật căn hộ",
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
      message: res.data.message,
    };
  } catch (error) {
    dispatch(deleteApartmentFailure());
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi xóa căn hộ",
    };
  }
};

//view rentor trong căn hộ
export const getRentorByApartment = async (apartmentName) => {
  try {
    const res = await publicRequest.get(`/apartment/get_rentor?apartmentName=${apartmentName}`);
    return {
      success: res.data?.status === 200,
      data: res.data?.data || [],
      message: res.data?.message || "Lấy danh sách người thuê thành công",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Có lỗi xảy ra khi lấy danh sách người thuê",
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
      message: res.data.message || "Lấy bài viết thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi lấy bài viết",
    };
  }
};

//get tat ca bai viet
export const getAllPosts = async (dispatch) => {
  dispatch(getAllPostsStart());
  try {
    const res = await publicRequest.get(`/post`);
    dispatch(getAllPostsSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "",
    };
  } catch (error) {
    dispatch(getAllPostsFailure());
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Lỗi khi lấy danh sách bài viết",
    };
  }
};

export const getAllPostsNoDispatch = async () => {
  return apiCall(() => publicRequest.get(`/post`), "Lỗi khi lấy danh sách bài viết");
};

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
};

//------------------------------------------------------------------------------CRUD consumption Bill------------------------------------------------------------------------------
// get tat ca tieu thu
export const getAllConsumption = async (dispatch) => {
  return apiCall(
    () => publicRequest.get(`/consumption/getAll`),
    "Lỗi khi lấy danh sách lượng tiêu thụ"
  );
};

export const getConsumptionByMonthYear = async (month, year) => {
  return apiCall(
    () => publicRequest.get(`/consumption/viewByMonthYear?month=${month}&year=${year}`),
    "Lỗi khi lấy danh sách lượng tiêu thụ"
  );
};

// import file excel to save to database
export const importFile = async (formData) => {
  return apiCall(
    () =>
      publicRequest.post(`/consumption/upload_file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    "Lỗi khi tải lên tệp danh sách tiêu thụ"
  );
};
//create bill
export const createBillConsumption = async (dispatch, formData) => {
  try {
    const res = await publicRequest.post(`/bill/createBillConsumption`, formData);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

//create bill
export const createBillMonthPaid = async (dispatch, formData) => {
  return apiCall(
    () => publicRequest.post(`/bill/createBillMonthPaid`, formData),
    "Lỗi khi tạo hóa đơn"
  );
};

//create bill
export const createBillManagement = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/bill/createBillManagement`, formData),
    "Lỗi khi tạo hóa đơn"
  );
};
// get tat ca hoa don
export const getAllBill = async (dispatch) => {
  return apiCall(() => publicRequest.get(`/bill/viewAll`), "Lỗi khi lấy danh sách hóa đơn");
};

// get tat ca bill theo owner
export const getAllBillOwner = async (dispatch, ownerId) => {
  return apiCall(
    () => publicRequest.get(`/bill/view_own_bill_list/${ownerId}`),
    "Lỗi khi lấy danh sách hóa đơn"
  );
};

// get tat ca bill theo rentor
export const getAllBillRentor = async (dispatch, rentorId) => {
  return apiCall(
    () => publicRequest.get(`/bill/getRentorBills/${rentorId}`),
    "Lỗi khi lấy danh sách hóa đơn"
  );
};

// thanh toan hoa don bill
export const paymentBill = async (formData) => {
  return apiCall(() => publicRequest.post(`/order/create`, formData), "Lỗi khi thanh toan hóa đơn");
};

//payment Bill success
export const paymentBillSuccess = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/payment/success`, formData),
    "Lỗi khi thanh toán hóa đơn thành công "
  );
};

//payment Bill cancel
export const paymentBillCancel = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/payment/cancel`, formData),
    "Lỗi khi thanh toán hóa đơn thất bại"
  );
};

//get own apartment by userId
export const getOwnApartmentRented = async (userId) => {
  return apiCall(
    () => publicRequest.get(`/apartment/getOwnerApartmentRented/${userId}`),
    "Lỗi khi lấy danh sách căn hộ"
  );
};

//-------------------------------------------------------------------------------------
//get own apartment by userId
export const getOwnApartments = async (userId) => {
  return apiCall(
    () => publicRequest.get(`/apartment/get_own_apartment?userId=${userId}`),
    "Lỗi khi lấy danh sách căn hộ"
  );
};

//create post
export const createPost = async (formData) => {
  try {
    const res = await userRequest.post("/post/add_post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi tạo bài đăng",
    };
  }
};

//check truoc khi dang bai
export const checkExistingPost = async (apartmentName, postType) => {
  try {
    const res = await publicRequest.get("/post/check-existing-post", {
      params: { apartmentName, postType },
    });
    return {
      success: true,
      exists: res.data.exists,
    };
  } catch (error) {
    return {
      success: false,
      exists: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi kiểm tra bài đăng",
    };
  }
};

//update post
export const updatePost = async (postId, formData) => {
  try {
    const res = await userRequest.put(`/post/update/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật bài đăng",
    };
  }
};

//delete post
export const deletePost = async (postId) => {
  try {
    const res = await userRequest.delete(`/post/delete/${postId}`);
    return {
      success: true,
      message: "Xóa bài viết thành công",
      status: res.data.status,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi xóa bài viết",
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
};

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
    dispatch(markMessagesAsReadFailure(error.message));
    throw error;
  }
};

// Tìm kiếm thông tin người dùng theo ID
export const getUserInfo = (userId) => async (dispatch) => {
  try {
    const res = await userRequest.get(`/user/get/${userId}`);
    if (res.data && res.data.data) {
      dispatch(
        addNewContact({
          userId: res.data.data.userId,
          userName: res.data.data.userName,
          fullName: res.data.data.fullName,
          userImgUrl: res.data.data.userImgUrl,
          unreadCount: 0,
        })
      );
      return res.data.data;
    }
    return null;
  } catch {
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
    if (formData.get("verificationFormType") === "2") {
      formData.set("contractEndDate", null);
    }
    const res = await userRequest.post("/user/verify_user", formData);

    dispatch(verifySuccess());
    return res.data;
  } catch (error) {
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
      const processedData = res.data.data.map((user) => ({
        ...user,
        imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : [],
      }));
      const filterUser = processedData.filter((user) => user.verified === false);
      dispatch(getUserSuccess(filterUser));
      return res.data;
    } else if (res.data && Array.isArray(res.data)) {
      const processedData = res.data.map((user) => ({
        ...user,
        imageFiles: Array.isArray(user.imageFiles) ? user.imageFiles : [],
      }));

      dispatch(getUserSuccess(processedData));
      return { data: processedData };
    } else if (
      res.data &&
      res.data.status === 200 &&
      res.data.message === "Không có cư dân nào cần được duyệt"
    ) {
      dispatch(getUserSuccess([]));
      return res.data;
    } else {
      dispatch(getUserSuccess([]));
      return { data: [] };
    }
  } catch (error) {
    dispatch(getUserFailure());
    return error.response?.data || { error: true, message: "Lỗi khi lấy danh sách cư dân" };
  }
};

// Hàm duyệt tài khoản
export const verifyAndAddUser = async (dispatch, verifyUserResponseDTO) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post("/user/add", verifyUserResponseDTO);
    dispatch(addUserSuccess(res.data));
    await getResidentList(dispatch);
    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    dispatch(addUserFailure());
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Có lỗi xảy ra khi duyệt tài khoản",
      data: error.response?.data,
    };
  }
};

// Hàm từ chối tài khoản
export const rejectVerificationRequest = async (dispatch, verificationFormId) => {
  try {
    const res = await userRequest.delete(
      `/user/reject_verification?verificationFormId=${verificationFormId}`
    );
    await getResidentList(dispatch);
    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Có lỗi xảy ra khi từ chối tài khoản",
    };
  }
};
//------------------------------------------------------------------------------lọc căn hộ theo trạng thái------------------------------------------------------------------------------------
//unrented
export const getUnrentedApartments = async (dispatch) => {
  return apiCall(
    () => publicRequest.get("/apartment/getAll/unrented"),
    "Lỗi khi lấy danh sách căn hộ chưa cho thuê"
  );
};

//khong co householder
export const getApartmentsWithoutHouseholder = async (dispatch) => {
  return apiCall(
    () => publicRequest.get("/apartment/getAll/no-householder"),
    "Lỗi khi lấy danh sách căn hộ không có chủ hộ"
  );
};
//------------------------------------------------------------------------------thông báo------------------------------------------------------------------------------------
//lay noti tu id
export const fetchNotifications = async (userId) => {
  return apiCall(
    () => userRequest.get(`/notification/view_all?userId=${userId}`),
    "Có lỗi xảy ra khi lấy thông báo",
    { successMessage: "Lấy thông báo thành công" }
  );
};

// xoa noti
export const deleteNotification = async (notificationId, userId) => {
  try {
    const res = await userRequest.delete(
      `/notification/delete?notificationId=${notificationId}&userId=${userId}`
    );
    return {
      success: true,
      message: res.data.message || "Xóa thông báo thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi xóa thông báo",
    };
  }
};

// gui noti
export const sendNotification = async (notificationData) => {
  try {
    const res = await userRequest.post("/notification/send", {
      content: notificationData.content,
      type: notificationData.type,
      userId: notificationData.userId,
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message || "Gửi thông báo thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi gửi thông báo",
    };
  }
};

// broadcast noti (noti toàn cuc, chi admin hoac staff)
export const broadcastNotification = async (notificationData, role) => {
  try {
    const res = await userRequest.post(`/notification/broadcast-all?role=${role}`, {
      content: notificationData.content,
      type: notificationData.type,
    });
    return {
      success: true,
      data: res.data.data,
      message: res.data.message || "Gửi thông báo toàn cục thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi gửi thông báo toàn cục",
    };
  }
};

//---------------------------------------------------CRUD Contract View---------------------------------------------------------------------------------
//lấy danh sách hợp đồng theo căn hộ
export const getContractOwners = async (apartmentName) => {
  return apiCall(
    () => publicRequest.get(`/verification/list_contract_owner?apartmentName=${apartmentName}`),
    "Có lỗi xảy ra khi lấy danh sách hợp đồng",
    { successMessage: "Lấy danh sách hợp đồng thành công" }
  );
};

export const getContractRentor = async (rentorId) => {
  return apiCall(
    () => publicRequest.get(`/verification/getByRentorId/${rentorId}`),
    "Có lỗi xảy ra khi lấy danh sách hợp đồng của người thuê",
    { successMessage: "Lấy danh sách hợp đồng của người thuê thành công" }
  );
};

//cập nhật hợp đồng mới
export const updateContractVerification = async (
  verificationId,
  startDate,
  endDate,
  imageFiles
) => {
  try {
    const formData = new FormData();
    formData.append("verificationId", verificationId);

    // Format dates to ISO string
    const formatDate = (date) => {
      return moment(date).format("YYYY-MM-DDT00:00:00.000");
    };

    formData.append("contractStartDate", formatDate(startDate));
    formData.append("contractEndDate", formatDate(endDate));

    if (imageFiles?.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("imageFile", file);
      });
    }

    const res = await publicRequest.put("/verification/update_verification", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: res.data?.status === 201,
      data: res.data?.data,
      message: res.data?.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật hợp đồng",
    };
  }
};

//----------------------------------------------------------------------------------------------CRUD Forms---------------------------------------------------------------------------------
// Get a single form
export const getForm = async (dispatch, formId) => {
  dispatch(getFormStart());
  try {
    const res = await publicRequest.get(`/api/forms/${formId}`);
    dispatch(getFormSuccess(res.data.form));
    return {
      success: true,
      data: res.data.form || {},
      message: res.data.message || "Lấy form thành công",
    };
  } catch (error) {
    dispatch(getFormFailure());
    return {
      success: false,
      data: {},
      message: error.response?.data?.message || "Không thể lấy form",
    };
  }
};

// Get all forms
export const getAllForms = async (dispatch) => {
  dispatch(getAllFormsStart());
  try {
    const res = await publicRequest.get(`/api/forms/all`);
    dispatch(getAllFormsSuccess(res.data.forms));
    return {
      success: true,
      data: res.data.forms || [],
      message: res.data.message || "Lấy danh sách đơn từ thành công",
    };
  } catch (error) {
    dispatch(getAllFormsFailure());
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Không thể lấy danh sách đơn từ",
    };
  }
};

export const getFormsByUserId = async (userId) => {
  try {
    const res = await publicRequest.get(`/api/forms/user/${userId}`);
    return {
      success: true,
      data: res.data.forms || [],
      message: res.data.message || "Lấy danh sách đơn từ thành công",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Không thể lấy danh sách đơn từ",
    };
  }
};

// Create new form (with file)
export const createForm = async (dispatch, userId, dto) => {
  dispatch(createFormStart());
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("formType", dto.formType);
    formData.append("apartmentId", dto.apartmentId);
    formData.append("reason", dto.reason);
    formData.append("file", dto.file);

    const res = await publicRequest.post(`/api/forms/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(createFormSuccess(res.data.data));
    return {
      success: true,
      data: res.data.data || {},
      message: res.data.message || "Tạo đơn thành công",
    };
  } catch (error) {
    dispatch(createFormFailure());
    return {
      success: false,
      data: {},
      message: error.response?.data?.message || "Tạo đơn thất bại",
    };
  }
};

// Approve or reject form (admin)
export const approveForm = async (dispatch, formId, status) => {
  try {
    const res = await publicRequest.put(`/api/forms/approve/${formId}?status=${status}`);
    dispatch(updateFormStatusSuccess(res.data.form));
    return {
      success: true,
      data: res.data.form || {},
      message: res.data.message || "Cập nhật trạng thái thành công",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: error.response?.data?.message || "Duyệt đơn thất bại",
    };
  }
};
//-------------------------------------------------------------------------CRUD Facility Post------------------------------------------------------------------------------------
// Get all facilities da duoc duyet
export const getVerifiedFacilities = async () => {
  return apiCall(
    () => publicRequest.get("/facility/get_verified"),
    "Có lỗi xảy ra khi lấy danh sách dịch vụ đã duyệt",
    { successMessage: "Lấy danh sách dịch vụ đã duyệt thành công" }
  );
};

//lay bai viet chua duoc duyet
export const getUnverifiedFacilities = async () => {
  return apiCall(
    () => publicRequest.get("/facility/get_unverified"),
    "Có lỗi xảy ra khi lấy danh sách dịch vụ chưa duyệt",
    { successMessage: "Lấy danh sách dịch vụ chưa duyệt thành công" }
  );
};

// Get facility by ID
export const getFacilityById = async (facilityId) => {
  return apiCall(
    () => publicRequest.get(`/facility/view_facility_post/${facilityId}`),
    "Có lỗi xảy ra khi lấy thông tin dịch vụ",
    { successMessage: "Lấy thông tin dịch vụ thành công", emptyData: {} }
  );
};

// Create new facility
export const createFacility = async (formData) => {
  try {
    const res = await publicRequest.post("/facility/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: res.data?.status === 201,
      data: res.data?.data,
      message: res.data?.message || "Tạo bài đăng thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi tạo bài đăng",
    };
  }
};

// Verify facility
export const verifyFacilityPost = async (facilityId, verifiedUserId) => {
  try {
    const res = await publicRequest.post(`/facility/verified/${facilityId}`, {
      verifiedUserId,
    });
    return {
      success: res.data?.status === 201,
      data: res.data?.data,
      message: res.data?.message || "Duyệt bài đăng thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi duyệt bài đăng",
    };
  }
};

// Reject facility
export const rejectFacilityPost = async (facilityId, verifiedUserId, reason) => {
  try {
    const res = await publicRequest.post(`/facility/rejected/${facilityId}`, {
      verifiedUserId,
      reason,
    });
    return {
      success: res.data?.status === 201,
      data: res.data?.data,
      message: res.data?.message || "Từ chối bài đăng thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi từ chối bài đăng",
    };
  }
};

export const getFacilityByUserId = async (userId) => {
  return apiCall(
    () => publicRequest.get(`/facility/getFacilityByUser/${userId}`),
    "Có lỗi xảy ra khi lấy danh sách bài đăng",
    { successMessage: "Lấy danh sách bài đăng thành công" }
  );
};

//update facility
export const updateFacility = async (
  facilityId,
  userId,
  facilityHeader,
  facilityPostContent,
  files
) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("facilityHeader", facilityHeader); // Thêm dòng này
    formData.append("facilityPostContent", facilityPostContent);

    if (Array.isArray(files) && files.length > 0) {
      files.forEach((file) => {
        formData.append("file", file);
      });
    }

    const res = await publicRequest.put(`/facility/update/${facilityId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: res.data?.status === 201,
      data: res.data?.data,
      message: res.data?.message || "Cập nhật bài đăng thành công",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Có lỗi xảy ra khi cập nhật bài đăng",
    };
  }
};

//----------------------------ReCoin------------------------------------//

//Lấy danh sách ngân hàng
export const getListBank = async () => {
  try {
    const res = await axios.get(`https://api.vietqr.io/v2/banks`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Lấy danh sách ngân hàng thành công",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: error.response?.data?.message || "Lỗi lấy danh sách ngân hàng",
    };
  }
};
//Tạo yêu cầu rút tiền
export const requestCreateReCoin = async (formData) => {
  return apiCall(() => publicRequest.post(`/recoin/add`, formData), "Lỗi tạo yêu cầu rút tiền", {
    successMessage: "Tạo yêu cầu rút tiền thành công",
    emptyData: {},
  });
};
//Lấy tất cả danh sách yêu cầu rút tiền
export const getAllReCoin = async () => {
  try {
    const res = await publicRequest.get(`/recoin/getAll`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Lấy tất cả danh sách yêu cầu rút tiền thành công",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: error.response?.data?.message || "Lỗi lấy tất cả danh sách yêu cầu rút tiền",
    };
  }
};
//Lấy danh sách yêu cầu rút tiền của người dùng
export const getReCoinByUserId = async (userId) => {
  try {
    const res = await publicRequest.get(`/recoin/getByUserId/${userId}`);
    return {
      success: true,
      data: res.data.data || [],
      message: res.data.message || "Lấy danh sách yêu cầu rút tiền của người dùng thành công",
    };
  } catch (error) {
    return {
      success: false,
      data: {},
      message: error.response?.data?.message || "Lỗi lấy danh sách yêu cầu rút tiền của người dùng",
    };
  }
};

export const acceptReCoin = async (formData) => {
  return apiCall(() => publicRequest.post(`/recoin/accept`, formData), "Lỗi xác nhận chuyển tiền", {
    successMessage: "Đã xác nhận chuyển tiền thành công",
    emptyData: {},
  });
};

export const rejectReCoin = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/recoin/reject`, formData),
    "Lỗi từ chối yêu cầu rút tiền",
    { successMessage: "Từ chối yêu cầu rút tiền thành công", emptyData: {} }
  );
};

export const acceptReceivedReCoin = async (formData) => {
  return apiCall(
    () => publicRequest.post(`/recoin/acceptReceived`, formData),
    "Lỗi xác nhận rút tiền",
    { successMessage: "Xác nhận rút tiền thành công", emptyData: {} }
  );
};
