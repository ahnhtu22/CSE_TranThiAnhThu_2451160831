import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
    return (
        <div class="profile">
    <h1>Hồ sơ cá nhân</h1>
    {/* <img src="photo.jpg" alt="Ảnh đại diện"> */}
    <table>
        <tr>
            <td>Họ tên:</td>
            <td>Minh</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>minh@example.com</td>
        </tr>
    </table>
</div>
    );
}

export default App;

