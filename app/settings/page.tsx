
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <>
      {/* ✅ Poppins Font */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen font-['Poppins'] antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden font-poppins">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-200/50 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
        </div>

        <Sidebar currentPath="/settings" />
        
        <main className="ml-64 p-8 lg:p-12 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl shadow-xl border border-white/50 rounded-3xl px-8 py-4">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse" />
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                  Account Settings
                </h1>
                <p className="text-slate-600 font-medium">Manage your profile, security & preferences</p>
              </div>
            </div>
          </div>

          {/* Settings Container */}
          <div className="max-w-6xl">
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8">
              {/* Stack AccountSettings with theme wrapper */}
              <div className="font-poppins">
                <AccountSettings fullPage />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
