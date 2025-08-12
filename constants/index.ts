export const brands = [
  {
    name: "Samsung",
    slug: "samsung",
    image: "/brands/samsung.webp",
    repairs: ["mobile-phone", "display", "battery"],
  },
  {
    name: "Apple",
    slug: "apple",
    image: "/brands/apple.webp",
    repairs: ["mobile-phone", "display", "battery", "camera"],
  },
  {
    name: "Vivo",
    slug: "vivo",
    image: "/brands/vivo.webp",
    repairs: ["mobile-phone", "display"],
  },
  {
    name: "Honor",
    slug: "honor",
    image: "/brands/honor.webp",
    repairs: ["mobile-phone", "battery"],
  },
  {
    name: "IQOO",
    slug: "iqoo",
    image: "/brands/iqoo.webp",
    repairs: ["mobile-phone", "display", "camera"],
  },
  {
    name: "MI",
    slug: "mi",
    image: "/brands/xiaomi.webp",
    repairs: ["mobile-phone", "battery", "speaker"],
  },
  {
    name: "Oneplus",
    slug: "oneplus",
    image: "/brands/oneplus.webp",
    repairs: ["mobile-phone", "display", "ports"],
  },
  {
    name: "Motorola",
    slug: "motorola",
    image: "/brands/motorola.webp",
    repairs: ["mobile-phone"],
  },
  {
    name: "OPPO",
    slug: "oppo",
    image: "/brands/oppo.webp",
    repairs: ["mobile-phone", "camera", "speaker"],
  },
  {
    name: "Pixel",
    slug: "google",
    image: "/brands/pixel.webp",
    repairs: ["mobile-phone", "display", "camera"],
  },
  {
    name: "Poco",
    slug: "poco",
    image: "/brands/poco.webp",
    repairs: ["mobile-phone", "display", "battery"],
  },
  {
    name: "Realme",
    slug: "realme",
    image: "/brands/realme.webp",
    repairs: ["mobile-phone", "ports", "display"],
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    image: "/brands/xiaomi.webp",
    repairs: ["mobile-phone", "battery"],
  },
  {
    name: "Nothing",
    slug: "nothing",
    image: "/brands/nothing.webp",
    repairs: ["mobile-phone"],
  },
  {
    name: "Nokia",
    slug: "nokia",
    image: "/brands/nokia.webp",
    repairs: ["mobile-phone", "display"],
  },
  {
    name: "Huawei",
    slug: "huawei",
    image: "/brands/huawei.webp",
    repairs: ["mobile-phone", "camera"],
  },
  {
    name: "Lg",
    slug: "lg",
    image: "/brands/lg.webp",
    repairs: ["mobile-phone", "display", "battery"],
  },
  {
    name: "Micromax",
    slug: "micromax",
    image: "/brands/micromax.webp",
    repairs: ["mobile-phone"],
  },
  {
    name: "Sony",
    slug: "sony",
    image: "/brands/sony.webp",
    repairs: ["mobile-phone", "camera", "speaker"],
  },
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
  instagram: "https://instagram.com/fixamigo",
  facebook: "https://www.facebook.com/share/p/1F57x9PWJa/",
};

export const supportCities = [
  { name: "Malappuram", slug: "malappuram" },
  { name: "Kottakkal", slug: "kottakkal" },
  { name: "Kondotty", slug: "kondotty" },
  { name: "Tirur", slug: "tirur" },
  { name: "Ponnani", slug: "ponnani" },
  { name: "Perinthalmanna", slug: "perinthalmanna" },
];
