require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Lấy PORT từ .env hoặc mặc định 3000, nếu bị chiếm sẽ tự động thử cổng tiếp theo
const DEFAULT_PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Phục vụ tất cả file tĩnh trong thư mục gốc

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('🎄 Kết nối MongoDB thành công!'))
.catch(err => {
    console.error('❌ Không thể kết nối MongoDB:', err.message);
    process.exit(1); // Dừng server nếu không kết nối được DB
});

// Schema & Model cho lời chúc
const wishSchema = new mongoose.Schema({
    name: { type: String, default: 'Ẩn danh', trim: true },
    message: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now }
});

const Wish = mongoose.model('Wish', wishSchema);

// API: Lấy danh sách lời chúc (mới nhất trước)
app.get('/api/wishes', async (req, res) => {
    try {
        const wishes = await Wish.find({}, { name: 1, message: 1, created_at: 1, _id: 0 })
                                 .sort({ created_at: -1 })
                                 .limit(100); // Giới hạn 100 lời chúc mới nhất để tránh tải nặng
        res.json(wishes);
    } catch (err) {
        console.error('Lỗi lấy danh sách lời chúc:', err);
        res.status(500).json({ error: 'Không thể tải lời chúc' });
    }
});

// API: Lưu lời chúc mới
app.post('/api/wishes', async (req, res) => {
    let { name, message } = req.body;

    // Sanitize input
    name = (name || 'Ẩn danh').toString().trim();
    message = (message || '').toString().trim();

    if (!message) {
        return res.status(400).send('🎄 Điều ước không được để trống nhé!');
    }

    if (message.length > 500) {
        return res.status(400).send('🎅 Điều ước quá dài, ông già Noel chỉ đọc được tối đa 500 ký tự thôi!');
    }

    try {
        const newWish = new Wish({
            name,
            message
        });

        await newWish.save();
        console.log(`🎁 Lời chúc mới từ: ${name} – "${message.substring(0, 50)}..."`);
        res.send('Điều ước đã bay đến Bắc Cực thành công! 🎅✨');
    } catch (err) {
        console.error('Lỗi lưu lời chúc:', err);
        res.status(500).send('❄️ Ông già Noel đang bận kéo xe... vui lòng thử lại sau!');
    }
});

// Trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Xử lý mọi route khác → trả về index.html (hữu ích khi deploy SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Hàm khởi động server với tự động thử cổng khác nếu bị chiếm
function startServer(port) {
    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`🎅 Server Giáng sinh 2025 đang chạy tại: http://localhost:${port}`);
        console.log(`🌟 Mở trình duyệt và truy cập link trên để gửi điều ước nào!`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`⚠️ Cổng ${port} đang bị chiếm, thử cổng ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Lỗi server:', err);
        }
    });
}

// Khởi động server
startServer(DEFAULT_PORT);