// ==========================================
// 1. KHAI BÁO BIẾN
// ==========================================
let danhSachCongViec = []; // Mảng chứa các công việc
let idDangSua = null;      // Cờ hiệu: null = Thêm mới, có ID = Đang sửa

const modal = document.getElementById('khungModal');
const form = document.getElementById('formCongViec');
const vungDanhSach = document.getElementById('danhSachCongViec');
const khungThongBao = document.getElementById('thongBao');

// ==========================================
// 2. KHỞI CHẠY (Khi tải trang xong)
// ==========================================
window.onload = function() {
    docDuLieu(); // Bước 1: Lấy dữ liệu từ LocalStorage
    veGiaoDien(); // Bước 2: Hiển thị mảng ra màn hình
};

// ==========================================
// 3. ĐỌC / LƯU DỮ LIỆU
// ==========================================
function docDuLieu() {
    let duLieuCu = localStorage.getItem('bai2_congviec');
    
    // Nếu có dữ liệu trong máy thì lấy ra dùng
    if (duLieuCu !== null && duLieuCu !== "[]") {
        danhSachCongViec = JSON.parse(duLieuCu);
    } else {
        // Nếu bộ nhớ trống, nạp thử 3 công việc mẫu
        danhSachCongViec = [
            { id: 1, tieuDe: 'Làm bài thực hành số 3', moTa: 'Dùng HTML CSS JS thuần', hanChot: '2026-06-01', uuTien: 'Cao', trangThai: false },
            { id: 2, tieuDe: 'Ôn tập thuật toán A*', moTa: 'Môn trí tuệ nhân tạo', hanChot: '2026-05-30', uuTien: 'Trung bình', trangThai: true },
            { id: 3, tieuDe: 'Cài đặt SQL Server', moTa: 'Chuẩn bị làm đồ án C#', hanChot: '2026-06-15', uuTien: 'Thấp', trangThai: false }
        ];
        localStorage.setItem('bai2_congviec', JSON.stringify(danhSachCongViec));
    }
}

function luuDuLieu() {
    // Ép mảng thành chuỗi văn bản và lưu xuống trình duyệt
    localStorage.setItem('bai2_congviec', JSON.stringify(danhSachCongViec));
    veGiaoDien(); // Cứ mỗi lần lưu là tự động vẽ lại bảng để giao diện khớp với dữ liệu
}

// ==========================================
// 4. VẼ GIAO DIỆN (RENDER) VÀ THỐNG KÊ
// ==========================================
function veGiaoDien() {
    vungDanhSach.innerHTML = ''; // Làm sạch khu vực danh sách cũ

    if (danhSachCongViec.length === 0) {
        vungDanhSach.innerHTML = '<p style="text-align:center; color:#888;">Chưa có công việc nào!</p>';
    }

    // Dùng vòng lặp for đơn giản duyệt qua từng công việc trong mảng
    for (let i = 0; i < danhSachCongViec.length; i++) {
        let cv = danhSachCongViec[i];
        
        // Kiểm tra xem công việc này đã xong chưa để đắp class CSS cho phù hợp
        let classHoanThanh = '';
        let thuocTinhChecked = '';
        
        if (cv.trangThai === true) {
            classHoanThanh = 'da-xong'; // CSS sẽ đổi viền thành xanh và gạch ngang chữ
            thuocTinhChecked = 'checked'; // Đánh dấu tick vào ô vuông
        }

        // Tạo thẻ HTML
        let theHTML = `
            <div class="the-cong-viec ${classHoanThanh}">
                <div>
                    <input type="checkbox" class="o-check" ${thuocTinhChecked} onclick="doiTrangThai(${cv.id})">
                </div>
                
                <div class="noi-dung-cv">
                    <h3>${cv.tieuDe}</h3>
                    <p>${cv.moTa}</p>
                    <small>📅 Hạn: ${cv.hanChot} | 🏷️ Ưu tiên: ${cv.uuTien}</small>
                </div>

                <div class="nhom-nut-hanh-dong">
                    <button onclick="bamNutSua(${cv.id})" style="color: #ff9800; border-color: #ff9800;">Sửa</button>
                    <button onclick="bamNutXoa(${cv.id})" style="color: #d32f2f; border-color: #d32f2f;">Xóa</button>
                </div>
            </div>
        `;
        
        // Gắn thẻ HTML đó vào vùng danh sách trên web
        vungDanhSach.innerHTML += theHTML;
    }

    // Sau khi vẽ xong danh sách, đi tính toán số lượng thống kê
    capNhatThongKe();
}

function capNhatThongKe() {
    let tong = danhSachCongViec.length;
    let soLuongXong = 0;
    
    // Đếm số công việc có trạng thái = true
    for (let i = 0; i < tong; i++) {
        if (danhSachCongViec[i].trangThai === true) {
            soLuongXong = soLuongXong + 1;
        }
    }

    // Gắn số liệu lên giao diện
    document.getElementById('tongSo').innerText = tong;
    document.getElementById('daXong').innerText = soLuongXong;
    document.getElementById('chuaXong').innerText = tong - soLuongXong;
}

