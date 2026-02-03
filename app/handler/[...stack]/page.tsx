import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";

export default function Handler(props: unknown) {
  return (
    <>
      {/* Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen font-['Poppins'] antialiased relative overflow-hidden flex items-center justify-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[-2]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558618047-3c8c76bbb17e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/85 z-[-1]" />

        {/* Card wrapper */}
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10">
          {/* Branding */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-3 shadow-xl">
              IM
            </div>
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Inventory Management
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Secure authentication
            </p>
          </div>

          {/* ✅ STACK AUTH HANDLER (DO NOT MODIFY PROPS) */}
          <StackHandler
            fullPage
            app={stackServerApp}
            routeProps={props}
          />
        </div>
      </div>
    </>
  );
}
