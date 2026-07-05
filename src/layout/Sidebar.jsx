import { Link } from "react-router-dom";

export default function Sidebar({ closeSidebar }) {
  return (
    <div
      className="
        sticky
        top-0
        w-64
        h-screen
        bg-slate-700
        border-r
        border-gray-200
      "
    >
      {/* Logo / Title */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">

        <Link
          to="/"
          onClick={closeSidebar}
          className="
            px-4 py-3
            rounded-xl
            text-slate-100
            hover:bg-slate-600
            hover:text-white
            hover:translate-x-1
            transition-all
            duration-200
          "
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          onClick={closeSidebar}
          className="
            px-4 py-3
            rounded-xl
            text-slate-100
            hover:bg-slate-600
            hover:text-white
            hover:translate-x-1
            transition-all
            duration-200
          "
        >
          Products
        </Link>

        <Link
          to="/orders"
          onClick={closeSidebar}
          className="
            px-4 py-3
            rounded-xl
            text-slate-100
            hover:bg-slate-600
            hover:text-white
            hover:translate-x-1
            transition-all
            duration-200
          "
        >
          Orders
        </Link>

        <Link
          to="/users"
          onClick={closeSidebar}
          className="
            px-4 py-3
            rounded-xl
            text-slate-100
            hover:bg-slate-600
            hover:text-white
            hover:translate-x-1
            transition-all
            duration-200
          "
        >
          Users
        </Link>

      </nav>
    </div>
  );
}