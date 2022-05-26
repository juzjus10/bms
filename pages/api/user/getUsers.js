import clientPromise from "../../../lib/mongodb";
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
    const collection = db.collection("accounts");
    // filter document with active status 
    const users = await collection.find({ status: "active" }).toArray();
    // If there is error, return error message
    if (users.length === 0) {
        res.statusCode = 404;
        res.json({ message: "No User record found." });
        return;
    }
    // If there is no error, return the data
    res.statusCode = 200;
    return res.json(users);

   

}