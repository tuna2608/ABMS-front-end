import ApartmentDetail from "../pages/client/ApartmentDetail/ApartmentDetail";
import ApartmentList from "../pages/client/ApartmentList/ApartmentList";
import HeadOfHousehold from "../pages/client/HeadofHousehold/HeadofHousehold";
import HomePage from "../pages/client/HomePage/HomePage";
import NotFoundPage from "../pages/common/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/common/SignInPage/SignInPage";
import SignUpPage from "../pages/common/SignUpPage/SignUpPage";
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
    {
        path: '/headofhousehold',
        page: HeadOfHousehold,
        isShowHeader: false
    },
    {
        path: '/signIn',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/signUp',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/forgot',
        page: ForgotPasswordPage,
        isShowHeader: false
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    }
]