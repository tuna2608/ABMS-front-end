import ApartmentDetail from "../pages/client/ApartmentDetail/ApartmentDetail";
import ApartmentList from "../pages/client/ApartmentList/ApartmentList";
import HomePage from "../pages/client/HomePage/HomePage";
import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import LoginPage from "../pages/common/LoginPage/LoginPage";
import AdminHome from "../pages/admin/adminHome/AdminHome";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage/ForgotPasswordPage";



export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/apartments',
        page: ApartmentList,
        isShowHeader: true
    },
    {
        path: '/apartmentDetail',
        page: ApartmentDetail,
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
        path: '/forgot',
        page: ForgotPasswordPage,
        isShowHeader: false
    },
    {
        path: '/adminHome',
        page: AdminHome,
        isShowHeader: false
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    }
]