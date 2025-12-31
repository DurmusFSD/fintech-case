"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/features/auth/api";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMut = useMutation({
    mutationFn: () => registerApi({ name, email, password }),
    onSuccess: (res) => {
      if (res.success) {
        router.push("/signin");
      } else {
        alert(res.message || "Register failed");
      }
    },
    onError: () => alert("Register failed"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) return alert("Tüm alanlar zorunlu");
    registerMut.mutate();
  }

  return (
    <form onSubmit={onSubmit} className="relative h-full w-full overflow-hidden bg-white">
      <div className="absolute top-[40px] left-[135px]">
        <Image
          src="/assets/logo.png"
          alt="Fintech logo"
          width={107}
          height={30}
          priority
        />
      </div>

      <div className="absolute top-[100px] left-[135px] w-[404px] flex flex-col gap-[25px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="w-[285px] h-[37px] text-[30px] leading-[30px] font-semibold text-[#1B212D]">
            Create new account
          </h1>
          <p className="text-[14px] leading-[20px] text-[#78778B]">
            Welcome back! Please enter your details
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[2px]">
            <label className="text-[14px] font-medium text-[#1B212D]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Mahfuzul Nabil"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[44px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-[16px] text-[14px] text-[#1B212D] outline-none placeholder:text-[#9CA3AF] focus:border-[#C8EE44]"
            />
          </div>

          <div className="flex flex-col gap-[2px]">
            <label className="text-[14px] font-medium text-[#1B212D]">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[44px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-[16px] text-[14px] text-[#1B212D] outline-none placeholder:text-[#9CA3AF] focus:border-[#C8EE44]"
            />
          </div>

          <div className="flex flex-col gap-[2px]">
            <label className="text-[14px] font-medium text-[#1B212D]">
              Password
            </label>
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
            disabled={registerMut.isPending}
            className="h-[44px] w-full rounded-[10px] bg-[#C8EE44] text-[14px] font-semibold text-[#1B212D] hover:brightness-95 active:brightness-90 disabled:opacity-60"
          >
            {registerMut.isPending ? "Creating..." : "Sign Up"}
          </button>

          <button
            type="button"
            className="h-[44px] w-full rounded-[10px] border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#78778B] flex items-center justify-center gap-[10px] hover:bg-[#F5F5F5]"
          >
            <Image src="/assets/Google.png" alt="Google" width={18} height={18} />
            Sign in with google
          </button>
        </div>

        <p className="pt-[5px] text-center text-[14px] text-[#9CA3AF]">
          Already have an account?{" "}
          <span className="relative inline-flex flex-col items-center">
            <Link href="/signin" className="font-semibold text-[#1B212D] leading-none">
              Sign in
            </Link>
            <Image src="/assets/Vector.png" alt="" width={48} height={5} className="mt-[2px]" />
          </span>
        </p>
      </div>
    </form>
  );
}
