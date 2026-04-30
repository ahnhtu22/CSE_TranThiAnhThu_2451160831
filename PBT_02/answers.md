# PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Input Types
1. `type="text"` → Ô nhập văn bản ngắn bình thường, không tự động validate. → Dùng cho ô nhập Họ tên, Địa chỉ.
2. `type="email"` → Ô nhập text, tự động kiểm tra phải có ký tự `@` và tên miền. → Dùng cho form đăng ký/đăng nhập.
3. `type="password"` → Ô nhập text nhưng ký tự bị mã hóa thành dấu chấm/sao tròn. → Dùng cho ô nhập mật khẩu.
4. `type="number"` → Ô nhập số, có mũi tên tăng/giảm, tự động chặn nhập chữ cái (trừ 'e'). → Dùng cho ô chọn số lượng sản phẩm.
5. `type="tel"` → Ô nhập số điện thoại, hiển thị bàn phím số trên mobile, không tự động validate (phải kết hợp `pattern`). → Dùng cho ô nhập SĐT giao hàng.
6. `type="date"` → Hiển thị một cuốn lịch (date picker) để chọn ngày. → Dùng để chọn ngày sinh, ngày giao hàng.
7. `type="radio"` → Nút chọn hình tròn, chỉ được chọn 1 trong 1 nhóm (cùng `name`). → Dùng để chọn Giới tính hoặc Phương thức thanh toán.
8. `type="checkbox"` → Nút chọn hình vuông, có thể chọn nhiều lựa chọn cùng lúc. → Dùng cho "Tôi đồng ý với điều khoản" hoặc chọn nhiều danh mục.
9. `type="file"` → Nút bấm mở cửa sổ duyệt file trên máy tính. → Dùng để người dùng tải lên ảnh đại diện hoặc tài liệu.
10. `type="color"` → Hiển thị bảng chọn màu sắc (color picker). → Dùng cho tính năng cho phép người dùng tùy biến màu giao diện cá nhân.

### Câu A2 (5đ) — Validation Attributes
* **Trường hợp 1:** Trình duyệt chặn submit, hiển thị bong bóng báo lỗi *"Please fill out this field"* (Vui lòng điền vào trường này). Giải thích: Thuộc tính `required` bắt buộc ô này không được bỏ trống.
* **Trường hợp 2:** Trình duyệt chặn submit, báo lỗi *"Please include an '@' in the email address"*. Giải thích: Dữ liệu nhập vào không đúng định dạng của `type="email"`.
* **Trường hợp 3:** Trình duyệt chặn submit, báo lỗi *"Value must be less than or equal to 10"*. Giải thích: Giá trị 15 đã vượt quá giới hạn thuộc tính `max="10"`.
* **Trường hợp 4:** Trình duyệt chặn submit, báo lỗi *"Please match the requested format"*. Giải thích: Thuộc tính `pattern="[0-9]{10}"` yêu cầu dữ liệu phải là đúng 10 chữ số, nhưng người dùng lại nhập có chứa chữ cái.
* **Trường hợp 5:** Trình duyệt chặn submit, báo lỗi *"Please lengthen this text to 8 characters or more"*. Giải thích: Thuộc tính `minlength="8"` yêu cầu mật khẩu phải có độ dài tối thiểu 8 ký tự, nhưng người dùng mới nhập 3 ký tự.

### Câu A3 (5đ) — Accessibility
1. `<label for="email">` rất quan trọng cho screen reader vì nó giúp phần mềm đọc cho người khiếm thị biết chính xác ô input họ đang trỏ tới dùng để làm gì. Ngoài ra, nó giúp tăng diện tích click (người dùng click vào chữ của label thì ô input tự động được focus).
2. Dùng `<fieldset>` + `<legend>` khi cần gom nhóm nhiều ô input có liên quan logic với nhau thành một khối. Ví dụ: Gom Tỉnh/Thành, Quận/Huyện, Số nhà vào chung một fieldset có legend là "Thông tin giao hàng".
3. `aria-label` được dùng khi một phần tử cần tương tác nhưng KHÔNG CÓ chữ hiển thị trên màn hình (Ví dụ: Nút tìm kiếm chỉ có icon kính lúp, nút đóng cửa sổ chỉ có chữ X). KHÔNG nên dùng `aria-label` khi đã có thẻ `<label>` vì sẽ gây thừa thãi và xung đột khiến trình đọc màn hình đọc thông tin hai lần.

### Câu A4 (5đ) — Media
1. Thuộc tính `loading="lazy"` giúp trì hoãn việc tải hình ảnh cho đến khi người dùng cuộn trang gần tới vị trí bức ảnh đó. Nó giúp trang web tải cực nhanh lúc ban đầu và tiết kiệm băng thông. KHÔNG nên dùng cho các bức ảnh nằm ở phần đầu trang (above the fold) vì những ảnh đó cần hiển thị ngay lập tức.
2. Nên cung cấp nhiều `<source>` vì không phải trình duyệt nào cũng hỗ trợ chung một định dạng video (ví dụ Safari chuẩn khác Chrome). Cung cấp nhiều source giúp trình duyệt tự động chọn định dạng tương thích nhất. 3 format phổ biến: MP4, WebM, Ogg.
3. Thuộc tính `alt` dùng để hiển thị chữ thay thế khi ảnh bị lỗi mạng không tải được, đồng thời giúp bot của Google hiểu ảnh đó là gì và cho screen reader đọc.
   - Ảnh sản phẩm: `alt="Điện thoại iPhone 16 màu Titan Sa Mạc"`
   - Ảnh decorative: `alt=""` (để chuỗi rỗng để screen reader bỏ qua)
   - Ảnh biểu đồ: `alt="Biểu đồ cột thể hiện doanh thu Quý 1 tăng 20% so với cùng kỳ"`

### Câu A5 (5đ) — So sánh <figure> vs <img>
* **Cách 1 (Dùng `<img>`):** Sử dụng khi bức ảnh chỉ mang tính chất minh họa phụ trợ, nằm xen kẽ trong văn bản, hoặc là các ảnh biểu tượng (logo, icon, ảnh đại diện). 
* **Cách 2 (Dùng `<figure>`):** Sử dụng khi bức ảnh là một "thực thể độc lập", có giá trị thông tin riêng và cần có chú thích đi kèm (`<figcaption>`).
* **Ví dụ thực tế:** - Cách 1: Ảnh logo công ty ở góc trang web, ảnh avatar của người dùng ở góc màn hình.
  - Cách 2: Ảnh sản phẩm trên trang E-commerce cần đi kèm giá tiền, ảnh biểu đồ dữ liệu trong một bài báo khoa học.