export function getCityMetadata(city: string) {
  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  return {
    title: `${formattedCity}'s Trusted Mobile Repair Services – Fixamigo`,
    description: `Fixamigo offers reliable and affordable mobile repair services in ${formattedCity}. Book online for display, battery, camera, and port repairs at your doorstep.`,
    keywords: [
      `${formattedCity} mobile repair`,
      `phone screen repair in ${formattedCity}`,
      `display replacement ${formattedCity}`,
      `Fixamigo ${formattedCity}`,
      `mobile service center ${formattedCity}`,
    ],
    openGraph: {
      title: `${formattedCity} Mobile Repair – Fixamigo`,
      description: `Get your phone fixed fast in ${formattedCity}. Trusted technicians, doorstep pickup, quality parts. Book your repair today.`,
      url: `https://fixamigo.com/${city}`,
      siteName: "Fixamigo",
      images: [
        {
          url: "https://your-cdn.com/og-image.jpg", //TODO: Replace with actual image URL
          alt: `${formattedCity} Mobile Repair – Fixamigo`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}
