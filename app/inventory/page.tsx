import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { deleteProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const user = await getCurrentUser();

  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = 5;

  /* ================== MONGODB FETCH ================== */
  const client = await clientPromise;
  const db = client.db("inventory");

  const filter: any = {};
  if (q) {
    filter["Product Name"] = { $regex: q, $options: "i" };
  }

  const totalCount = await db
    .collection("products")
    .countDocuments(filter);

  const rawProducts = await db
    .collection("products")
    .find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  // 🔁 MAP DATASET FIELDS → UI FIELDS
  const products = rawProducts.map((p: any) => ({
    _id: p._id,
    name: p["Product Name"],
    sku: p["SKU"],
    price: p["Price"],
    quantity: p["Stock Quantity"],
    lowStockAt: 5,
    createdAt: p["Manufacturing Date"]
      ? new Date(p["Manufacturing Date"])
      : new Date(),
  }));

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  /* ================================================== */

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen font-['poppins'] antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <Sidebar currentPath="/inventory" />

        <main className="ml-64 p-8 lg:p-12 relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl shadow-xl border border-white/50 rounded-3xl px-8 py-4">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <div>
                <h1 className="text-3xl font-black">
                  Inventory Management
                </h1>
                <p className="text-slate-600 font-medium">
                  Manage products & track stock levels ({totalCount} items)
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl border rounded-3xl p-8 mb-8">
            <form className="flex gap-4" action="/inventory" method="GET">
              <input
                name="q"
                defaultValue={q}
                placeholder="Search products by name..."
                className="flex-1 px-5 py-4 rounded-2xl border"
              />
              <button className="bg-indigo-600 text-white px-8 rounded-2xl font-bold">
                Search
              </button>
            </form>
          </div>

          {/* Products */}
          {products.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-xl">
              <h3 className="text-2xl font-black text-slate-900">
                No Products Found
              </h3>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-xl shadow-2xl border rounded-3xl p-8">
              <h2 className="text-2xl font-black mb-6">
                Products ({totalCount})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => {
                  const isLowStock =
                    product.quantity <= product.lowStockAt;

                  return (
                    <div
                      key={product._id.toString()}
                      className="group bg-white rounded-3xl p-6 shadow-xl"
                    >
                      <div className="flex justify-between mb-3">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            isLowStock
                              ? "bg-orange-400 animate-pulse"
                              : "bg-emerald-400"
                          }`}
                        />

                        <form
                          action={async (formData) => {
                            "use server";
                            await deleteProduct(formData);
                          }}
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={product._id.toString()}
                          />
                          <button className="text-red-600 text-sm">
                            Delete
                          </button>
                        </form>
                      </div>

                      <h3 className="font-bold text-xl mb-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-slate-600 mb-2">
                        SKU: {product.sku || "N/A"}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-black">
                          ₹{Number(product.price).toLocaleString()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            isLowStock
                              ? "bg-orange-100 text-orange-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {product.quantity} units
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-3">
                        Added on{" "}
                        {new Date(
                          product.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 bg-white rounded-3xl p-6 shadow-xl">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/inventory"
                searchParams={{ q }}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
