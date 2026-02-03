"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { revalidatePath } from "next/cache";

/* ================= VALIDATION SCHEMA ================= */

const ProductSchema = z.object({
  "Product Name": z.string().min(1),
  "Product Category": z.string().min(1),
  "Product Description": z.string().min(1),

  Price: z.coerce.number().min(0),
  "Stock Quantity": z.coerce.number().min(0),

  "Warranty Period": z.coerce.number().optional(),
  "Product Dimensions": z.string().optional(),

  "Manufacturing Date": z.string(),
  "Expiration Date": z.string(),

  SKU: z.string().optional(),
  "Product Tags": z.string().optional(),
  "Color/Size Variations": z.string().optional(),

  "Product Ratings": z.coerce.number().min(0).max(5).optional(),
});

/* ================= CREATE PRODUCT ================= */

export async function createProduct(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  const parsed = ProductSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Create product validation error:", parsed.error.flatten());
    throw new Error("Validation failed");
  }

  const data = parsed.data;

  const client = await clientPromise;
  const db = client.db("inventory");

  await db.collection("products").insertOne({
    ...data,
    Price: Number(data.Price),
    "Stock Quantity": Number(data["Stock Quantity"]),
    "Warranty Period": data["Warranty Period"]
      ? Number(data["Warranty Period"])
      : null,
    "Product Ratings": data["Product Ratings"]
      ? Number(data["Product Ratings"])
      : null,
    "Manufacturing Date": new Date(data["Manufacturing Date"]),
    "Expiration Date": new Date(data["Expiration Date"]),
    createdAt: new Date(),
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}

/* ================= DELETE PRODUCT ================= */

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    throw new Error("Invalid product ID");
  }

  const client = await clientPromise;
  const db = client.db("inventory");

  await db.collection("products").deleteOne({
    _id: new ObjectId(id),
  });

  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}
