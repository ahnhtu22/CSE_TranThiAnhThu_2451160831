/**
 * --- PHẦN 1: KHAI BÁO BIẾN TOÀN CỤC & TRUY XUẤT DOM ---
 */
let students = [];      // Mảng lưu trữ toàn bộ dữ liệu sinh viên
let isEditMode = false; // Cờ kiểm tra: false nghĩa là đang Thêm, true nghĩa là đang Sửa

// document.getElementById dùng để nắm lấy các thẻ HTML cần thao tác
const modal = document.getElementById('studentModal');
const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const alertMessage = document.getElementById('alertMessage');
const totalStudentsEl = document.getElementById('totalStudents');
const classAverageEl = document.getElementById('classAverage');

/**
 * --- PHẦN 2: CHU TRÌNH KHỞI CHẠY (LIFECYCLE) ---
 */
// Sự kiện DOMContentLoaded báo hiệu HTML đã được tải và dựng xong hoàn toàn
window.addEventListener('DOMContentLoaded', () => {
    loadStudentsFromStorage(); // B1: Lấy dữ liệu hoặc nạp dữ liệu mẫu
    renderStudents();          // B2: Vẽ mảng dữ liệu ra thành bảng HTML
    initEventHandlers();       // B3: Bật lắng nghe các cú click chuột, gõ phím
});

/**
 * --- PHẦN 3: LƯU TRỮ LOCAL STORAGE ---
 */
function loadStudentsFromStorage() {
    // Lấy chuỗi dữ liệu (định dạng JSON) lưu trong trình duyệt theo từ khóa 'students_list'
    const data = localStorage.getItem('students_list');
    
    // Nếu có dữ liệu và dữ liệu không phải là mảng rỗng
    if (data && data !== "[]") {
        students = JSON.parse(data); // Giải mã chuỗi JSON biến ngược lại thành mảng object JS
    } else {
        // NẾU TRỐNG: Nạp 5 sinh viên mẫu theo yêu cầu
        students = [
            { id: '2451160853', name: 'Nguyễn Lê Anh Vũ', dob: '2006-06-19', class: 'K66-CSE', gpa: '8.5', email: 'anhvu.k66@student.edu.vn' },
            { id: '2451160831', name: 'Trần Thị Anh Thư', dob: '2006-10-12', class: 'K66-CSE', gpa: '9.2', email: 'anhthu.k66@student.edu.vn' },
            { id: '2451160123', name: 'Lê Hoàng Hải', dob: '2006-02-25', class: 'K66-CSE', gpa: '7.8', email: 'hoanghai.k66@student.edu.vn' },
            { id: '2451160456', name: 'Phạm Thị Mai', dob: '2006-08-14', class: 'K66-CSE', gpa: '8.0', email: 'phammai.k66@student.edu.vn' },
            { id: '2451160789', name: 'Vũ Đức Kiên', dob: '2006-11-05', class: 'K66-CSE', gpa: '7.5', email: 'duckien.k66@student.edu.vn' }
        ];
        // Lưu mảng mẫu này xuống Local Storage luôn để các lần tải lại trang sau sẽ có sẵn
        localStorage.setItem('students_list', JSON.stringify(students));
    }
}

function saveStudents() {
    // Hàm JSON.stringify chuyển mảng object thành một chuỗi text để lưu được vào LocalStorage
    localStorage.setItem('students_list', JSON.stringify(students));
    updateStatistics(); // Mỗi khi lưu xong, cập nhật lại phần số liệu thống kê
}

/**
 * --- PHẦN 4: THAO TÁC DOM VÀ RENDER GIAO DIỆN ---
 */
function renderStudents() {
    // Reset toàn bộ nội dung cũ của bảng trước khi vẽ mảng mới
    tableBody.innerHTML = '';

    if (students.length === 0) {
        // Thuộc tính colspan="7" giúp một ô gộp độ dài bằng 7 cột
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#888;">Chưa có dữ liệu</td></tr>`;
        return;
    }

    let rowsHTML = '';
    // Lặp qua từng object sinh viên trong mảng
    students.forEach(student => {
        // Tạo mã HTML động (Template Literal dùng dấu backtick ` ) để chèn biến vào
        rowsHTML += `
            <tr>
                <td><strong>${student.id}</strong></td>
                <td>${student.name}</td>
                <td>${formatDate(student.dob)}</td>
                <td>${student.class}</td>
                <td><strong>${parseFloat(student.gpa).toFixed(1)}</strong></td> <td>${student.email}</td>
                <td>
                    <button class="btn-action btn-edit" onclick="setupEditStudent('${student.id}')">Sửa</button>
                    <button class="btn-action btn-delete" onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            </tr>
        `;
    });
    
    // Đẩy toàn bộ chuỗi HTML vừa tạo vào thân bảng (tbody)
    tableBody.innerHTML = rowsHTML;
}

function updateStatistics() {
    const total = students.length;
    totalStudentsEl.innerText = total; // Cập nhật text sĩ số

    if (total === 0) {
        classAverageEl.innerText = '0.0';
        return;
    }

    // Hàm reduce() duyệt mảng để cộng dồn (tích lũy) điểm gpa. 'sum' bắt đầu từ 0.
    const sumGpa = students.reduce((sum, s) => sum + parseFloat(s.gpa), 0);
    classAverageEl.innerText = (sumGpa / total).toFixed(2);
}

