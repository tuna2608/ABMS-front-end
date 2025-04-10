import HomePage from "../pages/client/HomePage/HomePage";
import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/common/LoginPage/LoginPage";
import AdminHome from "../pages/admin/AdminHome";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "../pages/common/NewPasswordPage/NewPasswordPage";
import RegisterPage from "../pages/common/RegisterPage/Register";
import OwnerHome from "../pages/owner/OwnerHome";
import RentorHome from "../pages/rentor/RentorHome";
import Chatbot from "../components/common/Chatbot/Chatbot";
import ApartmentList from "../pages/client/PostList/PostList";
import ApartmentDetail from "../pages/client/PostDetail/PostDetail";
import ChatPage from "../pages/client/ChatPage/ChatPage";
import NotificationsPage from "../pages/client/NotificationPage/NotificationPage";
import DepositApartments from "../pages/client/DepositApartment/DepositApartment";
import EditProfilePage from "../pages/common/EditProfilePage/EditProfilePage";
import StaffHome from "../pages/staff/StaffHome";
import OTPPage from "../pages/common/OTPPage/OTPPage";
import OTPVerificationPage from "../pages/common/OTPVerificationPage/OTPVerificationPage";
import PaymentSuccess from "../pages/client/Payment/PaymentSuccess";
import PaymentCancel from "../pages/client/Payment/PaymentCancel";
import FormManagement from "../pages/client/FormManagement/FormManagement";
import UpdateContract from "../pages/client/Update&VerifyContract/UpdateContract";
import VerifyContract from "../pages/client/Update&VerifyContract/VerifyContract";
import InputBankForm from "../pages/client/InputBankForm/InputBankForm";
// import BillDetailsPage from "../pages/rentor/BillDetailsPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    // {
    //     path: '/headofhousehold',
    //     page: HeadOfHousehold,
    //     isShowHeader: false
    // },
    {
        path: '/login',
        page: LoginPage,
        isShowHeader: false
    },
    {
        path: '/register',
        page: RegisterPage,
        isShowHeader: false
        },
        {
        path: '/forgot-password',
        page: ForgotPasswordPage,
        isShowHeader: false
    },
    {
        path: '/new-password',
        page: NewPasswordPage,
        isShowHeader: false
    },
    {
        path: '/verify-otp',
        page: OTPPage,
        isShowHeader: false
    },
    {
        path: '/verify-forgot-otp',
        page: OTPVerificationPage,
        isShowHeader: false
    },
    {
        path: '/adminHome/*',
        page: AdminHome,
        isShowHeader: true
    },
    {
        path: '/ownerHome/*',
        page: OwnerHome,
        isShowHeader: true
    },
    {
        path: '/rentorHome/*',
        page: RentorHome,
        isShowHeader: true
    },
    {
        path: '/staffHome/*',
        page: StaffHome,
        isShowHeader: true
    },
    {
        path: '/post',
        page: ApartmentList,
        isShowHeader: true
    },
    {
        path: '/post-detail/:postId',
        page: ApartmentDetail,
        isShowHeader: true
    },
    {
        path: '/chat-page',
        page: ChatPage,
        isShowHeader: false
    },
    {
        path: '/form',
        page: FormManagement,
        isShowHeader: true
    },
    {
        path: '/deposit-apartment',
        page: DepositApartments,
        isShowHeader: true
    },
    {
        path: '/payment/success',
        page: PaymentSuccess,
        isShowHeader: true
    },
    {
        path: '/payment/cancel',
        page: PaymentCancel,
        isShowHeader: true
    },
    {
        path: '/notification',
        page: NotificationsPage,
        isShowHeader: false
    },
    {
        path: '/chatbot',
        page: Chatbot,
        isShowHeader: false
    },
    {
        path: '/verify-contract',
        page: VerifyContract,
        isShowHeader: true
    },
    {
        path: '/update-contract',
        page: UpdateContract,
        isShowHeader: true
    },
    {
        path: '/bank-form',
        page: InputBankForm,
        isShowHeader: true
    },
    // {
    //     path: '/bill-details',
    //     page: BillDetailsPage,
    //     isShowHeader: true
    // },
    {
        path: '/edit-profile',
        page: EditProfilePage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    }
]