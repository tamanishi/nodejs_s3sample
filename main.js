import "dotenv/config";
import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const credential = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

const bucketName = process.env.BUCKET_NAME;

const listObject = async () => {
    const list = await s3.send(new ListObjectsV2Command({
        Bucket: bucketName,
        MaxKeys: 100
    }));

    console.log("========");
    list.Contents.forEach(e => console.log(e.Key));
    console.log("========");
}

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: credential
});

await s3.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: "testObject.txt",
    Body: "hoge"
}));

await listObject();

await s3.send(new DeleteObjectCommand({
    Bucket: bucketName,
    Key: "testObject.txt"
}));

await listObject();

