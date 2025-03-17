import HomePage from "../pages/client/HomePage/HomePage";
import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/common/LoginPage/LoginPage";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage/ForgotPasswordPage";
import RegisterPage from "../pages/common/RegisterPage/Register";
import OwnerHome from "../pages/owner/ownerHome/OwnerHome";
import Chatbot from "../components/common/Chatbot/Chatbot";
import ApartmentList from "../pages/client/ApartmentList/ApartmentList";
import ApartmentDetail from "../pages/client/ApartmentDetail/ApartmentDetail";
import ChatPage from "../pages/client/ChatPage/ChatPage";
import NotificationsPage from "../pages/client/NotificationPage/NotificationPage";




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
        path: '/apartment',
        page: ApartmentList,
        isShowHeader: true
    },
    {
        path: '/apartment-detail',
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
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    }
]