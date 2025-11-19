// src/app/page.tsx (Sử dụng App Router của Next.js 13+)
"use client"; // Dùng React Hooks

import { useState } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu điểm
interface Score {
  registrationNumber: string;
  name: string;
  math: number;
  physics: number;
  chemistry: number;
  literature: number;
  history: number;
  geography: number;
  civicEducation: number;
  foreignLanguageScore: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ScoreCheckPage() {
  const [regNo, setRegNo] = useState("");
  const [score, setScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo) return;

    setLoading(true);
    setError(null);
    setScore(null);

    try {
      const response = await axios.get(`${API_URL}/scores/${regNo}`);
      setScore(response.data);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Không tìm thấy hoặc lỗi kết nối.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Tra Cứu Điểm Thi THPT 2024
      </h1>

      {/* Form Tra Cứu */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <label
          htmlFor="regNo"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nhập Số Báo Danh:
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="regNo"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ví dụ: 01000001"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50 transition duration-150"
          >
            {loading ? "Đang tìm..." : "Tra Cứu"}
          </button>
        </div>
      </form>

      {/* Kết quả */}
      {error && (
        <div className="max-w-md mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {score && (
        <div className="max-w-3xl mx-auto mt-6 bg-green-50 p-6 rounded-lg shadow-xl border-t-4 border-green-500">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Kết Quả Tra Cứu
          </h2>
          <p className="mb-2">
            <strong>SBD:</strong> {score.registrationNumber}
          </p>
          <p className="mb-4">
            <strong>Họ Tên:</strong> {score.name || "Đang cập nhật"}
          </p>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Môn Học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Lưu ý: Chỉ hiển thị các môn có điểm */}
              {Object.entries(score).map(([key, value]) => {
                // Lọc bỏ các trường không phải là điểm số
                if (
                  [
                    "math",
                    "physics",
                    "chemistry",
                    "literature",
                    "history",
                    "geography",
                    "civicEducation",
                    "foreignLanguage",
                  ].includes(key)
                ) {
                  return (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {value !== null ? value : "Không thi"}
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
