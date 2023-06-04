import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { HeaderSimple } from "./Header";

const links = ['/','posts'];

const Layout = () => (
  
  <div>
    <HeaderSimple links={links}/>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
