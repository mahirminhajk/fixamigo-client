import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const revalidationTypes = ["brand", "device", "all-devices"] as const;

export async function POST(req: NextRequest) {
  const { type, identifier, secret } = await req.json();

  // check secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
  // check type
  if (!revalidationTypes.includes(type)) {
    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  }
  // check identifier
  if (!identifier) {
    return NextResponse.json(
      { message: "Invalid identifier" },
      { status: 400 }
    );
  }

  try {
    // revalidate based on type
    switch (type) {
      case "brand":
        revalidateTag(`brand:${identifier}`);
        break;
      case "device":
        revalidateTag(`device:${identifier}`);
        break;
      case "all-devices":
        revalidateTag(`device`);
      default:
        break;
    }

    return NextResponse.json(
      { message: "Revalidated successfully", revalidated: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, revalidated: false },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Revalidation failed", revalidated: false },
        { status: 500 }
      );
    }
  }
}
