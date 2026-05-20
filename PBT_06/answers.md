# Phần A - Đọc Hiểu

## Câu A1 - Grid System
| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|---|---|---|---|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Xếp chồng dọc (1 box/hàng) | Xếp thành lưới (2 box/hàng) | Xếp ngang (4 box/hàng) |

* Giải thích `col-md-6`: Thuộc tính này chỉ định phần tử sẽ chiếm 6 phần (tương đương 50% chiều rộng) trên hệ thống lưới 12 cột khi màn hình đạt kích thước từ `md` (≥768px) trở lên.
* Không cần viết `col-sm-12` vì Bootstrap sử dụng phương pháp tiếp cận "Mobile-first". Thuộc tính `col-12` đã mặc định áp dụng cho mọi kích thước màn hình nhỏ nhất, và sẽ giữ nguyên trạng thái 100% chiều rộng này cho đến khi gặp điểm ngắt lớn hơn (như `md`).

## Câu A2 - Utilities & Components
1. **Class `d-none d-md-block`:** Element này sẽ bị ẩn (`display: none`) trên các thiết bị di động (kích thước nhỏ hơn `md`). Element sẽ được hiển thị dưới dạng khối (`display: block`) khi màn hình có chiều rộng từ 768px trở lên (tablet, desktop).
2. **5 Spacing Utilities:**
   * `mt-3`: Margin-top mức 3 (thường là 1rem).
   * `px-4`: Padding trục X (left và right) mức 4.
   * `mb-auto`: Margin-bottom tự động (thường dùng trong flexbox để đẩy phần tử khác ra xa).
   * `py-2`: Padding trục Y (top và bottom) mức 2.
   * `mx-auto`: Căn giữa phần tử khối bằng cách set margin left/right là auto.
3. **Sự khác nhau giữa các Container:**
   * `.container`: Có chiều rộng tối đa (max-width) cố định, thay đổi nhảy bậc theo từng điểm ngắt (breakpoint).
   * `.container-fluid`: Luôn luôn chiếm 100% chiều rộng không gian hiển thị ở mọi kích thước.
   * `.container-md`: Chiếm 100% chiều rộng cho đến khi đạt điểm ngắt `md`, sau đó sẽ hoạt động giống hệt `.container` với max-width cố định.

# Phần C - Phân Tích

## Câu C1 - Tùy biến Bootstrap
1. **Quy trình đổi màu `$primary` sang `#E63946`:** Cần sử dụng SASS/SCSS và công cụ biên dịch (như Node.js với `sass` hoặc extension Live Sass Compiler). Khởi tạo một file `custom.scss`, định nghĩa lại biến `$primary: #E63946;`, sau đó `@import` file SCSS gốc của Bootstrap vào bên dưới biến này. Cuối cùng, biên dịch file `custom.scss` thành file CSS để liên kết vào HTML.
2. **Tại sao không nên override trực tiếp bằng CSS thuần:** Việc ghi đè `.btn-primary { background: red; }` sẽ phá vỡ tính đồng bộ. Các trạng thái hover, active, focus, hoặc các class liên quan như `.btn-outline-primary`, `.text-primary`, `.bg-primary` sẽ không tự động cập nhật màu mới. Dùng SASS variables giúp Bootstrap tự động tính toán và tạo ra toàn bộ hệ sinh thái class với màu sắc mới.

## Câu C2 - So sánh
* **Số dòng CSS:** Viết thuần cần hàng trăm dòng CSS; dùng Bootstrap gần như không cần viết thêm dòng CSS nào.
* **Thời gian phát triển:** Bootstrap nhanh hơn đáng kể vì các class và component đã được xây dựng sẵn.
* **Khả năng tùy biến:** CSS thuần tùy biến tự do 100%. Bootstrap khó tùy biến sâu nếu không rành về SCSS hoặc sẽ dễ làm code HTML bị cồng kềnh.
* **Khi nào NÊN dùng:** Các trang admin dashboard, landing page cần ra mắt nhanh, hoặc các dự án ưu tiên chức năng hơn là thiết kế độc bản.
* **Khi nào KHÔNG NÊN dùng:** Các website có UI/UX thiết kế riêng biệt, độc đáo, hoặc các trang yêu cầu dung lượng tải trang cực kỳ tối ưu.