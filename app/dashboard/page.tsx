import ProductsChart from "@/components/products-chart";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import {
  Package,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Plus,
  Zap,
  Warehouse,
  Users,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  /* ================== MONGODB FETCH ================== */
  const client = await clientPromise;
  const db = client.db("inventory");

  const products = await db
    .collection("products")
    .find({})
    .toArray();

  const totalProducts = products.length;

  const totalValue = products.reduce(
    (sum: number, p: any) =>
      sum + Number(p["Price"] || 0) * Number(p["Stock Quantity"] || 0),
    0
  );

  const lowStock = products.filter(
    (p: any) => Number(p["Stock Quantity"]) <= 5
  ).length;

  const inStock = products.filter(
    (p: any) => Number(p["Stock Quantity"]) > 5
  ).length;
  /* =================================================== */

  return (
    <div className="min-h-screen font-[poppins] antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      <Sidebar currentPath="/dashboard" />

      <main className="ml-64 p-8 lg:p-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl shadow-xl border border-white/50 rounded-3xl px-8 py-4 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse" />
            <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
              Inventory Management
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Package,
              value: totalProducts,
              label: "Products",
              color: "indigo-500",
            },
            {
              icon: DollarSign,
              value: `₹${totalValue.toLocaleString()}`,
              label: "Inventory Value",
              color: "emerald-500",
            },
            {
              icon: AlertTriangle,
              value: lowStock,
              label: "Low Stock",
              color: "amber-500",
            },
            {
              icon: Users,
              value: "0+",
              label: "Orders",
              color: "purple-500",
            },
          ].map((stat, i) => (
            <div key={i} className="group relative">
              <div className="bg-white/70 backdrop-blur-xl shadow-2xl border rounded-3xl p-8 h-full hover:-translate-y-2 transition-all">
                <stat.icon
                  className={`w-12 h-12 mx-auto mb-4 ${stat.color}`}
                />
                <div className="text-3xl font-black text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-600 uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Analytics */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl border rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                AI Analytics
              </h2>
              <p className="text-slate-600">
                Smart insights from your inventory
              </p>
            </div>
          </div>

          {totalProducts === 0 ? (
            <div className="text-center py-16">
              <Warehouse className="w-24 h-24 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-black text-slate-600">
                Ready for Your First Product
              </h3>
              <p className="text-slate-500 mb-8">
                Add products to unlock analytics
              </p>
              <a
                href="/add-product"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </a>
            </div>
          ) : (
            <ProductsChart />
          )}
        </div>

        {/* Stock Health */}
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl border rounded-3xl p-8">
          <h3 className="text-xl font-black mb-6">Stock Health</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-emerald-50 rounded-xl">
              <span>In Stock</span>
              <span className="font-bold text-emerald-700">
                {inStock} items
              </span>
            </div>
            <div className="flex justify-between p-3 bg-amber-50 rounded-xl">
              <span>Low Stock</span>
              <span className="font-bold text-amber-700">
                {lowStock} items
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
