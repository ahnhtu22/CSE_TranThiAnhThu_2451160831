# ĐÁP ÁN PBT03 - LÝ THUYẾT VÀ DEBUG

## PHẦN A

### Câu A1 — 3 Cách nhúng CSS
1. **Inline CSS**
   - *Ví dụ:* `<h1 style="color: red;">Hello</h1>`
   - *Ưu điểm:* Nhanh, tiện lợi khi muốn test nhanh hoặc override một style cụ thể trên 1 element duy nhất.
   - *Nhược điểm:* Khó bảo trì, không tái sử dụng được, làm bẩn mã HTML.
   - *Khi nào dùng:* Dùng trong email templates hoặc khi dùng JavaScript để thay đổi style động.
2. **Internal CSS**
   - *Ví dụ:* 
     ```html
     <style> h1 { color: red; } </style>
     ```
   - *Ưu điểm:* Gom code CSS vào 1 file HTML, dễ quản lý cho một trang đơn lẻ.
   - *Nhược điểm:* Không tái sử dụng được style cho các trang HTML khác, làm file HTML dài ra.
   - *Khi nào dùng:* Landing page đơn giản 1 trang hoặc test code.
3. **External CSS**
   - *Ví dụ:* `<link rel="stylesheet" href="style.css">`
   - *Ưu điểm:* Tách biệt HTML và CSS, dễ quản lý, bảo trì, tái sử dụng trên nhiều trang, trình duyệt có thể cache file CSS giúp tải trang nhanh hơn.
   - *Nhược điểm:* Cần tải thêm 1 request HTTP (nhưng thường không đáng kể).
   - *Khi nào dùng:* Luôn luôn được khuyên dùng trong các dự án thực tế.

**Câu hỏi thêm:** Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng thì **Inline CSS** sẽ "thắng". Giải thích: Vì Inline CSS có độ ưu tiên (specificity) cao nhất trong 3 cách (1,0,0,0).

### Câu A2 — CSS Selectors — Dự đoán kết quả
1. `h1` → Chọn: "ShopTLU"
2. `.price` → Chọn: "25.990.000đ", "45.990.000đ"
3. `#app header` → Chọn: Toàn bộ thẻ `<header>` và nội dung bên trong nó.
4. `nav a:first-child` → Chọn: "Home"
5. `.product.featured h2` → Chọn: "MacBook Pro"
6. `article > p` → Chọn: "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..."
7. `a[href="/"]` → Chọn: "Home"
8. `.top-bar.dark h1` → Chọn: "ShopTLU"

### Câu A3 — Box Model — Tính toán kích thước
- **Trường hợp 1 (content-box):**
  - Chiều rộng hiển thị = 400 + 20(padding trái) + 20(padding phải) + 5(border trái) + 5(border phải) = **450px**
  - Không gian chiếm trên trang = 450 + 10(margin trái) + 10(margin phải) = **470px**
- **Trường hợp 2 (border-box):**
  - Chiều rộng hiển thị = **400px**
  - Kích thước content thực tế = 400 - 40(padding) - 10(border) = **350px**
  - Không gian chiếm trên trang = 400 + 20(margin 2 bên) = **420px**
- **Trường hợp 3 (Margin collapse):**
  - Khoảng cách giữa box-a và box-b = **40px**
  - *Giải thích:* Trong CSS, khi 2 vertical margin (top/bottom) gặp nhau, chúng sẽ bị "collapse" (gộp lại) thành một margin duy nhất có giá trị bằng margin lớn hơn giữa 2 margin đó (max(25, 40) = 40).
  - *Nâng cao:* Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách sẽ là phép cộng đại số: 40 + (-10) = **30px**.

### Câu A4 — Specificity (Độ ưu tiên)
1. Tính điểm:
   - Rule A (`p`): (0, 0, 1)
   - Rule B (`.price`): (0, 1, 0)
   - Rule C (`#main-price`): (1, 0, 0)
   - Rule D (`p.price`): (0, 1, 1)
2. Element sẽ có màu **red**. Vì selector có id `#main-price` (Rule C) có điểm specificity cao nhất.
3. Nếu thêm style inline, element sẽ có màu **orange**. Vì inline style có độ ưu tiên cao hơn id selector.
4. Nếu Rule A thêm `!important`, element sẽ có màu **black**. Vì `!important` ghi đè tất cả các luật specificity thông thường.

---

## PHẦN B

### Bài B2 - Box Model Lab
**Phần 1:**
- Hộp 1 (content-box): chiều rộng thực tế = 350 px 
- Hộp 2 (border-box): chiều rộng thực tế = 300 px
- *Giải thích:* `content-box` chỉ thiết lập chiều rộng cho phần nội dung, nên tổng chiều rộng của hộp sẽ bị cộng dồn thêm padding và border. `border-box` thiết lập chiều rộng cố định bao gồm cả nội dung, padding và border, nên nội dung bên trong sẽ tự động thu hẹp lại.

### Bài B3 - Specificity Battle
1. Danh sách 10 Rules:
   - `p` (0,0,1)
   - `.text` (0,1,0)
   - `.highlight` (0,1,0)
   - `p.text` (0,1,1)
   - `p.highlight` (0,1,1)
   - `.text.highlight` (0,2,0)
   - `p.text.highlight` (0,2,1)
   - `#demo` (1,0,0)
   - `p#demo` (1,0,1)
   - `p#demo.text.highlight` (1,2,1) -> Cao nhất.
2. Element hiển thị màu của rule có (1,2,1).
4. Nếu thay đổi thứ tự trong file CSS, rule (1,2,1) vẫn thắng vì điểm số khác biệt. Tuy nhiên, giữa các rule có điểm bằng nhau (ví dụ: `.text` và `.highlight`), rule nào viết sau cùng trong CSS sẽ "thắng".

---

## PHẦN C

### Câu C1 — Debug CSS Layout
1. Tính chiều rộng thực tế (content-box):
   - Sidebar: 300(w) + 40(padding) + 2(border) = 342px
   - Content: 660(w) + 60(padding) + 2(border) = 722px
2. Tại sao vỡ: Tổng chiều rộng của sidebar + content là 342 + 722 = 1064px. Lớn hơn container (960px) nên content bị đẩy xuống dòng.
3. **Cách sửa 1:** Thêm `box-sizing: border-box;` cho cả `.sidebar` và `.content`.
4. **Cách sửa 2:** Giảm `width` bằng tay để bù trừ cho padding và border. `.sidebar { width: 258px; }` và `.content { width: 598px; }`.

### Câu C2 — Cascade Puzzle
1. "Sản phẩm A" (h2): `font-size` = 20px (từ `.card .title`), `color` = green (từ `.highlight !important`).
2. "Mô tả sản phẩm" (p trong card featured): `color` = blue (p có `color: inherit`, nó sẽ kế thừa màu từ cha gần nhất có định dạng màu là `.card` (blue)). 
3. "Sản phẩm B" (h2): `font-size` = 20px (từ `.card .title`), `color` = blue (h2 kế thừa màu từ `.card`).
4. "Mô tả sản phẩm B" (p.highlight): `color` = green (từ `.highlight !important`).