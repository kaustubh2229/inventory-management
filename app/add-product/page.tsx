import Sidebar from "@/components/sidebar";
import { createProduct } from "@/lib/actions/products";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="min-h-screen font-[poppins] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl" />
      </div>

      <Sidebar currentPath="/add-product" />

      <main className="ml-64 p-10 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Add Product to Inventory
          </h1>
          <p className="text-slate-600">
            This product will be saved in MongoDB and reflected everywhere
          </p>
        </div>

        {/* Form Card */}
        <form
          action={createProduct}
          className="max-w-4xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 space-y-8"
        >
          {/* BASIC INFO */}
          <Section title="Basic Information">
            <Input name="Product Name" label="Product Name" required />
            <Input name="Product Category" label="Product Category" required />
            <Input
              name="Product Description"
              label="Product Description"
              required
            />
          </Section>

          {/* INVENTORY */}
          <Section title="Inventory & Pricing">
            <Grid>
              <Input
                name="Price"
                label="Price (₹)"
                type="number"
                step="0.01"
                required
              />
              <Input
                name="Stock Quantity"
                label="Stock Quantity"
                type="number"
                required
              />
              <Input
                name="Warranty Period"
                label="Warranty Period (Years)"
                type="number"
              />
              <Input
                name="Product Ratings"
                label="Product Ratings (0–5)"
                type="number"
                min="0"
                max="5"
              />
            </Grid>
          </Section>

          {/* DETAILS */}
          <Section title="Product Details">
            <Grid>
              <Input
                name="Product Dimensions"
                label="Dimensions (e.g. 16x15x15 cm)"
              />
              <Input name="SKU" label="SKU" />
              <Input
                name="Color/Size Variations"
                label="Color / Size Variations"
              />
              <Input
                name="Product Tags"
                label="Product Tags (comma separated)"
              />
            </Grid>
          </Section>

          {/* DATES */}
          <Section title="Lifecycle Dates">
            <Grid>
              <Input
                name="Manufacturing Date"
                label="Manufacturing Date"
                type="date"
                required
              />
              <Input
                name="Expiration Date"
                label="Expiration Date"
                type="date"
                required
              />
            </Grid>
          </Section>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-4 rounded-2xl font-black shadow-xl transition-all"
            >
              Save Product to Database
            </button>

            <Link
              href="/inventory"
              className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-700 shadow hover:shadow-lg transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ================== UI HELPERS ================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Input({
  label,
  name,
  type = "text",
  ...props
}: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white shadow-inner"
        {...props}
      />
    </div>
  );
}
