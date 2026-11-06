import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

function isFileUpload(file: FormDataEntryValue | null): file is File {
  return (
    typeof file === "object" &&
    file !== null &&
    typeof file.arrayBuffer === "function" &&
    typeof file.size === "number" &&
    typeof file.type === "string"
  );
}

function matchesAllowed(type: string, buffer: Buffer): boolean {
  if (type === "image/jpeg") {
    return buffer.length > 2 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (type === "image/png") {
    return buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (type === "image/webp") {
    return (
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  if (type === "image/avif") {
    return (
      buffer.subarray(4, 8).toString("ascii") === "ftyp" &&
      ["avif", "avis"].includes(buffer.subarray(8, 12).toString("ascii"))
    );
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must be multipart/form-data",
        },
        { status: 400 }
      );
    }
    if (!/boundary=.+/i.test(contentType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Content-Type must include a multipart boundary",
        },
        { status: 400 }
      );
    }

    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid multipart form-data",
        },
        { status: 400 }
      );
    }

    const file = formData.get("file");

    if (!isFileUpload(file)) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    if (bytes.length === 0) {
      return NextResponse.json(
        { success: false, message: "File is empty" },
        { status: 400 }
      );
    }

    if (bytes.length > MAX_BYTES) {
      return NextResponse.json(
        { success: false, message: "Image must be 5MB or smaller" },
        { status: 413 }
      );
    }

    const ext = ALLOWED[file.type];
    if (!ext || !matchesAllowed(file.type, bytes)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported file type. Use JPG, PNG, WebP or AVIF.",
        },
        { status: 415 }
      );
    }

    const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;
    const hasBlobCredentials = Boolean(
      process.env.BLOB_READ_WRITE_TOKEN ||
        (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)
    );

    if (hasBlobCredentials) {
      const blob = await put(`uploads/${uniqueName}`, bytes, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({
        success: true,
        url: blob.url,
      });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, uniqueName), bytes);

    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Upload failed" },
      { status: 500 }
    );
  }
}