/**
 * --- PHẦN 5: GẮN SỰ KIỆN (EVENT LISTENERS) ---
 */
function initEventHandlers() {
    // Sự kiện mở Form Thêm Mới
    document.getElementById('btnOpenModal').addEventListener('click', () => {
        isEditMode = false; // Đánh dấu đây là hành động Thêm mới
        document.getElementById('modalTitle').innerText = "Thêm Sinh Viên Mới"; // Đổi chữ tiêu đề
        document.getElementById('studentId').disabled = false; // Mở khóa ô ID (Cho phép nhập)
        studentForm.reset(); // Làm sạch ô nhập từ lần thao tác trước
        modal.classList.add('show'); // Kích hoạt CSS để hiện form lên
    });

    // Các sự kiện Đóng Form (Khi bấm nút X hoặc nút Hủy bỏ)
    document.getElementById('btnCloseX').addEventListener('click', () => modal.classList.remove('show'));
    document.getElementById('btnCancel').addEventListener('click', () => modal.classList.remove('show'));

    // Sự kiện Cực Kỳ Quan Trọng: Nộp Form
    studentForm.addEventListener('submit', (e) => {
        // Ngăn chặn trình duyệt tải lại trang (hành vi mặc định của thẻ <form>)
        e.preventDefault(); 
        handleFormSubmit(); // Gọi hàm xử lý logic
    });
}

/**
 * --- PHẦN 6: XỬ LÝ NGHIỆP VỤ CRUD ---
 */
function handleFormSubmit() {
    // Thu thập tất cả giá trị nhập liệu. Lệnh trim() loại bỏ khoảng trắng thừa ở đầu/cuối chữ.
    const id = document.getElementById('studentId').value.trim();
    const name = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const className = document.getElementById('className').value.trim();
    const gpa = document.getElementById('gpa').value;
    const email = document.getElementById('email').value.trim();

    if (isEditMode) {
        // --- LOGIC SỬA (UPDATE) ---
        // Tìm vị trí (index) của sinh viên có mã ID trùng khớp trong mảng
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            // Ghi đè object sinh viên tại vị trí đó bằng object dữ liệu mới
            students[index] = { id, name, dob, class: className, gpa, email };
            showNotification('Cập nhật thông tin thành công!');
        }
    } else {
        // --- LOGIC THÊM MỚI (CREATE) ---
        // Hàm some() trả về true nếu có ít nhất 1 sinh viên trong mảng trùng ID
        if (students.some(s => s.id === id)) {
            alert('Lỗi: Mã sinh viên này đã tồn tại trong hệ thống!');
            return; // Lỗi thì dừng luôn hàm tại đây
        }
        // Nạp thêm object sinh viên mới vào đuôi mảng
        students.push({ id, name, dob, class: className, gpa, email });
        showNotification('Đã thêm sinh viên mới!');
    }

    // Hoàn tất thao tác: Lưu mảng -> Vẽ lại bảng -> Tắt form
    saveStudents();
    renderStudents();
    modal.classList.remove('show');
}

function setupEditStudent(id) {
    isEditMode = true; // Đánh dấu cờ đang Sửa
    const student = students.find(s => s.id === id); // Lọc ra object sinh viên cần sửa
    
    // Bắn dữ liệu cũ của sinh viên ngược lên lại các ô input
    document.getElementById('editStudentId').value = student.id;
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentId').disabled = true; // Khóa chết ô ID, không cho sửa Khóa Chính
    document.getElementById('fullName').value = student.name;
    document.getElementById('dob').value = student.dob;
    document.getElementById('className').value = student.class;
    document.getElementById('gpa').value = student.gpa;
    document.getElementById('email').value = student.email;

    // Đổi giao diện form phù hợp chức năng Sửa
    document.getElementById('modalTitle').innerText = "Cập Nhật Sinh Viên";
    modal.classList.add('show');
}

function deleteStudent(id) {
    // confirm() tạo popup Yes/No xác nhận từ trình duyệt
    const isConfirmed = confirm(`Xác nhận xóa sinh viên mã: ${id}?`);
    if (isConfirmed) {
        // Hàm filter() lọc lấy ra TẤT CẢ sinh viên CÓ ID KHÁC với id cần xóa, sau đó gán lại vào mảng gốc
        // Suy ra: Phần tử có ID bị xóa sẽ biến mất khỏi mảng
        students = students.filter(s => s.id !== id); 
        
        saveStudents();
        renderStudents();
        showNotification('Đã xóa thành công!');
    }
}

/**
 * --- PHẦN 7: CÁC HÀM TIỆN ÍCH TRỢ GIÚP (UTILITIES) ---
 */
function showNotification(text) {
    alertMessage.innerText = text;
    alertMessage.style.display = 'block'; // Đổi từ display:none sang display:block để hiện lên
    
    // Hàm setTimeout() đếm ngược thời gian. Ở đây là 3000 mili-giây (3s) sau thì tự động giấu thông báo đi.
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 3000); 
}

function formatDate(dateString) {
    // Chuyển đổi định dạng YYYY-MM-DD (Chuẩn input type="date") sang DD/MM/YYYY để người dùng dễ đọc
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-'); // Cắt chuỗi dựa vào dấu '-'
    return `${day}/${month}/${year}`; // Ghép ngược lại theo thứ tự ngày/tháng/năm
}