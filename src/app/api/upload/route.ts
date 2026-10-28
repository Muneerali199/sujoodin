import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

    const formData = await req.formData();
    const file = formData.get("file");

    if (!isFileUpload(file)) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, message: "File is empty" },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, message: "Image must be 5MB or smaller" },
        { status: 413 }
      );
    }

    const ext = ALLOWED[file.type];
    if (!ext) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported file type. Use JPG, PNG, WebP or AVIF.",
        },
        { status: 415 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uniqueName = `${Date.now()}-${randomUUID()}.${ext}`;
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
