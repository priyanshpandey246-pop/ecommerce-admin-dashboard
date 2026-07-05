export default function RecentOrders() {
    const orders = [
        { id: "#1001", customer: "Patrick Cummins", amount: "$120", status: "Paid"},
        { id: "#1002", customer: "Jane Smith", amount: "$250", status: "Pending"},
        { id: "#1003", customer: "Michael Lee", amount: "$80", status: "Shipped"},
        { id: "#1004", customer: "Emma Brown", amount: "$300", status: "Paid"},
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Orders
            </h2>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                    key={order.id}
                    className="flex justify-between items-center border-b pb-2">
                        <div>
                            <p className="font-medium text-gray-900">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.id}</p>
                            </div>

                            <div className="text-right">
                                <p className="font-medium text-gray-900">{order.amount}</p>
                                <p className="text-sm text-indigo-600">{order.status}</p>
                                </div>
                                </div>
                ))}
            </div>
        </div>
    );
}