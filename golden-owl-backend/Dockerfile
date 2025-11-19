# # golden-owl-backend/Dockerfile

# # Sử dụng image Node.js làm base
# FROM node:18-alpine
# WORKDIR /app

# # Copy package.json và cài đặt dependencies
# COPY package*.json ./
# RUN npm install

# # Copy toàn bộ source code
# COPY . .

# # Copy file CSV từ thư mục gốc vào trong container 
# # để service seeder có thể đọc được.
# COPY ../diem_thi_thpt_2024.csv /app/diem_thi_thpt_2024.csv 

# # Build ứng dụng NestJS
# RUN npm run build

# # Port mà ứng dụng NestJS lắng nghe
# EXPOSE 3000

# # Chạy ứng dụng đã build (môi trường production)
# CMD ["npm", "run", "start:prod"]

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Không copy file .csv từ ngoài context!
# Nếu cần file CSV → đặt nó vào golden-owl-backend trước.

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
