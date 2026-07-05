import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchSales } from "../../api/dashboardApi";

export default function SalesChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
  });

  if (isLoading) return <div>Loading chart...</div>;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#4f46e5"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}