# TRẢ LỜI PHIẾU BÀI TẬP 05 - CSS RESPONSIVE & SCSS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Viewport & Mobile-First
1. **Thẻ `<meta viewport>` chuẩn:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   - `width=device-width`: Ép chiều rộng của trình duyệt khớp với chiều rộng vật lý của thiết bị.
   - `initial-scale=1.0`: Đặt mức độ zoom ban đầu là 100% (không bị phóng to hay thu nhỏ khi mới tải trang).
2. **Nếu thiếu thẻ này:** Trình duyệt trên iPhone (và các thiết bị di động khác) sẽ giả lập màn hình desktop (thường là 980px), sau đó thu nhỏ toàn bộ trang web lại để vừa màn hình điện thoại, khiến chữ và các thành phần UI trở nên rất nhỏ, khó đọc và khó tương tác.
3. **Mobile-First vs Desktop-First:**
   - **Mobile-First:** Viết CSS cho màn hình nhỏ (mobile) trước làm mặc định, sau đó dùng `@media (min-width: ...)` để bổ sung/ghi đè CSS khi màn hình lớn dần. (Được khuyên dùng vì tối ưu hiệu suất, trình duyệt di động không phải tải và parse các CSS phức tạp của desktop).
     ```css
     /* Mobile-First */
     .column { width: 100%; }
     @media (min-width: 768px) { .column { width: 50%; } }
     ```
   - **Desktop-First:** Viết CSS cho màn hình lớn trước, sau đó dùng `@media (max-width: ...)` để thu nhỏ/ẩn bớt khi xuống màn hình nhỏ.
     ```css
     /* Desktop-First */
     .column { width: 50%; }
     @media (max-width: 767px) { .column { width: 100%; } }
     ```

### Câu A2 — Breakpoints
Các breakpoints chuẩn (theo Bootstrap):
- **< 576px (X-Small):** Điện thoại đứng (Mobile). Lưới sản phẩm nên hiển thị: 1 cột.
- **≥ 576px (Small):** Điện thoại ngang. Lưới sản phẩm: 2 cột.
- **≥ 768px (Medium):** Tablet (iPad). Lưới sản phẩm: 2 hoặc 3 cột.
- **≥ 992px (Large):** Desktop. Lưới sản phẩm: 3 hoặc 4 cột.
- **≥ 1200px (Extra Large):** Màn hình lớn. Lưới sản phẩm: 4 cột trở lên.

### Câu A3 — Media Queries

| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|--------------------|------------|
| 375px (iPhone SE)   | **100%** | Chưa đạt 576px, dùng CSS mặc định |
| 600px               | **540px** | Đạt min-width 576px |
| 800px               | **720px** | Đạt min-width 768px |
| 1000px              | **960px** | Đạt min-width 992px |
| 1400px              | **1140px** | Đạt min-width 1200px |

### Câu A4 — SCSS Basics
1. **Variables:** Cho phép lưu trữ giá trị (màu sắc, font, kích thước) để tái sử dụng. 
   - Ví dụ: `$primary-color: #a8e6cf;`
2. **Nesting:** Viết các CSS selector lồng vào nhau theo cấu trúc HTML, giúp code dễ đọc.
   - Ví dụ: `nav { ul { margin: 0; } }`
3. **Mixins:** Gom nhóm một tập hợp các thuộc tính CSS lại thành một function có thể tái sử dụng (hỗ trợ truyền tham số).
   - Ví dụ: `@mixin flex-center { display: flex; align-items: center; justify-content: center; }` -> Dùng: `@include flex-center;`
4. **@extend:** Cho phép một selector kế thừa toàn bộ thuộc tính của một selector khác.
   - Ví dụ: `.btn-submit { @extend .btn; background-color: green; }`

**Tại sao trình duyệt KHÔNG đọc được `.scss`?**
Trình duyệt chỉ hiểu ngôn ngữ CSS chuẩn. SCSS là một CSS Preprocessor (Tiền xử lý). Cần phải có một công cụ biên dịch (Compiler) như Dart Sass hoặc extension Live Sass Compiler trong VS Code để dịch file `.scss` sang `.css` trước khi nhúng vào HTML.


---
## PHẦN C — PHÂN TÍCH

### Câu C1 — Phân tích trang web thực (Ví dụ Shopee)
- **Mobile (375px):** Menu navigation chuyển thành icon Hamburger và thanh tìm kiếm tối giản. Lưới sản phẩm 2 cột. Các banner quảng cáo hai bên bị ẩn đi. Font size nhỏ gọn lại.
- **Tablet (768px):** Menu vẫn gọn, lưới sản phẩm tăng lên 3-4 cột.
- **Desktop (1440px):** Menu show full các danh mục ngang. Lưới sản phẩm 6 cột. Có đầy đủ sidebar lọc sản phẩm bên trái.

### Câu C2 — Thiết kế Responsive Strategy


```css
/* Mặc định - Mobile First (Dưới 768px) */
.restaurant-layout {
    display: grid;
    grid-template-columns: 1fr; /* 1 cột duy nhất */
    gap: 16px;
}
.hero-image { width: 100%; }
.food-grid { display: grid; grid-template-columns: 1fr; } /* Ảnh đồ ăn 1 cột */
.booking-form { order: 2; } /* Đẩy form xuống dưới trên mobile */

/* Tablet (768px - 1023px) */
@media (min-width: 768px) {
    .food-grid { grid-template-columns: repeat(2, 1fr); } /* 2 cột ảnh món ăn */
    .restaurant-layout {
        grid-template-columns: 1fr 1fr; /* Chia form và map làm 2 cột cạnh nhau */
    }
    .hero-image { grid-column: 1 / -1; } /* Hero trải dài */
}

/* Desktop (>= 1024px) */
@media (min-width: 1024px) {
    .restaurant-layout {
        grid-template-columns: 300px 1fr; /* Sidebar 300px, content phần còn lại */
    }
    .food-grid { grid-template-columns: repeat(3, 1fr); } /* 3 cột ảnh món ăn */
}