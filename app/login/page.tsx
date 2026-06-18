"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0a",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        background: "#1a1a1a",
        borderRadius: 16,
        padding: "40px 32px",
        width: 320,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
          <div style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>Archie Prototype</div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>Enter the password to continue</div>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          style={{
            background: "#2a2a2a",
            border: error ? "1px solid #ff4444" : "1px solid #333",
            borderRadius: 8,
            padding: "12px 16px",
            color: "#fff",
            fontSize: 16,
            outline: "none",
          }}
          autoFocus
        />
        {error && <div style={{ color: "#ff4444", fontSize: 13, textAlign: "center" }}>Incorrect password</div>}
        <button
          onClick={submit}
          style={{
            background: "#0050FF",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 16px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
