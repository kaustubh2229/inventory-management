import { SignIn } from "@stackframe/stack";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

export default function SignInPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen grid lg:grid-cols-2 font-['Poppins'] antialiased relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618047-3c8c76bbb17e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/80 z-0" />

        {/* Left Side */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 lg:p-20 relative z-10">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 text-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-4 shadow-2xl">
              IM
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-4">
              Inventory Management
            </h1>
            <p className="text-xl text-slate-200 font-semibold">
              Your Ideal Partner
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center py-12 px-6 lg:px-16 relative z-10">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-white mb-2">
                Welcome back!
              </h2>
              <p className="text-slate-300 text-lg">
                Please sign in to your account
              </p>
            </div>

            {/* ✅ THIS IS THE KEY FIX */}
            <div className="bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 shadow-2xl">
              <SignIn automaticRedirect />
            </div>

            <div className="mt-8 flex flex-col gap-4 text-center">
              <Link
                href="/sign-up"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-black py-4 rounded-xl text-lg shadow-xl"
              >
                Create Account
              </Link>

              <Link
                href="/"
                className="text-slate-300 hover:text-yellow-400 font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back Home
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20 flex items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                End-to-end encryption
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Secure login
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
