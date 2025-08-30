import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  }
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!

export async function POST(req: NextRequest) {
  const { keys } = await req.json(); // expects: { keys: ["img1.jpg", "img2.jpg"] }

  if (!Array.isArray(keys) || keys.length === 0) {
    return NextResponse.json({ error: 'No keys provided' }, { status: 400 });
  }

  try {
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
        Quiet: false,
      },
    });

    const result = await R2.send(deleteCommand);

    return NextResponse.json({ deleted: result.Deleted, errors: result.Errors || [] });
  } catch (error) {
    console.error('Upload failed:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

