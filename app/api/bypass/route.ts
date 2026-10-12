import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, message: "URL wajib diisi" },
        { status: 400 }
      );
    }

    const endpoint =
      process.env.BYPASS_API_ENDPOINT ||
      "https://api.jerexd.my.id/api/tools/bypasslink";
    const apiKey = process.env.BYPASS_API_KEY || "JFEURiaeiCC2pd63";

    const targetApiUrl = new URL(endpoint);
    targetApiUrl.searchParams.set("apikey", apiKey);
    targetApiUrl.searchParams.set("url", url);

    const apiResponse = await fetch(targetApiUrl.toString(), {
      method: "GET",
      headers: {
        "User-Agent": "BypassLink-Client/1.0",
      },
      cache: "no-store",
    });

    if (!apiResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `Gagal menghubungi penyedia bypass (HTTP ${apiResponse.status})`,
        },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();

    if (!data.status || !data.result?.bypassed_url) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Gagal memproses bypass URL tersebut",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      original_url: data.result.original_url || url,
      bypassed_url: data.result.bypassed_url,
      platform: data.result.platform || "unknown",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Terjadi kesalahan internal";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
