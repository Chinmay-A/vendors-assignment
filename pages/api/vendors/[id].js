import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("vendorDB");
  const collection = db.collection("vendors");
  const { id } = req.query;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    if (req.method === "GET") {
      const vendor = await collection.findOne({ _id: new ObjectId(id) });
      if (!vendor) return res.status(404).json({ error: "Vendor not found" });
      res.status(200).json(vendor);
    } else if (req.method === "PUT") {
      const updatedVendor = { ...req.body };
      delete updatedVendor._id;

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedVendor }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Vendor not found or no changes made" });
      }
      res.status(200).json({ message: "Vendor updated successfully" });
    } else if (req.method === "DELETE") {
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Vendor not found" });
      }
      res.status(200).json({ message: "Vendor deleted successfully" });
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error handling vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
