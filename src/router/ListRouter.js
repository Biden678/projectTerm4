import HomeAdminPage from "../back_end/HomeAdminPage";
import Index from "../front-end/main/Index";
import LoginPage from "../front-end/main/login/LoginPage";
import RegisterPage from "../front-end/main/login/RegisterPage";
import Shop from "../front-end/main/Shop";
import CategoryAdminPage from "../back_end/components/sidebar/CategoryAdminPage";
import ProductAdminPage from "../back_end/components/sidebar/ProductAdminPage";
import CountryAdminPage from "../back_end/components/sidebar/CountryAdminPage";
import PrescribeAdminPage from "../back_end/components/sidebar/PrescribeAdminPage";
import WhoUseAdminPage from "../back_end/components/sidebar/WhoUseAdminPage";
import BrandAdminPage from "../back_end/components/sidebar/BrandAdminPage";
import ProductDetailAdminPage from "../back_end/components/sidebar/ProductDetailAdminPage";
import VerifiedCus from "../front-end/component/User/VerifiedCus";
import CartPage from "../front-end/main/cart_pay_other/CartPage";
import CheckOutPage from "../front-end/main/cart_pay_other/CheckOutPage";
import ShopDetail from "../front-end/main/ShopDetail";
import OrderPage from "../front-end/main/OrderPage";
import OrderAdminPage from "../back_end/components/sidebar/OrderAdminPage";
import OrderDetailAdminPage from "../back_end/components/sidebar/OrderDetailAdminPage";
import LoginAdmin from "../back_end/components/Admin/LoginAdmin";
import ForgetPage from "../front-end/main/login/ForgetPage";
import ResetpassPage from "../front-end/main/login/ResetpassPage";
import PasswordChange from "../front-end/main/login/PasswordChange";
import InformationPage from "../front-end/main/login/InformationPage";
import ManageAdminPage from "../back_end/components/Admin/ManageAdminPage";
import ManageUserPage from "../back_end/components/Admin/ManageUserPage";
import ProductUPSAdminPage from "../back_end/components/sidebar/ProductUPSAdminPage";
import BlogPage from "../front-end/main/BlogPage";
import BlogDetailPage from "../front-end/main/BlogDetailPage";
import AboutUsPage from "../front-end/main/AboutUsPage";
import HealthResult from "../front-end/main/health/HealthResult";
import HealthQuestion from "../front-end/main/health/HealthQuestion";
import HealthPage from "../front-end/main/health/HealthPage";
import BlogTypeAdminPage from "../back_end/components/sidebar/BlogTypeAdminPage";
import BlogAdminPage from "../back_end/components/sidebar/BlogAdminPage";
import BlogDetailAdminPage from "../back_end/components/sidebar/BlogDetailAdminPage";
import TopicAdminPage from "../back_end/components/sidebar/TopicAdminPage";
import QuestionAdminPage from "../back_end/components/sidebar/QuestionAdminPage";
import AnswerAdminPage from "../back_end/components/sidebar/AnswerAdminPage";
import ResultAdminPage from "../back_end/components/sidebar/ResultAdminPage";
import ForbidenwordPage from "../back_end/components/sidebar/ForbidenwordPage";
import ContactBEPage from "../back_end/components/sidebar/ContactBEPage";
import ContactPage from "../front-end/component/ContactPage";
import CommentAdminPage from "../back_end/components/sidebar/CommentAdminPage";
import CommentDetailAdminPage from "../back_end/components/sidebar/CommentDetailAdminPage";