// ==========================================
// 5. ĐÓNG MỞ FORM
// ==========================================
document.getElementById('btnMoForm').onclick = function() {
    idDangSua = null; // Bật cờ "Thêm mới"
    document.getElementById('tieuDeForm').innerText = "Thêm Công Việc Mới";
    form.reset(); // Xóa trắng các ô nhập
    modal.classList.add('hien-thi');
};

function tatForm() {
    modal.classList.remove('hien-thi');
}
document.getElementById('btnDongX').onclick = tatForm;
document.getElementById('btnHuy').onclick = tatForm;

// ==========================================
// 6. XỬ LÝ NỘP FORM (THÊM / SỬA)
// ==========================================
form.onsubmit = function(event) {
    event.preventDefault(); // Lệnh BẮT BUỘC để chặn form tự động load lại trang web

    // Lấy giá trị người dùng nhập từ 4 ô
    let inputTieuDe = document.getElementById('tieuDe').value;
    let inputMoTa = document.getElementById('moTa').value;
    let inputHan = document.getElementById('hanChot').value;
    let inputUuTien = document.getElementById('uuTien').value;

    if (idDangSua === null) {
        // --- CHẾ ĐỘ THÊM MỚI ---
        let congViecMoi = {
            id: Date.now(), // Dùng thời gian hiện tại làm ID để không bao giờ bị trùng
            tieuDe: inputTieuDe,
            moTa: inputMoTa,
            hanChot: inputHan,
            uuTien: inputUuTien,
            trangThai: false // Mới tạo mặc định là chưa làm xong
        };
        danhSachCongViec.push(congViecMoi); // Bỏ vào cuối mảng
        hienThongBao("Đã thêm công việc thành công!");
    } else {
        // --- CHẾ ĐỘ SỬA ---
        // Quét mảng tìm đúng dòng có ID trùng với idDangSua
        for (let i = 0; i < danhSachCongViec.length; i++) {
            if (danhSachCongViec[i].id === idDangSua) {
                // Cập nhật lại thông tin mới
                danhSachCongViec[i].tieuDe = inputTieuDe;
                danhSachCongViec[i].moTa = inputMoTa;
                danhSachCongViec[i].hanChot = inputHan;
                danhSachCongViec[i].uuTien = inputUuTien;
            }
        }
        hienThongBao("Đã cập nhật công việc!");
    }

    luuDuLieu(); // Lưu mảng và vẽ lại
    tatForm();   // Xong việc thì giấu form đi
};

// ==========================================
// 7. CÁC NÚT HÀNH ĐỘNG (XÓA, SỬA, ĐỔI TRẠNG THÁI)
// ==========================================
function bamNutXoa(idXoa) {
    let xacNhan = confirm("Bạn có chắc chắn muốn xóa công việc này?");
    if (xacNhan === true) {
        // Lọc mảng: Giữ lại toàn bộ công việc CÓ ID KHÁC với ID cần xóa
        danhSachCongViec = danhSachCongViec.filter(function(cv) {
            return cv.id !== idXoa;
        });
        luuDuLieu();
        hienThongBao("Đã xóa công việc!");
    }
}

function bamNutSua(idSua) {
    idDangSua = idSua; // Bật cờ "Đang sửa" và lưu lại ID cần sửa
    document.getElementById('tieuDeForm').innerText = "Cập Nhật Công Việc";

    // Tìm công việc đó và bê thông tin cũ đắp lên các ô input của form
    for (let i = 0; i < danhSachCongViec.length; i++) {
        if (danhSachCongViec[i].id === idSua) {
            document.getElementById('tieuDe').value = danhSachCongViec[i].tieuDe;
            document.getElementById('moTa').value = danhSachCongViec[i].moTa;
            document.getElementById('hanChot').value = danhSachCongViec[i].hanChot;
            document.getElementById('uuTien').value = danhSachCongViec[i].uuTien;
        }
    }
    modal.classList.add('hien-thi'); // Mở form lên
}

function doiTrangThai(idDoi) {
    for (let i = 0; i < danhSachCongViec.length; i++) {
        if (danhSachCongViec[i].id === idDoi) {
            // Lệnh đảo ngược: nếu đang true thì gán bằng false, và ngược lại
            danhSachCongViec[i].trangThai = !danhSachCongViec[i].trangThai;
        }
    }
    luuDuLieu(); // Lưu lại trạng thái mới và vẽ lại (lúc vẽ lại sẽ tự động gạch ngang chữ)
}

function hienThongBao(noiDung) {
    khungThongBao.innerText = noiDung;
    khungThongBao.style.display = "block"; // Hiện lên
    
    // Hẹn giờ 3 giây (3000ms) sau thì giấu đi
    setTimeout(function() {
        khungThongBao.style.display = "none";
    }, 3000);
}