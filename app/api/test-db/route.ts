import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("inventory");

    const collections = await db.listCollections().toArray();

    return Response.json({
      status: "✅ Connected",
      collections,
    });
  } catch (error: any) {
    return Response.json({
      status: "❌ Connection Failed",
      error: error.message,
    });
  }
}
