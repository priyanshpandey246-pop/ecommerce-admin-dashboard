import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOrders,
  deleteOrder,
  updateOrder,
} from "../api/dashboardApi";

export default function Orders() {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

  const changeStatus = (order) => {
    let nextStatus = "pending";

    if (order.status === "pending") nextStatus = "shipped";
    else if (order.status === "shipped") nextStatus = "delivered";
    else nextStatus = "pending";

    updateMutation.mutate({ ...order, status: nextStatus });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left table-fixed">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 w-1/3">Customer</th>
              <th className="p-4 w-1/5">Total</th>
              <th className="p-4 w-1/5">Status</th>
              <th className="p-4 w-1/4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 hover:scale-[1.01] transition duration-200">
                <td className="p-4 break-words">{order.customer}</td>
                <td className="p-4">₹{order.total}</td>

                <td className="p-4">
                  {order.status === "pending" && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full transition hover:scale-105">
                      Pending
                    </span>
                  )}

                  {order.status === "shipped" && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full transition hover:scale-105">
                      Shipped
                    </span>
                  )}

                  {order.status === "delivered" && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full transition hover:scale-105">
                      Delivered
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                  <button
                    onClick={() => changeStatus(order)}
                    className="text-blue-600 mr-3"
                  >
                    Change Status
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(order.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}