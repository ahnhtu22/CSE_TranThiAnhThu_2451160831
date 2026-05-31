export default function ListRendering() {
    const fruits = ["Táo", "Chuối", "Cam", "Nho"];
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Danh sách trái cây</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
        </div>
    );
}