import clientPromise from "../../lib/mongodb";
import { getSession } from "next-auth/react";

export default async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 401;
        res.json({ message: "You are not signed in." });
        return;
    }
    const client = await clientPromise;
    const db = client.db("barangayDB");
    const collection = db.collection("resident");
    // filter document with active status 
    const residents = await collection.find({ status: "active" }).toArray();
    return res.json(residents);

}