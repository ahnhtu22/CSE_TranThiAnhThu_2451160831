export default function ProductCard({ name, price, image }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px", borderRadius: "8px" }}>
            <img src={image} alt={name} style={{ width: "100%", borderRadius: "4px" }} />
            <h3>{name}</h3>
            <p style={{ color: "#e74c3c", fontWeight: "bold" }}>{price}đ</p>
            <button style={{ background: "#3498db", color: "white", padding: "8px", border: "none" }}>
                Thêm vào giỏ
            </button>
        </div>
    );
}