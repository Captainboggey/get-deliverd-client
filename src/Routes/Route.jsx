import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import BookParcel from "../Pages/Dashboard/BookParcel.jsx/BookParcel";
import MyParcels from "../Pages/Dashboard/BookParcel.jsx/MyParcels/MyParcels";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AllParcels from "../Pages/Dashboard/AllParcels/AllParcels";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllDeliveryMan from "../Pages/Dashboard/AllDeliveryMan/AllDeliveryMan";

import MyDelivery from "../Pages/Dashboard/MyDelivery/MyDelivery";
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/Payment/Payment";

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
    children:[
        // users
    {
        path: '/dashboard/bookParcel',
        element:<BookParcel></BookParcel>
    },{
        path:'/dashboard/myParcels',
        element:<MyParcels></MyParcels>
    },{
        path: '/dashboard/myProfile',
        element:<MyProfile></MyProfile>
    },{
        path: '/dashboard/payment/:id',
        element:<Payment></Payment>,
        loader:({params})=>fetch(`http://localhost:5000/parcel/payment/${params.id}`)
    },
    // admin
    {
        path: '/dashboard/allParcels',
        element:<AdminRoute><AllParcels></AllParcels></AdminRoute>

    },{
        path: '/dashboard/allUsers',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
    },{
        path: '/dashboard/allDeliveryMan',
        element:<AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>
    },
    // delivery Man
    {
        path: '/dashboard/myDelivery',
        element:<MyDelivery></MyDelivery>
        
    }]
}])

export default router;