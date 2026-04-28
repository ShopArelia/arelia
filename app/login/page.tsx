"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError("Invalid email or password.");
            setLoading(false);
            return;
        }

        router.push("/admin/blogs");
    };

    return (
    <div className="min-h-screen bg-primary-400 flex items-center justify-center px-6">
 
      {/* Decorative rings */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-primary-100/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[900px] h-[900px] rounded-full border border-primary-100/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
 
      <div className="relative z-10 w-full max-w-[400px]">
 
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
            <path d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6.1V17h8v-1.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z"/>
            <circle cx="7" cy="4" r="1.5" fill="white" stroke="none"/>
            <circle cx="17" cy="4" r="1.5" fill="white" stroke="none"/>
          </svg>
          <span className="font-serif text-[1.2rem] text-white">Arelia</span>
        </div>
 
        {/* Card */}
        <div className="bg-surface-50 rounded-lg p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <h1 className="font-serif text-[22px] font-normal tracking-[-0.01em] text-surface-400 mb-1">
            Admin sign in
          </h1>
          <p className="text-[13px] text-surface-300 mb-7">
            Access the Arelia content dashboard.
          </p>
 
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[12px] font-medium text-surface-300 tracking-[0.02em]">
                Email
              </label>
              <input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@arelia.org" required
                className="px-3.5 py-2.5 text-[14px] border border-surface-100 rounded-md] bg-white text-surface-400 outline-none placeholder:text-surface-200 focus:border-primary-300 focus:ring-[3px] focus:ring-primary-300/10 transition-all"
              />
            </div>
 
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-[12px] font-medium text-surface-300 tracking-[0.02em]">
                Password
              </label>
              <input
                id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="px-3.5 py-2.5 text-[14px] border border-surface-100 rounded-md bg-white text-surface-400 outline-none placeholder:text-surface-200 focus:border-primary-300 focus:ring-[3px] focus:ring-primary-300/10 transition-all"
              />
            </div>
 
            {error && (
              <p className="text-[13px] text-red-600">{error}</p>
            )}
 
            <button
              type="submit" disabled={loading}
              className="mt-2 w-full py-2.5 rounded-full text-[13px] font-medium text-white bg-primary-300 shadow-[0_2px_0_#2D5016,0_4px_12px_rgba(45,80,22,0.25)] hover:shadow-[0_3px_0_#2D5016,0_6px_16px_rgba(45,80,22,0.3)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}