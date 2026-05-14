# ĐÁP ÁN PHIẾU BÀI TẬP 04 - CSS LAYOUT

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Vị trí mặc định của DOM | Có | Các phần tử bình thường, text |
| `relative` | Có | Vị trí ban đầu của chính nó | Có | Dịch chuyển nhẹ, làm mốc cho absolute |
| `absolute` | Không | Tổ tiên gần nhất có position (khác static) | Có | Badge, tooltip, modal overlay |
| `fixed` | Không | Viewport (Khung nhìn trình duyệt) | Không | Header cố định, nút back-to-top |
| `sticky` | Có | Chính nó & Scrollport (Vùng cuộn) | Vừa có vừa không (bám dính khi cuộn tới mốc) | Sticky sidebar, Table header |

**Câu hỏi thêm:**
- `absolute` tham chiếu `body` (hoặc block chứa ban đầu) khi không có bất kỳ phần tử cha/ông nào được set `position` (khác `static`).
- Tham chiếu parent khi phần tử parent đó được set `position: relative`, `absolute`, `fixed`, hoặc `sticky`.
- "Nearest positioned ancestor" là phần tử cha/tổ tiên gần nhất trong cây DOM có thuộc tính `position` khác `static`.

### Câu A2 — Flexbox vs Grid
- **Trường hợp 1 (Flex 4 items):** 1 hàng ngang, 4 cột có chiều rộng bằng nhau (chia đều không gian).
- **Trường hợp 2 (Flex wrap 6 items):** Bố cục 3 hàng, 2 cột. (Vì width 45% + margin trái phải 5% = 50% mỗi item, nên 1 hàng chỉ chứa được 2 items).
- **Trường hợp 3 (Flex space-between 3 items):** 1 hàng ngang. Item 1 sát mép trái, Item 2 ở giữa, Item 3 sát mép phải. Cả 3 được căn giữa theo chiều dọc.
- **Trường hợp 4 (Grid 3 items):** 1 hàng, 3 cột. Cột trái rộng 200px, cột giữa chiếm toàn bộ phần còn lại (1fr), cột phải rộng 200px.
- **Trường hợp 5 (Grid 7 items):** Bố cục 3 hàng, 3 cột (mỗi cột 1fr đều nhau). Hàng 1 có 3 items, hàng 2 có 3 items, hàng 3 có 1 item (nằm ở cột đầu tiên bên trái).

---

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?
1. **Navigation bar ngang:** Dùng **Flexbox** (1 chiều ngang, dễ dàng đẩy logo 1 bên, menu 1 bên với `space-between`).
2. **Lưới ảnh Instagram:** Dùng **Grid** (Cấu trúc 2 chiều, dễ dàng ép cố định 3 cột đều nhau dù có bao nhiêu ảnh).
3. **Layout blog (main content + sidebar):** Dùng **Grid** (Dễ chia tỷ lệ cột, ví dụ `1fr 300px`).
4. **Footer 4 cột:** Dùng **Grid** (Chia `repeat(4, 1fr)` rất nhanh và đều).
5. **Card sản phẩm:** Dùng **Flexbox** (Layout 1 chiều dọc `flex-direction: column`, dùng `margin-top: auto` để đẩy nút xuống đáy).

### Câu C2 — Debug Flexbox
**Lỗi 1:** Các phần tử bên trong card chưa chiếm hết chiều cao, cần biến card thành flex container dạng cột.
- **Sửa:** Thêm vào `.card`: `display: flex; flex-direction: column;`. Thêm vào nút `.btn`: `margin-top: auto;`.

**Lỗi 2:** Thiếu thuộc tính căn chỉnh dọc và ngang của Flexbox.
- **Sửa:** Thêm vào `.hero`: `justify-content: center; align-items: center;`.

**Lỗi 3:** Flex item mặc định có `flex-shrink: 1` nên bị co lại khi không đủ chỗ.
- **Sửa:** Thêm vào `.sidebar`: `flex-shrink: 0;`.