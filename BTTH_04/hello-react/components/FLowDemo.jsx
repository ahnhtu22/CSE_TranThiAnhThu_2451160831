import { useState } from "react";

export default function FLowDemo() {
    console.log("🔄 Component render!");
    const [step, setStep] = useState(1);
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Luồng hoạt động</h2>
            <p>Bước hiện tại: {step}</p>
            <button onClick={() => setStep(step + 1)}>Bước tiếp theo →</button>
            <button onClick={() => setStep(1)}>Quay lại đầu</button>
        </div>
    );
}