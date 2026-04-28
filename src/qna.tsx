import { useState } from "react";

export default function QnA() {
    const [question, setQuestion] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!question.trim()) {
            setMessage("Silakan tulis pertanyaan Anda terlebih dahulu.");
            setStatus("error");
            return;
        }

        setStatus("sending");
        setMessage("");

        try {
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

            setQuestion("");
            setStatus("success");
            setMessage("Pertanyaan berhasil dikirim dan disimpan.");
        } catch (error) {
            setStatus("error");
            setMessage("Terjadi kesalahan, coba lagi nanti.");
            console.error(error);
        }
    }

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
            <h1>Ajukan Pertanyaan</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Pertanyaan Anda</label>
                <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={6}
                    placeholder="Tulis pertanyaan tanpa perlu login..."
                    style={{ width: "100%", padding: 12, marginTop: 8, marginBottom: 16 }}
                />

                <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                        padding: "10px 18px",
                        backgroundColor: "#1f8ef1",
                        color: "#fff",
                        border: "none",
                        cursor: status === "sending" ? "not-allowed" : "pointer",
                    }}
                >
                    {status === "sending" ? "Mengirim..." : "Kirim Pertanyaan"}
                </button>
            </form>

            {message && (
                <p style={{ marginTop: 16, color: status === "error" ? "#d32f2f" : "#1b5e20" }}>
                    {message}
                </p>
            )}
        </div>
    );
}