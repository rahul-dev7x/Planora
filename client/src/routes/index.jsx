import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Events from "@/pages/dashboard/Events";
import EventDetails from "../pages/dashboard/EventDetails";
import EventsUser from "../pages/Events";
import AllEventDetails from "../pages/AllEventsDetails";




const router =createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
        {
        path:"",
        element:<Home/>
        },
        {
            path:"register",
            element:<Signup/>
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"upcoming-events",
            element:<EventsUser/>,

        },
        {
            path:"event-details/:id",
            element:<AllEventDetails/>
        }
        
    ]
}
,{
    path:"/dashboard",
    element:<DashboardLayout/>,
    children:[
        {
            path:"events",
            element:<Events/>
        },
        {
            path:"event-details/:id",
            element:<EventDetails/>
        }
        
    ]
}])


export default router