import { IDevice } from "@/types";

export async function fetchDevicesByBrand(brand: string): Promise<IDevice[]> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/device/brand?value=${brand}`,
      {
        cache: "force-cache",
        next: {
          tags: [`brand:${brand}`, `brand`],
        },
      }
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch data for brand ${brand}: ${res.status} ${res.statusText}`
      );
      return []; // Return empty array on failure
    }

    const jsonData = await res.json();
    return (jsonData.data as IDevice[]) || []; // Type assertion and ensure data property exists
  } catch (error) {
    console.error(`Error fetching devices for brand ${brand}:`, error);
    return []; // Return empty array on error
  }
}

export async function fetchDeviceBySlug(
  deviceSlug: string
): Promise<IDevice | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/device/s/${deviceSlug}`, {
      cache: "force-cache",
      next: {
        tags: [`device:${deviceSlug}`, `devices`],
      },
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch data for device slug ${deviceSlug}: ${res.status} ${res.statusText}`
      );
      return null; // Return null on failure
    }
    return (await res.json()).data;
  } catch (error) {
    console.error(`Error fetching device by slug ${deviceSlug}:`, error);
    return null;
  }
}
