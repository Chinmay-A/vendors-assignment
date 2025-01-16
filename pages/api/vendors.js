import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("vendorDB");
  const collection = db.collection("vendors");

  if (req.method === "GET") {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    const vendors = await collection.find().skip(skip).limit(parseInt(limit)).toArray();
    res.status(200).json(vendors);
  } else if (req.method === "POST") {
    const vendor = req.body;
    const result = await collection.insertOne(vendor);
    res.status(201).json({ id: result.insertedId, ...vendor });
  } else {
    res.status(405).end();
  }
}
