// import type { NextApiRequest, NextApiResponse } from "next";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";
export default async function handler(req, res) {
    const { query, method } = req;
    if (method !== "POST") {
        res.status(405).json("Method not allowed");
        return;
    }
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });
    const bucket = storage.bucket(process.env.BUCKET_NAME);
    const file = bucket.file(query.file);
    const options = {
        expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
        fields: { "x-goog-meta-source": "nextjs-project" },
    };
    const [response] = await file.generateSignedPostPolicyV4(options);
    res.status(200).json(response);
}