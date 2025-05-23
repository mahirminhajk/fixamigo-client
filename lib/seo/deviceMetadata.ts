import { fetchDeviceBySlug } from "@/lib/apiService"; // Import the new fetch function

export async function getDeviceMetadata(brand: string, device: string) {
  try {
    const deviceData = await fetchDeviceBySlug(device); // Use the new fetch function

    if (!deviceData) throw new Error("Failed to fetch device metadata"); // Handle null case

    const brandName = deviceData.company || brand;
    const deviceName = deviceData.name;

    // Get top 1-2 spare part categories for keyword injection
    const topParts = deviceData.spareParts
      ?.slice(0, 2)
      .map((sp) => sp.label.toLowerCase())
      .join(" & ");

    const title = `${deviceName} ${
      topParts ? `${topParts} repair` : `repair`
    } – ${brandName} | FixAmigo`;
    const description = `Affordable ${deviceName} repair services from ${brandName}. We fix ${
      topParts || "common issues"
    } with free pickup and delivery. Book your repair online today.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/repair/mobile-phone/${brand}/${device}`,
      },
      openGraph: {
        title,
        description,
        images: deviceData.images?.length
          ? [
              {
                url: deviceData.images[0],
                width: 800,
                height: 600,
                alt: `${deviceName} repair`,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "FixAmigo – Reliable Repair Services",
      description:
        "FixAmigo offers professional repair services with pickup & delivery. Book your mobile phone repair today!",
    };
  }
}
