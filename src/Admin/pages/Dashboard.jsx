import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const cards = [
  {
    title: "Total Orders",
    value: "12,840",
    growth: "+18%",
    icon: <ShoppingBagIcon />,
    color: "#1976d2",
  },
  {
    title: "Products",
    value: "1,240",
    growth: "+9%",
    icon: <Inventory2Icon />,
    color: "#2e7d32",
  },
  {
    title: "Revenue",
    value: "₹84,500",
    growth: "+22%",
    icon: <PaymentsIcon />,
    color: "#d32f2f",
  },
  {
    title: "Delivered",
    value: "8,420",
    growth: "+14%",
    icon: <LocalShippingIcon />,
    color: "#7b1fa2",
  },
];

const salesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 700 },
];

const pieData = [
  { name: "Orders", value: 400 },
  { name: "Products", value: 300 },
  { name: "Revenue", value: 300 },
];

const COLORS = ["#1976d2", "#2e7d32", "#d32f2f"];

const Dashboard = () => {
  return (
    <Box sx={{ width: "100%", height: "700px" }}>

      {/* ===== TOP CARDS ===== */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {cards.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 220px",
            }}
          >
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>

                <Typography sx={{ color: item.color }}>
                  {item.growth} this month
                </Typography>
              </Box>

              <Avatar sx={{ bgcolor: item.color }}>
                {item.icon}
              </Avatar>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* ===== CHART SECTION ===== */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 3,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT CHART */}
        <Box
          sx={{
            flex: "2 1 500px",
          }}
        >
          <Paper sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Sales Overview
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* RIGHT CHART */}
        <Box
          sx={{
            flex: "1 1 300px",
          }}
        >
          <Paper sx={{ p: 2, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Distribution
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;