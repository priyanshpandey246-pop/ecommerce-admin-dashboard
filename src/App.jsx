import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Dashboard />} />
       <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
         <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;