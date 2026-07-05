import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "Jan", revenue: 2400 },
     { month: "Feb", revenue: 1398 },
      { month: "Mar", revenue: 9800 },
       { month: "Apr", revenue: 3908 },
        { month: "May", revenue: 4800 },
         { month: "Jun", revenue: 3800 },
];

export default function RevenueBarChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray= "3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6366f1" radius={[6,6,0,0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}