import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, PieChart, Pie } from "recharts";
import './css.css';
import axios from "axios";


const dataBar = [
  { name: "Tháng 1", react: 32 },
  { name: "Tháng 2", react: 42},
  { name: "Tháng 3", react: 51},
  { name: "Tháng 4", react: 60},
  { name: "Tháng 5", react: 51},
  { name: "Tháng 6", react: 95},
  { name: "Tháng 7", react: 32 },
  { name: "Tháng 8", react: 42},
  { name: "Tháng 9", react: 51},
  { name: "Tháng 10", react: 60},
  { name: "Tháng 11", react: 51},
  { name: "Tháng 12", react: 950},
];

const dataPie = [
  { name: "React", value: 75 },
  { name: "Angular", value: 50 },
];
const colors = ["red", "blue"]; // Mảng các màu cho từng loại dữ liệu
const ChartComponent = () => {


  
  return (
    
  );
};

export default ChartComponent;