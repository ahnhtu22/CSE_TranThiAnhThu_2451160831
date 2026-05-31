const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    // Hãy tự thêm 10 sản phẩm nữa theo yêu cầu đề bài nhé!
];

const container = document.querySelector('#product-container');
const searchInput = document.querySelector('#search');
const sortSelect = document.querySelector('#sort');
const cartBadge = document.querySelector('#cartBadge');
const themeToggle = document.querySelector('#themeToggle');

let currentProducts = [...products];
let cartCount = 0;

function renderProducts(list) {
    container.textContent = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString('vi-VN')}đ</p>
        `;
        
        const btn = document.createElement('button');
        btn.textContent = 'Thêm giỏ hàng';
        btn.onclick = (e) => {
            e.stopPropagation();
            cartCount++;
            if(cartBadge) cartBadge.textContent = cartCount;
        };
        
        card.append(btn);
        card.addEventListener('click', () => showModal(p));
        container.append(card);
    });
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
});

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

function showModal(product) {
    // Logic tạo Modal và hiển thị thông tin sản phẩm
    console.log("Hiển thị modal cho:", product.name);
}

renderProducts(currentProducts);