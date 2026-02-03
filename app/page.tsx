import ProductsChart from "@/components/products-chart";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Zap, 
  Warehouse,
  Users 
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  // Empty state for new users
  const totalProducts = 0;
  const totalValue = 0;
  const lowStock = 0;
  const recent = [];

  return (
    <div className="min-h-screen font-[poppins] antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Subtle geometric background - Tailwind only */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      <Sidebar currentPath="/dashboard" />
      
      <main className="ml-64 p-8 lg:p-12 relative z-10">
        {/* Modern Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl shadow-xl border border-white/50 rounded-3xl px-8 py-4 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse" />
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                Inventory Hub
              </h1>
            
            </div>
          </div>
        </div>

        {/* 2026 Modern Stats - Neumorphic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Package, value: totalProducts, label: "Products", color: "indigo-500" },
            { icon: DollarSign, value: `₹${totalValue.toLocaleString()}`, label: "Inventory Value", color: "emerald-500" },
            { icon: AlertTriangle, value: lowStock, label: "Low Stock", color: "amber-500" },
            { icon: Users, value: "0+", label: "Orders", color: "purple-500" }
          ].map((stat, i) => (
            <div key={i} className="group relative">
              <div className={`bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 hover:border-indigo-200/60 rounded-3xl p-8 h-full transform hover:-translate-y-2 hover:shadow-3xl transition-all duration-500 ${i === 0 ? 'ring-4 ring-indigo-100/50' : ''}`}>
                <stat.icon className={`w-12 h-12 mx-auto mb-4 opacity-75 group-hover:scale-110 transition-transform duration-300 ${stat.color}`} />
                <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Dual Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* AI-Powered Analytics Card */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8 xl:col-span-2 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 drop-shadow-lg">AI Analytics</h2>
                <p className="text-slate-600">Smart insights when you add products</p>
              </div>
            </div>
            
            {/* Empty Analytics */}
            <div className="text-center py-20">
              <Warehouse className="w-24 h-24 text-slate-400 mx-auto mb-8 opacity-50" />
              <h3 className="text-2xl font-black text-slate-500 mb-4">Ready for Your First Product</h3>
              <p className="text-lg text-slate-600 mb-12 max-w-md mx-auto leading-relaxed">
                Add inventory items to unlock AI-powered insights, stock predictions, and automated reorder alerts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products" className="group bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 justify-center">
                  <Plus className="w-5 h-5" />
                  Add Product
                </a>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-xl border-2 border-indigo-200 hover:border-indigo-300 text-slate-800 font-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 justify-center">
                  <TrendingUp className="w-5 h-5" />
                  View Demo
                </button>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-md">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Products</h3>
                  <p className="text-sm text-slate-600">Manage your inventory</p>
                </div>
              </div>
            </div>
            
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Package className="w-12 h-12 text-slate-400" />
              </div>
              <h4 className="text-lg font-bold text-slate-600 mb-2">No Products Yet</h4>
              <p className="text-slate-500 mb-8">Start by adding your first inventory item</p>
              <div className="grid grid-cols-2 gap-4 opacity-40 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-pulse" />
                ))}
              </div>
              <a href="/products" className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-4 px-6 rounded-2xl font-black shadow-xl hover:shadow-amber-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Add
              </a>
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Stock Health</h3>
                <p className="text-sm text-slate-600">Inventory efficiency</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full shadow-inner" />
                <div className="absolute inset-2 bg-white/90 rounded-full backdrop-blur-xl flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-black text-slate-600">0%</div>
                    <div className="text-sm text-slate-500 font-medium">Optimal</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                    <span>In Stock</span>
                  </div>
                  <span className="font-bold text-emerald-700">0 items</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full" />
                    <span>Low Stock</span>
                  </div>
                  <span className="font-bold text-amber-700">0 items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
