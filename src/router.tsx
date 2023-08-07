import { Navigate, createBrowserRouter } from "react-router-dom";
import LayoutWebsite from "./components/layout/LayoutWebsite";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import AdminProduct from "./page/admin/listProduct";
import AddProduct from "./page/admin/addProduct";
import UpdateProduct from "./page/admin/updateProduct";

export const router = createBrowserRouter([
  { path: "/", element: <LayoutWebsite /> },
  {
    path: "admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <div>Dashboard</div> },
      { path: "product", element: <AdminProduct /> },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/:idProduct/update", element: <UpdateProduct /> },
    ],
  },
]);
