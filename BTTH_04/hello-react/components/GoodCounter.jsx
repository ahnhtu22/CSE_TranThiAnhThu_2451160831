import { useState } from "react";

export default function GoodCounter() {
    const [count, setCount] = useState(0);
    
    function handleClick() {
        setCount(count + 1);
    }
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>✅ Counter "tốt" (dùng useState)</h2>
            <p>Bộ đếm: {count}</p>
            <button onClick={handleClick}>Tăng (+1)</button>
        </div>
    );
}