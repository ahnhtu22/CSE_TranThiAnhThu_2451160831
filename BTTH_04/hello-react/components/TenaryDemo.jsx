export default function TenaryDemo() {
    const isLoggedIn = true;
    const score = 8;
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>{isLoggedIn ? "Chào mừng bạn!" : "Vui lòng đăng nhập"}</h2>
            <p>Kết quả: {score >= 5 ? "Đậu" : "Rớt"}</p>
        </div>
    );
}