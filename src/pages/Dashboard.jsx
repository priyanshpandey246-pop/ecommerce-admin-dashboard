import Card from "../components/ui/Card";
import SalesChart from "../components/charts/SalesChart";
import RevenueBarChart from "../components/charts/RevenueBarChart";
import RecentOrders from "../components/ui/RecentOrders";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "../api/dashboardApi";
export default function Dashboard() { 

      const { data, isLoading, error } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

 if (isLoading) {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
        ))}
      </div>

      <div className="h-64 bg-gray-200 rounded-xl"></div>
    </div>
  );
}

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">${data.revenue}</h2>
        </Card>

        <Card>
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold mt-2">{data.orders}</h2>
        </Card>

        <Card>
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold mt-2">{data.users}</h2>
        </Card>

        <Card>
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold mt-2">{data.products}</h2>
        </Card>
      </div>

      {/* Sales Line Chart */}
      <div className="mt-10">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Sales Overview
          </h2>
          <div className="w-full overflow-hidden">
          <SalesChart />
          </div>
          
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full hover:shadow-xl transition duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Comparison
          </h2>
          <RevenueBarChart />
        </div>

        <RecentOrders />
      </div>
    </div>
  );
}