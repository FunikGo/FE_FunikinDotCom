import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //
import { AccordionSub, type AccordionItemData } from './elements/Accordion';

// --- DATA FAQ ---
const FaQ: AccordionItemData[] = [
  {
    value: 'Info',
    trigger: 'Apa itu FunikIn?',
    content: 'FunikIn adalah platform digital untuk berbagi pengalaman dan mendapatkan informasi terkini.'
  },
  {
    value: 'Tutor',
    trigger: 'Bagaimana cara mendaftar?',
    content: 'Anda dapat mendaftar melalui halaman utama dengan mengklik tombol Sign Up dan mengisi formulir yang tersedia.'
  },
  {
    value: 'Tarif',
    trigger: 'Apakah FunikIn gratis?',
    content: 'Ya, FunikIn menyediakan layanan gratis untuk semua pengguna dengan fitur-fitur dasar.'
  },
  {
    value: 'Support',
    trigger: 'Bagaimana cara menghubungi support?',
    content: 'Anda dapat menghubungi tim support kami melalui email support@funikin.com atau chat langsung di aplikasi.'
  }
];

// --- KOMPONEN HALAMAN FAQ ---
function FaqPage() {
  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <AccordionSub items={FaQ} />
    </main>
  );
}

// --- KOMPONEN HALAMAN INPUT QnA ---
function QnAPage() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) {
      setStatus("error");
      setMessage("Pertanyaan tidak boleh kosong ya!");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Gagal mengirim pertanyaan.");

      setQuestion("");
      setStatus("success");
      setMessage("Pertanyaan berhasil dikirim dan disimpan.");
    } catch (error) {
      setStatus("error");
      setMessage("Terjadi kesalahan, coba lagi nanti.");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1>Ajukan Pertanyaan</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={6}
          placeholder="Tulis pertanyaan..."
          style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", marginBottom: 16 }}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          style={{ padding: "12px 24px", backgroundColor: "#1f8ef1", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          {status === "sending" ? "Mengirim..." : "Kirim"}
        </button>
      </form>
      {message && <div style={{ marginTop: 20 }}>{message}</div>}
    </div>
  );
}

// --- MAIN APP DENGAN ROUTING ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman FAQ (Default/Home) */}
        <Route path="/" element={<FaqPage />} />
        
        {/* Halaman Input QnA (Direct Link funikin.com/qna) */}
        <Route path="/qna" element={<QnAPage />} />
        
        {/* Fallback jika link salah */}
        <Route path="*" element={<FaqPage />} />
      </Routes>
    </BrowserRouter>
  );
}