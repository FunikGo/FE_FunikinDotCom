import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom' // Tambahkan ini
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import QnA from './QnA' // Import komponen QnA yang sudah kita buat tadi
import './App.css'

// Komponen Home (isi asli App kamu)
function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate(); // Gunakan hook ini untuk navigasi internal

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        {/* PERBAIKAN DI SINI: Pakai navigate() bukan window.location */}
        <button
          type="button"
          className="nav-button"
          onClick={() => navigate('/qna')}
          style={{ marginLeft: '10px', backgroundColor: '#646cff' }}
        >
          Masuk QnA
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                Explore Vite
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

// Komponen Utama App untuk mengatur Routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qna" element={<QnA />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App