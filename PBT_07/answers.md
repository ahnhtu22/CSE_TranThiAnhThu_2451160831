# PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const
- **Đoạn 1:** Kết quả là `undefined`. Giải thích: `var` có cơ chế hoisting (kéo phần khai báo lên đầu) nhưng không kéo phần gán giá trị.
- **Đoạn 2:** Lỗi `ReferenceError`. Giải thích: `let` nằm trong Vùng chết tạm thời (TDZ - Temporal Dead Zone) trước khi được khởi tạo, không thể truy cập.
- **Đoạn 3:** Lỗi `TypeError`. Giải thích: Không thể gán lại giá trị cho biến khai báo bằng `const`.
- **Đoạn 4:** Kết quả là `[1, 2, 3, 4]`. Giải thích: `const` bảo vệ tham chiếu đến vùng nhớ của mảng, không bảo vệ dữ liệu bên trong mảng (mảng là mutable).
- **Đoạn 5:** In ra "Trong block: 2" và "Ngoài block: 1". Giải thích: `let` có phạm vi theo block (block scope), biến `a` bên trong khối `{}` hoàn toàn độc lập với biến `a` bên ngoài.


### Câu A2 — Data Types & Coercion
- `typeof null` → `"object"` (Đây là một bug lịch sử của JavaScript).
- `typeof undefined` → `"undefined"`
- `typeof NaN` → `"number"` (NaN là Not-a-Number, nhưng kiểu dữ liệu vẫn là số).
- `"5" + 3` → `"53"`
- `"5" - 3` → `2`
- `"5" * "3"` → `15`
- `true + true` → `2`
- `[] + []` → `""`
- `[] + {}` → `"[object Object]"`
- `{} + []` → `0` (hoặc `"[object Object]"` tùy thuộc vào việc console hiểu `{}` là block rỗng hay object rỗng).

**Giải thích "5" + 3 và "5" - 3:** Toán tử `+` trong JS bị ghi đè thành toán tử nối chuỗi nếu có 1 toán hạng là chuỗi, nên số 3 bị ép thành chuỗi. Tuy nhiên, toán tử `-` chỉ dùng cho toán học, nên chuỗi "5" bị ép kiểu ngược lại thành số học.

### Câu A3 — So sánh == vs ===
- `5 == "5"` → `true`
- `5 === "5"` → `false`
- `null == undefined` → `true`
- `null === undefined` → `false`
- `NaN == NaN` → `false`
- `0 == false` → `true`
- `0 === false` → `false`
- `"" == false` → `true`

**Quy tắc:** Từ giờ trở đi, LUÔN LUÔN sử dụng `===`. Dấu `===` (Strict equality) so sánh cả kiểu dữ liệu và giá trị, giúp ngăn chặn cơ chế ép kiểu ngầm định (type coercion) của `==`, từ đó tránh được những bug không mong muốn.

### Câu A4 — Truthy & Falsy
- **Falsy values:** `false`, `0`, `-0`, `0n`, `""` (chuỗi rỗng), `null`, `undefined`, `NaN`.
- `if ("0") console.log("A");` → Có in (A).
- `if ("") console.log("B");` → Không in.
- `if ([]) console.log("C");` → Có in (C).
- `if ({}) console.log("D");` → Có in (D).
- `if (null) console.log("E");` → Không in.
- `if (0) console.log("F");` → Không in.
- `if (-1) console.log("G");` → Có in (G).
- `if (" ") console.log("H");` → Có in (H).

### Câu A5 — Template Literals
```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;