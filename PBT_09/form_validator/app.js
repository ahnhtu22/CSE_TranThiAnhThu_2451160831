const form = document.querySelector('#registerForm');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const strengthBar = document.querySelector('#strengthBar');
const submitBtn = document.querySelector('#submitBtn');

phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    if (val.length > 4 && val.length <= 7) {
        val = val.slice(0, 4) + '-' + val.slice(4);
    } else if (val.length > 7) {
        val = val.slice(0, 4) + '-' + val.slice(4, 7) + '-' + val.slice(7, 10);
    }
    e.target.value = val;
});

passwordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) strength++;
    if (/[A-Z]/.test(val) && /[!@#$%^&*]/.test(val)) strength++;

    strengthBar.className = '';
    if (strength === 1) strengthBar.classList.add('weak'); 
    if (strength === 2) strengthBar.classList.add('medium'); 
    if (strength === 3) strengthBar.classList.add('strong'); 
});

// Giả lập check form valid 
form.addEventListener('input', () => {
    // Nếu tất cả field hợp lệ
    // submitBtn.disabled = false;
});