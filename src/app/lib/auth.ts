
import { betterAuth } from "better-auth";
import { MongoClient, Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client: MongoClient = new MongoClient(process.env.MONGO_DB_URL!);

const db: Db = client.db("bazardor");

export const auth = betterAuth({
    emailAndPassword:{
        enabled:true
    },
  database: mongodbAdapter(db, {
    client,
  }),
});

