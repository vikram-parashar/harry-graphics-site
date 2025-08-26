import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'
import crypto from "crypto";
import { createClient } from '@/supabase/utils/server';

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  }
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!

function generateFileName(originalName: string) {
  const ext = originalName.split(".").pop();
  const random = crypto.randomUUID();
  return `${random}.${ext}`;
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get('content-type') || ''

  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  let filePath = formData.get('filePath') as string
  filePath = `${filePath}/${generateFileName(file.name)}`

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    await R2.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filePath,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const fileUrl = `${process.env.R2_PUB_URL}/${filePath}`

    return NextResponse.json({ success: true, path: fileUrl }, { status: 200 })
  } catch (error) {
    console.error('Upload failed:', error)
    return NextResponse.json({ success: false, msg: JSON.stringify(error) }, { status: 500 })
  }
}

