"use server";

import { IDevice } from "@/types/device";

export async function searchDevicesAction(
  query: string
): Promise<{ success: boolean; data: IDevice[]; error?: string }> {
  try {
    if (!query.trim()) {
      return { success: true, data: [] };
    }

    const res = await fetch(
      `${process.env.API_URL}/device/search?q=${encodeURIComponent(query)}`,
      {
        cache: "no-store", // Don't cache search results for real-time searching
        next: {
          tags: [`search:${query}`],
        },
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to search devices for query "${query}": ${res.status} ${res.statusText}`
      );
      return {
        success: false,
        data: [],
        error: `Failed to search devices: ${res.status} ${res.statusText}`,
      };
    }

    const jsonData = await res.json();
    const devices = (jsonData.data as IDevice[]) || [];

    return { success: true, data: devices };
  } catch (error) {
    console.error(`Error searching devices for query "${query}":`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
