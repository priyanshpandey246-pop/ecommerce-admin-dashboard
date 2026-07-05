import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../api/dashboardApi";

export default function Products() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const { register, handleSubmit, reset, setValue } = useForm();

  // Filtering + Sorting
  let filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOrder === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Mutations
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
      setEditing(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="h-40 bg-gray-200 rounded"></div>
    </div>
  );
}

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>

          <button
            onClick={() => {
              setOpen(true);
              setEditing(null);
              reset();
            }}
            className="
              bg-indigo-600 
              hover:bg-indigo-700 
              text-white 
              px-4 py-2 
              rounded-lg 
              shadow-md 
              hover:shadow-xl 
              hover:-translate-y-0.5 
              transition-all 
              duration-200
              active:scale-95
            "
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{product.name}</td>
                <td className="p-4">₹{product.price}</td>
                <td className="p-4">
                  {product.stock > 20 && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full transition hover:scale-105">
                      In Stock ({product.stock})
                    </span>
                  )}
                  {product.stock > 0 && product.stock <= 20 && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full transition hover:scale-105">
                      Low Stock ({product.stock})
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full transition hover:scale-105">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditing(product);
                      setValue("name", product.name);
                      setValue("price", product.price);
                      setValue("stock", product.stock);
                    }}
                    className="text-blue-600 hover:underline mr-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? "Edit Product" : "Add Product"}
            </h2>

            <form
              onSubmit={handleSubmit((data) => {
                const formattedData = {
                  ...data,
                  price: Number(data.price),
                  stock: Number(data.stock),
                };

                if (editing) {
                  updateMutation.mutate({
                    ...formattedData,
                    id: editing.id,
                  });
                } else {
                  addMutation.mutate(formattedData);
                }
              })}
              className="space-y-4"
            >
              <input
                {...register("name")}
                placeholder="Product Name"
                className="w-full border p-2 rounded"
                required
              />

              <input
                {...register("price")}
                placeholder="Price"
                type="number"
                className="w-full border p-2 rounded"
                required
              />

              <input
                {...register("stock")}
                placeholder="Stock"
                type="number"
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditing(null);
                    reset();
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    bg-indigo-600 
                    hover:bg-indigo-700 
                    text-white 
                    px-4 py-2 
                    rounded-lg 
                    shadow-md 
                    hover:shadow-xl 
                    hover:-translate-y-0.5 
                    transition-all 
                    duration-200
                    active:scale-95
                  "
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}