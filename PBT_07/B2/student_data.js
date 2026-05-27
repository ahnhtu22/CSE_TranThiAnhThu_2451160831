const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let rankCounts = { Gioi: 0, Kha: 0, TB: 0, Yeu: 0 };
let maxAvg = -1, minAvg = 11;
let bestStudent = "", worstStudent = "";
let sumMath = 0, sumPhysics = 0, sumCs = 0;
let sumMaleAvg = 0, sumFemaleAvg = 0, maleCount = 0, femaleCount = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let st = students[i];
    
    // 1. Tính điểm TB
    let avg = (st.math * 0.4) + (st.physics * 0.3) + (st.cs * 0.3);
    avg = Math.round(avg * 10) / 10;
    
    // 2. Xếp loại & 4. Đếm số SV
    let rank = "";
    if (avg >= 8.0) { rank = "Giỏi"; rankCounts.Gioi++; }
    else if (avg >= 6.5) { rank = "Khá"; rankCounts.Kha++; }
    else if (avg >= 5.0) { rank = "Trung bình"; rankCounts.TB++; }
    else { rank = "Yếu"; rankCounts.Yeu++; }
    
    // 3. In bảng
    console.log(`| ${String(i+1).padEnd(3)} | ${st.name.padEnd(6)} | ${String(avg).padEnd(4)} | ${rank.padEnd(11)} |`);
    
    // 5. Min, Max
    if (avg > maxAvg) { maxAvg = avg; bestStudent = st.name; }
    if (avg < minAvg) { minAvg = avg; worstStudent = st.name; }
    
    // 6. Tổng điểm từng môn để tính TB
    sumMath += st.math;
    sumPhysics += st.physics;
    sumCs += st.cs;
    
    // 7. Bonus: TB theo giới tính
    if (st.gender === "M") { sumMaleAvg += avg; maleCount++; }
    else { sumFemaleAvg += avg; femaleCount++; }
}

// In thống kê
console.log("\n--- THỐNG KÊ ---");
console.log(`Số lượng: Giỏi (${rankCounts.Gioi}), Khá (${rankCounts.Kha}), TB (${rankCounts.TB}), Yếu (${rankCounts.Yeu})`);
console.log(`Thủ khoa: ${bestStudent} (${maxAvg}) - Đội sổ: ${worstStudent} (${minAvg})`);
console.log(`Điểm TB môn học: Toán (${(sumMath/students.length).toFixed(1)}), Lý (${(sumPhysics/students.length).toFixed(1)}), CS (${(sumCs/students.length).toFixed(1)})`);
console.log(`Điểm TB theo giới tính: Nam (${(sumMaleAvg/maleCount).toFixed(1)}), Nữ (${(sumFemaleAvg/femaleCount).toFixed(1)})`);