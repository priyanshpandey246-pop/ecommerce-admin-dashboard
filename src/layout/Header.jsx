export default function Header({ toggleSidebar }) {

   
 return (
  <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

    <div className="flex items-center gap-4">
      {toggleSidebar && (
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      )}

      <h1 className="text-lg font-semibold text-gray-900">
        E-commerce Admin
      </h1>
    </div>

    <div className="flex items-center gap-4">
      <span className="text-gray-700">Admin</span>
</div>
    </div>

);
}