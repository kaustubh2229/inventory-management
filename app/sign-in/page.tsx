import { SignIn } from "@stackframe/stack";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

export default async function SignInPage() {
  const user = await stackServerApp.getUser();
  if (user) {
    redirect("/dashboard");
  }

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

        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 lg:p-20 relative z-10">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 text-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-4 shadow-2xl">
              IM
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-6">
              Inventory Management
            </h1>
            <p className="text-xl text-slate-200 font-semibold">
              Your Ideal Partner
            </p>
          </div>

          <div className="space-y-6 max-w-sm w-full">
            {[
              {
                title: "Stay Organized",
                desc: "Control everything under one roof",
              },
              {
                title: "Get All Stats",
                desc: "Control your data with one click",
              },
              {
                title: "Access Anywhere",
                desc: "Everything secured first",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                <div>
                  <h3 className="font-black text-lg text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Sign In */}
        <div className="flex flex-col items-center justify-center py-12 px-6 lg:px-16 relative z-10">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">
                Welcome back!
              </h2>
              <p className="text-slate-300 text-lg font-medium">
                Please sign in to your account
              </p>
            </div>

            {/* ✅ FIXED: SignIn has NO custom props */}
            <div className="bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 shadow-2xl">
              <SignIn />
            </div>

            <div className="mt-8 flex flex-col gap-4 text-center">
              <Link
                href="/sign-up"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-black py-4 px-8 rounded-xl text-lg shadow-xl transition-all duration-300"
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
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Secure login</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}