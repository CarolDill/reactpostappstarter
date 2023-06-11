import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
import { HeaderResponsive } from "./Header";

const Layout = () => (
  
  <div>
    <HeaderResponsive />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
