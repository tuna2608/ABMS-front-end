import { lazy } from "react";

const HomePage = lazy(() => import("../pages/client/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/common/NotFoundPage/NotFoundPage"));
const LoginPage = lazy(() => import("../pages/common/LoginPage/LoginPage"));
const AdminHome = lazy(() => import("../pages/admin/AdminHome"));
const ForgotPasswordPage = lazy(
  () => import("../pages/common/ForgotPasswordPage/ForgotPasswordPage")
);
const NewPasswordPage = lazy(() => import("../pages/common/NewPasswordPage/NewPasswordPage"));
const RegisterPage = lazy(() => import("../pages/common/RegisterPage/Register"));
const OwnerHome = lazy(() => import("../pages/owner/OwnerHome"));
const RentorHome = lazy(() => import("../pages/rentor/RentorHome"));
const Chatbot = lazy(() => import("../components/common/Chatbot/Chatbot"));
const ApartmentList = lazy(() => import("../pages/client/PostList/PostList"));
const ApartmentDetail = lazy(() => import("../pages/client/PostDetail/PostDetail"));
const ChatPage = lazy(() => import("../pages/client/ChatPage/ChatPage"));
const NotificationsPage = lazy(() => import("../pages/client/NotificationPage/NotificationPage"));
const DepositApartments = lazy(() => import("../pages/client/DepositApartment/DepositApartment"));
const ServicePage = lazy(() => import("../pages/client/ServicePage/ServicePage"));
const EditProfilePage = lazy(() => import("../pages/common/EditProfilePage/EditProfilePage"));
const StaffHome = lazy(() => import("../pages/staff/StaffHome"));
const OTPPage = lazy(() => import("../pages/common/OTPPage/OTPPage"));
const OTPVerificationPage = lazy(
  () => import("../pages/common/OTPVerificationPage/OTPVerificationPage")
);
const PaymentSuccess = lazy(() => import("../pages/client/Payment/PaymentSuccess"));
const PaymentCancel = lazy(() => import("../pages/client/Payment/PaymentCancel"));
const FormManagement = lazy(() => import("../pages/client/FormManagement/FormManagement"));
const UpdateContract = lazy(() => import("../pages/client/Update&VerifyContract/UpdateContract"));
const VerifyContract = lazy(() => import("../pages/client/Update&VerifyContract/VerifyContract"));
const InputBankForm = lazy(() => import("../pages/client/InputBankForm/InputBankForm"));
const ChangePasswordPage = lazy(
  () => import("../pages/common/ChangePasswordPage/ChangePasswordPage")
);
const UserCoinRequests = lazy(() => import("../pages/client/UserCoinRequests/UserCoinRequests"));
const ServiceDetailPage = lazy(() => import("../pages/client/ServicePage/ServiceDetailPage"));
const UserFormList = lazy(() => import("../pages/client/FormManagement/UserFormList"));

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/login",
    page: LoginPage,
    isShowHeader: false,
  },
  {
    path: "/register",
    page: RegisterPage,
    isShowHeader: false,
  },
  {
    path: "/forgot-password",
    page: ForgotPasswordPage,
    isShowHeader: false,
  },
  {
    path: "/new-password",
    page: NewPasswordPage,
    isShowHeader: false,
  },
  {
    path: "/change-password",
    page: ChangePasswordPage,
    isShowHeader: false,
  },
  {
    path: "/verify-otp",
    page: OTPPage,
    isShowHeader: false,
  },
  {
    path: "/verify-forgot-otp",
    page: OTPVerificationPage,
    isShowHeader: false,
  },
  {
    path: "/adminHome/*",
    page: AdminHome,
    isShowHeader: true,
  },
  {
    path: "/ownerHome/*",
    page: OwnerHome,
    isShowHeader: true,
  },
  {
    path: "/rentorHome/*",
    page: RentorHome,
    isShowHeader: true,
  },
  {
    path: "/staffHome/*",
    page: StaffHome,
    isShowHeader: true,
  },
  {
    path: "/post",
    page: ApartmentList,
    isShowHeader: true,
  },
  {
    path: "/post-detail/:postId",
    page: ApartmentDetail,
    isShowHeader: true,
  },
  {
    path: "/chat-page",
    page: ChatPage,
    isShowHeader: false,
  },
  {
    path: "/form-request",
    page: FormManagement,
    isShowHeader: true,
  },
  {
    path: "/form-list",
    page: UserFormList,
    isShowHeader: true,
  },
  {
    path: "/deposit-apartment",
    page: DepositApartments,
    isShowHeader: true,
  },
  {
    path: "/payment/success",
    page: PaymentSuccess,
    isShowHeader: true,
  },
  {
    path: "/payment/cancel",
    page: PaymentCancel,
    isShowHeader: true,
  },
  {
    path: "/notification",
    page: NotificationsPage,
    isShowHeader: false,
  },
  {
    path: "/chatbot",
    page: Chatbot,
    isShowHeader: false,
  },
  {
    path: "/verify-contract",
    page: VerifyContract,
    isShowHeader: true,
  },
  {
    path: "/update-contract",
    page: UpdateContract,
    isShowHeader: true,
  },
  {
    path: "/bank-form",
    page: InputBankForm,
    isShowHeader: true,
  },
  {
    path: "/edit-profile",
    page: EditProfilePage,
    isShowHeader: true,
  },
  {
    path: "/service",
    page: ServicePage,
    isShowHeader: true,
  },
  {
    path: "/service-detail",
    page: ServiceDetailPage,
    isShowHeader: true,
  },
  {
    path: "/coin-request",
    page: UserCoinRequests,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
