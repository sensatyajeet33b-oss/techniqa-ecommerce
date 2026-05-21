import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Admin/components/AdminLayout";
import Dashboard from "../Admin/pages/Dashboard";
import Category from "../Admin/pages/Category";
import AddCategory from "../Admin/pages/AddCategory";
import Products from "../Admin/pages/Products";
import AddProducts from "../Admin/pages/AddProducts";
import User from "../Admin/pages/User";

const AdminRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="category" element={<Category />} />
                <Route path="addCategory" element={< AddCategory />} />
                <Route path="products" element={<Products />} />
                <Route path="addProducts" element={< AddProducts />} />
                <Route path="user" element={< User />} />

            </Route>
        </Routes>
    );
};

export default AdminRoutes;