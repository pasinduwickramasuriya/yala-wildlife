"use client";
import { FormEvent } from "react";

export default function LoginForm({ onSubmit, loading }: { onSubmit: (email: string, password: string) => void; loading?: boolean }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-2 border rounded"
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}