# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — Function Declaration vs Expression vs Arrow

**1. Function Declaration**
\`\`\`javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue }; 
}
\`\`\`

**2. Function Expression**
\`\`\`javascript
const tinhThueBaoHiemExpr = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
\`\`\`

**3. Arrow Function**
\`\`\`javascript
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thue, thuc_nhan: luong - thue };
};
\`\`\`

**Giải thích về Hoisting:**
* **Function Declaration:** Được hoisting toàn bộ (cả tên và nội dung hàm) lên đầu scope. Có thể gọi hàm trước khi khai báo.
* **Function Expression & Arrow Function:** Do khai báo bằng `const` (hoặc `let`), biến chỉ được đưa vào Temporal Dead Zone (TDZ) và không thể gọi trước khi khởi tạo (sẽ báo lỗi ReferenceError). Nếu dùng `var`, biến được hoisting nhưng mang giá trị `undefined`, gọi sẽ báo lỗi `TypeError`.

---

## Câu A2 — Scope & Closure

**Dự đoán Output:**
* **Đoạn 1:** `1`, `2`, `3`, `2`, `2`
* **Đoạn 2:**
    * Sau 100ms in ra 3 lần: `var: 3`, `var: 3`, `var: 3`
    * Sau 200ms in ra: `let: 0`, `let: 1`, `let: 2`

**Giải thích chi tiết Đoạn 2:**
* `var` có scope là function/global. Vòng lặp kết thúc, `i` đạt giá trị `3`. Cả 3 hàm callback trong `setTimeout` đều tham chiếu đến cùng một vùng nhớ của biến `i`, nên đều in ra `3`.
* `let` có block scope. Mỗi vòng lặp sẽ tạo ra một biến `j` mới trong một block scope riêng biệt. Các callback trong `setTimeout` "nhớ" được giá trị của `j` tại thời điểm vòng lặp đó chạy nhờ vào Closure.

---

## Câu A3 — Array Methods

\`\`\`javascript
// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, n) => acc + n, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const parityStrings = nums.map(n => \`Số \${n} là \${n % 2 === 0 ? 'chẵn' : 'lẻ'}\`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();
\`\`\`

---

## Câu A4 — Object Destructuring & Spread

**Dự đoán Output:**
* **Destructuring:**
    * `console.log(name, price, ram, color);` → `iPhone 16 25990000 8 Titan`
    * `console.log(specs);` → **Lỗi ReferenceError: specs is not defined**. (Vì `specs` đã được bóc tách trực tiếp thành `ram` và `color`, nó không tồn tại như một biến độc lập).
* **Spread:**
    * `console.log(updated.price);` → `23990000` (Ghi đè giá trị cũ).
    * `console.log(updated.sale);` → `true`
    * `console.log(product.price);` → `25990000` (Gốc không đổi).
* **Spread Gotcha:**
    * `console.log(product.specs.ram);` → `16`.
    * **Tại sao:** Spread operator `{ ...product }` chỉ tạo **shallow copy** (sao chép nông). Thuộc tính `specs` là một object con, nên nó chỉ copy tham chiếu. Đổi `copy.specs.ram` cũng làm thay đổi object gốc.

---

# PHẦN C — SUY LUẬN

## Câu C1 — Refactor Code

\`\`\`javascript
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
\`\`\`

---

## Câu C2 — Thiết kế API

\`\`\`javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    reduce(arr, fn, initialValue) {
        let acc = initialValue !== undefined ? initialValue : arr[0];
        let startIndex = initialValue !== undefined ? 0 : 1;
        
        for (let i = startIndex; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test
console.log(miniArray.map([1,2,3], x => x * 2));        
console.log(miniArray.filter([1,2,3,4], x => x > 2));    
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); 
\`\`\`