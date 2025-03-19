import { NextResponse, NextRequest } from "next/server";
import B2 from 'backblaze-b2';

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
  retry: {
    retries: 3 // this is the default
    // for additional options, see https://github.com/softonic/axios-retry
  }
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const filePath = formData.get("filePath") as string;

    if (!file || !filePath) {
      return NextResponse.json({ error: "Missing file or filePath" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: authData } = await b2.authorize();
    const { data: uploadData } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID,
    });

    const { data } = await b2.uploadFile({
      uploadUrl: uploadData.uploadUrl,
      uploadAuthToken: uploadData.authorizationToken,
      fileName: filePath,
      data: buffer,
      contentLength: buffer.length,
      mime: file.type,
    });

    console.log("Upload successful:", data);

    const downloadURL = authData.downloadUrl;

    return NextResponse.json({
      success: true,
      path: `${downloadURL}/file/harryGraphics/${data.fileName}?timestamp=${data.uploadTimestamp}`,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
