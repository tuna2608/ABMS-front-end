import { BASE_URL } from './http';

export async function generateAIPostContent(apartmentDetails) {
    const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    try {
        const prompt = `Viết bài đăng ${apartmentDetails.postType} cho căn hộ với các thông tin sau:
- Số phòng ngủ: ${apartmentDetails.numberOfBedrooms || 'Chưa cập nhật'}
- Số phòng tắm: ${apartmentDetails.numberOfBathrooms || 'Chưa cập nhật'}
- Diện tích: ${apartmentDetails.area ? `${apartmentDetails.area} m²` : 'Chưa cập nhật'}
- Tầng: ${apartmentDetails.floor || 'Chưa cập nhật'}
- Hướng: ${apartmentDetails.direction || 'Chưa cập nhật'}

Yêu cầu:
1. Viết bài đăng ngắn gọn, súc tích
2. Tối đa 255 ký tự
3. Tập trung thông tin quan trọng
4. Không thêm các ký tự đặc biệt
5. Dùng tiếng Việt có dấu`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Lỗi API: ${errorData.error?.message || 'Không xác định'}`);
        }

        const data = await response.json();
        let content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Giới hạn nội dung trong 500 ký tự
        if (content.length > 500) {
            content = content.substring(0, 497) + '...';
        }

        return content;
    } catch (error) {
        console.error('Lỗi khi tạo nội dung:', error);
        throw new Error('Không thể tạo nội dung AI: ' + error.message);
    }
}