"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/features/auth/api";
import { setToken } from "@/lib/token";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMut = useMutation({
    mutationFn: () => loginApi({ email, password }),
    onSuccess: async (res) => {
      if (!res.success) return alert(res.message || "Login failed");

      const token = res.data?.accessToken || res.data?.token;
      if (!token) return alert("Token bulunamadı. Login response kontrol.");

      setToken(token);

      await fetch("/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.push("/dashboard");
    },
    onError: () => alert("Login failed"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return alert("Email ve şifre zorunlu");
    loginMut.mutate();
  }

  return (
    <form onSubmit={onSubmit} className="min-h-dvh w-full bg-white">
      {/* 4K kontrolü + genel padding */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-0">
        {/* Logo */}
        <div className="pt-8 sm:pt-10 lg:pt-[40px] lg:pl-[135px]">
          <Image src="/assets/logo.png" alt="Fintech logo" width={107} height={30} priority />
        </div>

        {/* Form blok */}
        <div className="mt-10 sm:mt-12 lg:mt-[30px] lg:pl-[135px]">
          <div className="w-full max-w-[404px] mx-auto lg:mx-0 flex flex-col gap-[25px]">
            <div className="flex flex-col gap-[4px]">
              <h1 className="w-[105px] h-[37px] text-[30px] leading-[30px] font-semibold text-[#1B212D]">
                Sign In
              </h1>
              <p className="text-[14px] leading-[20px] text-[#78778B]">
                Welcome back! Please enter your details
              </p>
            </div>

            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-[2px]">
                <label className="text-[14px] font-medium text-[#1B212D]">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[44px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-[16px] text-[14px] text-[#1B212D] outline-none placeholder:text-[#9CA3AF] focus:border-[#C8EE44]"
                />
              </div>

              <div className="flex flex-col gap-[2px]">
                <label className="text-[14px] font-medium text-[#1B212D]">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[44px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-[16px] text-[14px] text-[#1B212D] outline-none placeholder:text-[#9CA3AF] focus:border-[#C8EE44]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              <button
                type="submit"
                disabled={loginMut.isPending}
                className="h-[44px] w-full rounded-[10px] bg-[#C8EE44] text-[14px] font-semibold text-[#1B212D] hover:brightness-95 active:brightness-90 disabled:opacity-60"
              >
                {loginMut.isPending ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                className="h-[44px] w-full rounded-[10px] border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#1B212D] flex items-center justify-center gap-[10px] hover:bg-[#F5F5F5]"
              >
                <Image src="/assets/Google.png" alt="Google" width={18} height={18} />
                Sign in with google
              </button>
            </div>

            <p className="pt-[5px] text-center text-[14px] text-[#9CA3AF]">
              Don&apos;t have an account?{" "}
              <span className="relative inline-flex flex-col items-center">
                <Link href="/signup" className="font-semibold text-[#1B212D] leading-none">
                  Sign up
                </Link>
                <Image src="/assets/Vector.png" alt="" width={48} height={5} className="mt-[2px]" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
