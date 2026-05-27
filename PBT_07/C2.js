function printBill(items, isWednesday) {
    let subtotal = 0;
    let detailLines = [];

    // Tính tổng và chuẩn bị các dòng in
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const cost = item.price * item.quantity;
        subtotal += cost;
        
        let line = `║ ${i+1}. ${item.name.padEnd(10)} x${item.quantity.toString().padEnd(4)} @${item.price/1000}k  = ${cost/1000}k`;
        line = line.padEnd(39) + "║";
        detailLines.push(line);
    }

    // Xử lý giảm giá
    let discountPercent = 0;
    if (subtotal > 1000000) discountPercent += 15;
    else if (subtotal > 500000) discountPercent += 10;
    
    if (isWednesday) discountPercent += 5;
    
    const discountAmount = (subtotal * discountPercent) / 100;
    const afterDiscount = subtotal - discountAmount;
    
    // Thuế & Tip
    const vat = afterDiscount * 0.08;
    const tip = afterDiscount * 0.05;
    const total = afterDiscount + vat + tip;

    // Helper format VND
    const toVND = (num) => num.toLocaleString('vi-VN') + "đ";

    // In hóa đơn
    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
    console.log("╠══════════════════════════════════════╣");
    for(let line of detailLines) console.log(line);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:              ${toVND(subtotal).padEnd(12)} ║`);
    console.log(`║ Giảm giá (${discountPercent}%):           ${toVND(discountAmount).padEnd(12)} ║`);
    console.log(`║ VAT (8%):               ${toVND(vat).padEnd(12)} ║`);
    console.log(`║ Tip (5%):               ${toVND(tip).padEnd(12)} ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:             ${toVND(total).padEnd(12)} ║`);
    console.log("╚══════════════════════════════════════╝");
}

// Chạy test với dữ liệu đề bài
const order = [
    { name: "Phở bò", quantity: 2, price: 65000 },
    { name: "Trà đá", quantity: 3, price: 5000 },
    { name: "Bún chả", quantity: 1, price: 55000 }
];

// Gọi hàm (Tham số thứ 2 là true nếu đi ăn vào thứ 4, false nếu ngày khác)
printBill(order, false);