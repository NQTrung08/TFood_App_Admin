import { Route, Routes, Navigate } from "react-router-dom";
import AddProducts from "../admin/AddProducts";
import AllProducts from "../admin/AllProducts";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import AdminNav from "../admin/AdminNav";
import Orders from "../admin/Orders";
import User from "../admin/User";


const Routers = () => {
    return (
        <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard/>} >
                    {/* <Route index element={AdminNav}/> */}
                    <Route path="all-products" element={<AllProducts/>} />
                    <Route path="add-product" element={<AddProducts/>} />
                    <Route path="orders" element={<Orders/>} />
                    <Route path="user" element={<User/>} />

                    
               </Route>
        </Routes>
    );
}
export default Routers;