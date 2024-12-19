
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback} from "../ui/avatar";


import { toast } from "react-toastify";
import { setUser } from "@/redux/auth-slice";
import { api } from "@/config/api";
import { USER_LOGOUT_URL } from "@/config";

const Navbar = () => {
  const user=useSelector((state)=>state.auth.user)
  //console.log(user)
  const dispatch=useDispatch()
  const handleLogout=async()=>{
    const response=await api.post(`${USER_LOGOUT_URL}`,{ withCredentials: true }) 
    if(response.data.success)
    {
      toast(response.data.message);
      dispatch(setUser(null))

    }
  }
  return (
    <header className="bg-white w-full shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-gray-700 hover:text-gray-900">
          Planora
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/upcoming-events"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Upcoming Events
          </Link>
{
  user?(<>
  <Avatar className="cursor-pointer">
  
  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
</Avatar>
<Button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105" onClick={handleLogout}>Logout</Button>
  </>):(<><Link to="/login">
    <Button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
      Login
    </Button>
  </Link>

  <Link to="/register">
    <Button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
      Sign Up
    </Button>
  </Link></>)
}
          
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

