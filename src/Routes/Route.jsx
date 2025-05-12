import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "../Pages/Dashboard/BookParcel.jsx/BookParcel";

const router =createBrowserRouter([{
    path:'/',
    element:<Main></Main>,
    children:[{
        path:'/',
        element:<Home></Home>
    },{
        path:'/login',
        element:<Login></Login>
    },{
        path: '/signup',
        element:<SignUp></SignUp>
    }]
},{
    path: '/dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[{
        path: '/dashboard/bookParcel',
        element:<BookParcel></BookParcel>
    }]
}])

export default router;