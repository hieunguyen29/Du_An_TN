import { Outlet } from "react-router-dom";
import HeaderWebsite from "../header/header";
import Footer from "../footer/footer";
const LayoutWebsite = () => {
    return <div>   <HeaderWebsite /> <Outlet /><Footer></Footer> </div>;
};

export default LayoutWebsite;
