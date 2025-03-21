import HomePage from "../pages/client/HomePage/HomePage";
import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/common/LoginPage/LoginPage";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage/ForgotPasswordPage";
import RegisterPage from "../pages/common/RegisterPage/Register";
import OwnerHome from "../pages/owner/ownerHome/OwnerHome";
import Chatbot from "../components/common/Chatbot/Chatbot";
import ApartmentList from "../pages/client/PostList/PostList";
import ApartmentDetail from "../pages/client/PostDetail/PostDetail";
import ChatPage from "../pages/client/ChatPage/ChatPage";
import NotificationsPage from "../pages/client/NotificationPage/NotificationPage";
import EditProfilePage from "../pages/common/EditProfilePage/EditProfilePage";
import StaffHome from "../pages/staff/StaffHome";
import CardManagement from "../pages/staff/CardManagement";
import OTPPage from "../pages/common/OTPPage/OTPPage";





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
        path: '/forgot',
        page: ForgotPasswordPage,
        isShowHeader: false
    },
    {
        path: '/verify-otp',
        page: OTPPage,
        isShowHeader: false
    },
    {
        path: '/adminHome',
        page: AdminHome,
        isShowHeader: true
    },
    {
        path: '/ownerHome',
        page: OwnerHome,
        isShowHeader: true
    },
    {
        path: '/staffHome',
        page: StaffHome,
        isShowHeader: true
    },
    {
        path: '/card',
        page: CardManagement,
        isShowHeader: true
    },
    {
        path: '/post',
        page: ApartmentList,
        isShowHeader: true
    },
    {
        path: '/post-detail',
        page: ApartmentDetail,
        isShowHeader: true
    },
    {
        path: '/chat-page',
        page: ChatPage,
        isShowHeader: false
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