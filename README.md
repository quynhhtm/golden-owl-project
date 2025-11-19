🦉 Golden Owl Exam Scores Dashboard

🚀 Giới Thiệu Dự Án
Đây là dự án Web Full-Stack được phát triển trong khuôn khổ bài kiểm tra tuyển dụng Thực tập sinh Phát triển Web tại Golden Owl.
Ứng dụng cho phép nhập dữ liệu điểm thi THPT quốc gia (từ file .csv) vào database, sau đó cung cấp các tính năng tra cứu điểm theo số báo danh và các báo cáo thống kê chuyên sâu.

🌟 Tính năng Chính
•	Nhập liệu tự động: Chuyển đổi dữ liệu từ diem_thi_thpt_2024.csv vào PostgreSQL ngay khi ứng dụng Backend khởi động lần đầu (sử dụng Seeder).
•	Tra cứu điểm: Tìm kiếm và hiển thị điểm chi tiết của thí sinh qua Số báo danh (SBD).
•	Thống kê điểm: Biểu đồ hiển thị số lượng học sinh theo 4 cấp độ điểm (< 4, [4, 6), [6, 8), >= 8) theo từng môn học.
•	Top 10 Khối A: Danh sách 10 thí sinh có tổng điểm Toán + Lý + Hóa cao nhất.

💻 Công Nghệ (Tech Stack)
• Backend: NestJS	
• Database:	PostgreSQL
• Frontend:	Next.js
🛠️ Hướng Dẫn Thiết Lập và Chạy Dự Án
Dự án được thiết lập để chạy hoàn toàn qua Docker Compose, giúp thiết lập môi trường (DB + Backend + Frontend) chỉ với một vài lệnh.
Yêu cầu tiên quyết
•	Docker Desktop (hoặc Docker Engine) đã được cài đặt và đang chạy.
•	Git đã được cài đặt.
Bước 1: Clone Repository
git clone https://github.com/quynhhtm/golden-owl-project.git 
cd golden-owl-project
Bước 2: Chuẩn bị Dữ liệu
Đảm bảo file raw data diem_thi_thpt_2024.csv được đặt ở thư mục gốc của dự án (golden-owl-project/).
Bước 3: Chạy ứng dụng bằng Docker Compose
Thực thi lệnh sau tại thư mục gốc của dự án (golden-owl-project/):
docker compose up --build -d
Lệnh này sẽ thực hiện các tác vụ sau:
1.	Xây dựng (Build) các image cho Backend và Frontend (sử dụng các Dockerfile).
2.	Khởi tạo dịch vụ PostgreSQL (db).
3.	Khởi tạo dịch vụ NestJS Backend (backend) và kết nối tới DB.
•	Ngay khi Backend khởi động, Seeder Service sẽ tự động đọc file CSV và nhập dữ liệu vào PostgreSQL.
4.	Khởi tạo dịch vụ Next.js Frontend (frontend).
Bước 4: Truy cập ứng dụng
Sau khi các container chạy xong có thể truy cập ứng dụng:
• Frontend (Next.js): http://localhost:3001
• Backend API (NestJS): http://localhost:3000

🧪 Các Endpoint API chính
Nếu bạn muốn kiểm tra trực tiếp các API bằng Postman/cURL:
• Tra cứu điểm (GET): /scores/:registrationNumber
• Thống kê điểm	(GET): /reports/subject-stats
• Top 10 Khối A	(GET): /reports/top-a

🛑 Dừng và Xóa môi trường
Để dừng và xóa các container cũng như networks đã tạo:
docker compose down
Nếu muốn xóa sạch cả dữ liệu PostgreSQL đã lưu trữ:
docker volume rm golden-owl-project_postgres_data

🔗 Demo
Video demo: https://drive.google.com/file/d/1rx5E0lC3mIqgR0hqr2Ln7aSVoeAvOYit/view?usp=sharing

