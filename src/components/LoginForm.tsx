"use client";
import { FormEvent } from "react";

export default function LoginForm({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
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
        />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Login
      </button>
    </form>
  );
}