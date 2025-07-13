export const brands = [
  { name: "Samsung", slug: "samsung", image: "/brands/samsung.png" },
  { name: "Apple", slug: "apple", image: "/brands/apple.png" },
  { name: "Vivo", slug: "vivo", image: "/brands/vivo.png" },
  { name: "Honor", slug: "honor", image: "/brands/honor.png" },
  { name: "IQOO", slug: "iqoo", image: "/brands/iqoo.png" },
  { name: "MI", slug: "mi", image: "/brands/mi.png" },
  { name: "Oneplus", slug: "oneplus", image: "/brands/oneplus.png" },
  { name: "Motorola", slug: "motorola", image: "/brands/motorola.png" },
  { name: "OPPO", slug: "oppo", image: "/brands/oppo.png" },
  { name: "Pixel", slug: "google", image: "/brands/pixel.png" },
  { name: "Poco", slug: "poco", image: "/brands/poco.png" },
  { name: "Realme", slug: "realme", image: "/brands/realme.png" },
  { name: "Xiaomi", slug: "xiaomi", image: "/brands/realme.png" },
  { name: "Nothing", slug: "nothing", image: "/brands/realme.png" },
  { name: "Nokia", slug: "nokia", image: "/brands/realme.png" },
  { name: "Huawei", slug: "huawei", image: "/brands/realme.png" },
  { name: "Lg", slug: "lg", image: "/brands/realme.png" },
  { name: "Micromax", slug: "micromax", image: "/brands/realme.png" },
  { name: "Sony", slug: "sony", image: "/brands/realme.png" },
];

export const repairCategory = [
  {
    name: "Display",
    slug: "display",
  },
  {
    name: "Ports",
    slug: "ports",
  },
  {
    name: "Battery",
    slug: "battery",
  },
  {
    name: "Camera",
    slug: "camera",
  },
  {
    name: "Speaker",
    slug: "speaker",
  },
  {
    name: "Others",
    slug: "mobile-phone",
  },
];

export const INFO = {
  phone: "+918086009808",
  phoneLink(): string {
    return `tel:${this.phone}`;
  },
  phoneLabel: "+91 80860 09808",
  waPhone: "918086009808",
  waLink(message = "hi"): string {
    return `https://wa.me/${this.waPhone}?text=${encodeURIComponent(message)}`;
  },
  email: "support@fixamigo.com",
  emailLink(): string {
    return `mailto:${this.email}`;
  },
  name: "Fixamigo",
  tagline: "Fixing like a true amigo",
  tagline2: "Your Online Service Center",
  address: "Malappuram, Kerala, India",
  addressLink: "https://maps.app.goo.gl/E69gN8PF1PR3uQDW8",
  website: "https://fixamigo.com",
  instagram: "https://instagram.com/fixamigo.in",
};

export const supportCities = [
  { name: "Malappuram", slug: "malappuram" },
  { name: "Kottakkal", slug: "kottakkal" },
  { name: "Kondotty", slug: "kondotty" },
  { name: "Tirur", slug: "tirur" },
  { name: "Ponnani", slug: "ponnani" },
  { name: "Perinthalmanna", slug: "perinthalmanna" },
];
