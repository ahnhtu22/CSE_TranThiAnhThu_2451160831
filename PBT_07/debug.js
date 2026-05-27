function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) return -1;
    giaBan = Number(giaBan);
    const giamGia = (giaBan * phanTramGiam) / 100;
    const giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) console.log("Sản phẩm miễn phí!");
    return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log(`Giá sau giảm: ${gia}đ`);

const gia2 = tinhGiaGiamGia(50000, 110);
if (gia2 === -1) console.log("Lỗi: Phần trăm giảm không hợp lệ");

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}