export const publicRouter = [
    {
        path: '/',
        component: <Index />,
    },
    {
        path: '/shop',
        component: <Shop />,
    },
    {
        path: '/order',
        component: <OrderPage />,
    },
    {
        path: '/shopdetail/:id',
        component: <ShopDetail />,
    },
    {
        path: '/cart',
        component: <CartPage />,
    },
    {
        path: '/checkout',
        component: <CheckOutPage />,
    },
    {
        path: '/login',
        component: <LoginPage />,
    },
    {
        path: '/register',
        component: <RegisterPage />,
    },
    {
        path: '/forgetpass',
        component: <ForgetPage />,
    },
    {
        path: '/reset-password/:cus_id',
        component: <ResetpassPage />
    },
    {
        path: '/verified/:cus_id',
        component: <VerifiedCus />
    },
    {
        path: '/changepass',
        component: <PasswordChange />
    },
    {
        path: '/information',
        component: <InformationPage />
    },
    {
        path: '/contact',
        component: <ContactPage />
    },

    //ADMIN
    {
        path: '/homeAdminPage',
        component: <HomeAdminPage />,
    },
    {
        path: '/productAdminPage',
        component: <ProductAdminPage />,
    },
    {
        path: '/categoryAdminPage',
        component: <CategoryAdminPage />,
    },
    {
        path: '/countryAdminPage',
        component: <CountryAdminPage />,
    },
    {
        path: '/prescribeAdminPage',
        component: <PrescribeAdminPage />,
    },
    {
        path: '/whoUseAdminPage',
        component: <WhoUseAdminPage />,
    },
    {
        path: '/brandAdminPage',
        component: <BrandAdminPage />,
    },
    {
        path: '/productDetailAdminPage/:proId',
        component: <ProductDetailAdminPage />,
    },
    {
        path: '/productUPSAdminPage/:proId',
        component: <ProductUPSAdminPage />,
    },
    {
        path: '/orderAdminPage',
        component: <OrderAdminPage />,
    },
    {
        path: '/orderDetailAdminPage/:cid',
        component: <OrderDetailAdminPage />,
    },
    {
        path: '/loginadmin',
        component: <LoginAdmin />,
    },
    {
        path: '/manageuser',

        component: <ManageUserPage />,
    },
    {
        path: '/manageadmin',
        component: <ManageAdminPage />,
    },

    // ----------------LY--------------------------
    {
        path: '/blog',
        component: <BlogPage />,
    },
    {
        path: '/blog/detail/:id',
        component: <BlogDetailPage />,
    },
    {
        path: '/about',
        component: <AboutUsPage />,
    },


    // -------------Nhi--------------------------
    {
        path: '/topic',
        component: <HealthPage />,
    },
    {
        path: '/question/:topicId',
        component: <HealthQuestion />,
    },
    {
        path: '/result',
        component: <HealthResult />,
    },
    // ------------------------LY-----------------------------
    {
        path: '/typeAdminPage',
        component: <BlogTypeAdminPage />,
    },
    {
        path: '/blogAdminPage',
        component: <BlogAdminPage />,
    },
    {
        path: '/blogDetailAdminPage/:id',
        component: <BlogDetailAdminPage />,
    },
    {
        path: '/cmtAdminPage',
        component: <CommentAdminPage />,
    },
    {
        path: '/cmtDetailAdminPage/:id',
        component: <CommentDetailAdminPage />,
    },
    {
        path: '/wordAdminPage',
        component: <ForbidenwordPage />,
    },





    //---------------Nhi-admin----------------
    //  {
    //     path: '/topicAdmin',
    //     component: <TopicAdminPage />,
    // },
    // {
    //     // path: '/questionAdmin/:id',
    //     path: '/questionAdmin',
    //     component: <QuestionAdminPage />,
    // },
    // {
    //     path: '/answerAdmin',
    //     component: <AnswerAdminPage />,
    // },
    // {
    //     path: '/resultAdmin',
    //     component: <ResultAdminPage />,
    // },
    {
        path: '/topicAdmin',
        component: <TopicAdminPage />,
    },
    {
        path: '/questionAdmin/:topicId',
        component: <QuestionAdminPage />,
    },
    {
        path: '/answerAdmin/:questionId',
        component: <AnswerAdminPage />,
    },
    {
        path: '/resultAdmin',
        component: <ResultAdminPage />,
    },

    //phuc
    {
        path: '/managecontact',
        component: <ContactBEPage />
    },
    {
        path: '/manageforbiddenword',
        component: <ForbidenwordPage />
    },
    {
        path: '/contact',
        component: <ContactPage />
    },
]
