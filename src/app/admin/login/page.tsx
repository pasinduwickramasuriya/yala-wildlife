
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        router.push("/admin");
      } else {
        console.error("Login response status:", res.status);
        try {
          const data = await res.json();
          console.error("Login error data:", data);
          setError(data.error || "Login failed");
        } catch (jsonError) {
          console.error("Login error parsing JSON:", jsonError);
          const text = await res.text();
          console.error("Login raw response:", text);
          setError("Login failed (Server Error)");
        }
      }
    } catch (error) {
      console.error("Login fetch error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 bg-card shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-foreground">
          Admin Login
        </h1>
        {error && <p className="text-destructive mb-4">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}