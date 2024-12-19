

import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { ToastContainer} from 'react-toastify';



const App = () => {
  return (
    <div>
      <Navbar/>
      <main className="min-h-screen">
        <Outlet/>
        <ToastContainer/>
        
      </main>
      
      
      <Footer/>
    </div>
  )
}

export default App;


