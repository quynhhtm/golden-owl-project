// src/app/reports/page.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface StatsData {
  [subject: string]: { l1: number; l2: number; l3: number; l4: number };
}

interface TopStudent {
  score_registration_number: string;
  score_name: string | null;
  total_a: number;
  score_math: number;
  score_physics: number;
  score_chemistry: number;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [top10, setTop10] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, top10Res] = await Promise.all([
          axios.get(`${API_URL}/reports/subject-stats`),
          axios.get(`${API_URL}/reports/top-a`),
        ]);
        setStats(statsRes.data);
        setTop10(top10Res.data);
      } catch (error) {
        console.error("Lỗi fetch báo cáo:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center p-10">Đang tải dữ liệu báo cáo...</div>;
  if (!stats)
    return (
      <div className="text-center p-10 text-red-600">
        Không thể tải dữ liệu thống kê.
      </div>
    );

  // Chuẩn hóa dữ liệu cho biểu đồ Recharts
  const chartData = Object.keys(stats)
    .map((subject) => ({
      name: subject.replace(/([A-Z])/g, " $1").trim(), // Định dạng tên môn học
      "8+": stats[subject].l1,
      "6-8": stats[subject].l2,
      "4-6": stats[subject].l3,
      "<4": stats[subject].l4,
    }))
    .filter((item) => item.name !== "name"); // Loại bỏ trường name nếu có

  // Hàm hiển thị tiêu đề màu sắc
  const renderSubjectTitle = (subject: string) => {
    const map: Record<string, string> = {
      math: "bg-yellow-500",
      physics: "bg-blue-500",
      chemistry: "bg-green-500",
      literature: "bg-red-500",
      history: "bg-indigo-500",
      geography: "bg-purple-500",
    };
    return (
      <span
        className={`inline-block w-3 h-3 ${
          map[subject] || "bg-gray-500"
        } rounded-full mr-2`}
      ></span>
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Báo Cáo & Thống Kê Điểm Thi
      </h1>

      {/* === 1. Biểu đồ Thống kê theo 4 Cấp độ === */}
      <div className="mb-12 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b pb-2">
          Thống Kê 4 Cấp Độ Điểm theo Môn Học
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={50} />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Sử dụng các thanh Bar khác màu cho 4 cấp độ */}
              <Bar dataKey="8+" stackId="a" fill="#10B981" name=">= 8 điểm" />
              <Bar
                dataKey="6-8"
                stackId="a"
                fill="#3B82F6"
                name="[6, 8) điểm"
              />
              <Bar
                dataKey="4-6"
                stackId="a"
                fill="#F59E0B"
                name="[4, 6) điểm"
              />
              <Bar dataKey="<4" stackId="a" fill="#EF4444" name="< 4 điểm" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-sm text-gray-500 italic">
          Thống kê số lượng học sinh đạt điểm trong 4 khoảng mức.
        </p>
      </div>

      {/* === 2. Danh sách Top 10 Khối A === */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b pb-2">
          Top 10 Học Sinh Khối A (Toán + Lý + Hóa)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SBD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lý
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hóa
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Tổng Điểm A
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {top10.map((student, index) => (
                <tr
                  key={student.score_registration_number}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                    {student.score_registration_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {student.score_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {student.score_math || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {student.score_physics || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {student.score_chemistry || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-green-700">
                    {/* Dùng parseFloat và toFixed để đảm bảo hiển thị 2 chữ số thập phân */}
                    {parseFloat(student.total_a.toString()).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
