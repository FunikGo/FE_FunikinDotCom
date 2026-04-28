import { useState } from "react";

/**
 * Komponen QnA
 * Menangani input pertanyaan dan pengiriman data ke API backend.
 */
export default function QnA() {
    const [question, setQuestion] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Validasi: Jangan biarkan input kosong atau hanya spasi
        if (!question.trim()) {
            setStatus("error");
            setMessage("Pertanyaan tidak boleh kosong ya!");
            return;
        }

        setStatus("sending");
        setMessage("");

        try {
            // Ganti "/api/questions" dengan URL lengkap backend jika berbeda domain
            const response = await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: question.trim(),
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Gagal mengirim pertanyaan.");
            }

            // Jika berhasil
            setQuestion("");
            setStatus("success");
            setMessage("Pertanyaan berhasil dikirim dan disimpan.");
        } catch (error) {
            setStatus("error");
            setMessage("Terjadi kesalahan, coba lagi nanti.");
            console.error("Submit Error:", error);
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, fontFamily: "sans-serif" }}>
            <h1 style={{ marginBottom: 8 }}>Ajukan Pertanyaan</h1>
            <p style={{ color: "#666", marginBottom: 24 }}>
                Punya masukan atau pertanyaan? Tulis di bawah ini.
            </p>
            
            <form onSubmit={handleSubmit}>
                <label 
                    htmlFor="question" 
                    style={{ fontWeight: "bold", display: "block", marginBottom: 8 }}
                >
                    Pertanyaan Anda
                </label>
                <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={6}
                    placeholder="Tulis pertanyaan tanpa perlu login..."
                    style={{ 
                        width: "100%", 
                        padding: 12, 
                        borderRadius: 8, 
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        fontSize: "16px",
                        marginBottom: 16 
                    }}
                />

                <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: status === "sending" ? "#ccc" : "#1f8ef1",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: status === "sending" ? "not-allowed" : "pointer",
                        transition: "background-color 0.2s"
                    }}
                >
                    {status === "sending" ? "Sedang Mengirim..." : "Kirim Pertanyaan"}
                </button>
            </form>

            {message && (
                <div style={{ 
                    marginTop: 20, 
                    padding: 12, 
                    borderRadius: 6,
                    backgroundColor: status === "error" ? "#ffebee" : "#e8f5e9",
                    color: status === "error" ? "#d32f2f" : "#2e7d32",
                    border: `1px solid ${status === "error" ? "#ffcdd2" : "#c8e6c9"}`
                }}>
                    {message}
                </div>
            )}
        </div>
    );
}