const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 7;
let guessedNumbers = [];

alert("Chào mừng đến với game đoán số từ 1 - 100! Bạn có tối đa 7 lần đoán.");

while (attempts < maxAttempts) {
    let input = prompt(`Lần đoán thứ ${attempts + 1}/${maxAttempts}.\nNhập một số từ 1 đến 100:`);
    
    // Xử lý nếu người chơi bấm Hủy (Cancel)
    if (input === null) {
        alert("Bạn đã thoát game.");
        break;
    }

    let guess = Number(input);

    // Validate
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Vui lòng nhập một số HỢP LỆ từ 1 đến 100!");
        continue;
    }

    // Kiểm tra trùng lặp
    let isDuplicate = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        alert("Bạn đã đoán số này rồi! Vui lòng chọn số khác.");
        continue;
    }

    // Nếu hợp lệ, tăng bộ đếm và lưu lại
    attempts++;
    guessedNumbers[guessedNumbers.length] = guess;

    // So sánh
    if (guess === targetNumber) {
        alert(`Đúng rồi! Chúc mừng bạn đã đoán đúng số ${targetNumber} sau ${attempts} lần!`);
        break;
    } else if (guess < targetNumber) {
        alert("Thấp hơn!");
    } else {
        alert("Cao hơn!");
    }

    // Kiểm tra thua cuộc
    if (attempts === maxAttempts) {
        alert(`Bạn đã hết lượt! Số chính xác là: ${targetNumber}`);
    }
}