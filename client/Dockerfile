# client/Dockerfile

# Dùng Node.js 20 (như bạn đã sửa)
FROM node:20-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json VÀ package-lock.json (nếu có)
COPY package*.json ./

# Bước quan trọng: Cài đặt thư viện (sẽ đọc file package.json)
# Đây là bước sẽ cài @radix-ui/react-checkbox
RUN npm install

# Copy toàn bộ code (css, tsx...)
COPY . .

# Mở cổng 5173
EXPOSE 5173

# Chạy app (thêm --host)
CMD [ "npm", "run", "dev", "--", "--host" ]