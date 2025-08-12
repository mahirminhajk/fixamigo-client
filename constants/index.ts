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

export const spAndIcons = [
  { name: "Battery", category: "BATTERY", icon: "/icons/battery.png" },
  { name: "Display", category: "DISPLAY", icon: "/icons/display.png" },
  { name: "Camera", category: "CAMERA", icon: "/icons/camera.png" },
  {
    name: "Charging Port",
    category: "CHARGING_PORT",
    icon: "/icons/charging-port.png",
  },
  {
    name: "Motherboard",
    category: "MOTHERBOARD",
    icon: "/icons/motherboard.png",
  },
  { name: "Speaker", category: "SPEAKER", icon: "/icons/speaker.png" },
  { name: "Vibrator", category: "VIBRATOR", icon: "/icons/reciever.png" },
  { name: "Buttons", category: "BUTTONS", icon: "/icons/button.png" },
  { name: "Others", category: "OTHERS", icon: "/icons/service.png" },
  {
    name: "Front Camera",
    category: "FRONT_CAMERA",
    icon: "/icons/front-camera.png",
  },
  { name: "Back Camera", category: "BACK_CAMERA", icon: "/icons/camera.png" },
  { name: "Camera Glass", category: "CAMERA_GLASS", icon: "/icons/camera.png" },
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
  phone: "+918078160942",
  phoneLink(): string {
    return `tel:${this.phone}`;
  },
  phoneLabel: "+91 80781 60942",
  waPhone: "918078160942",
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
  facebook: "https://www.facebook.com/people/Fixamigo/61578749623696/",
  x: "https://x.com/fixamigo",
  googleBusiness: "https://g.page/fixamigo",
  linkedin: "https://www.linkedin.com/company/fixamigo",
  grievanceOfficer: {
    name: "Mahir Minhaj K",
    email: "km@fixamigo.com",
    phone: "+918086009808",
    address: "Ponmala, Malappuram, Kerala, India, Pin - 676528",
    workingHours: "10:00 AM – 4:00 PM, Monday to Saturday",
  },
};

export const supportCities = [
  { name: "Malappuram", slug: "malappuram" },
  { name: "Kottakkal", slug: "kottakkal" },
  { name: "Kondotty", slug: "kondotty" },
  { name: "Tirur", slug: "tirur" },
  { name: "Ponnani", slug: "ponnani" },
  { name: "Perinthalmanna", slug: "perinthalmanna" },
];

// Global FAQs used in the /faq page and for SEO structured data
export const faqs = [
  // Screen repair FAQs
  {
    category: "display",
    question: "How long does a phone screen repair take?",
    answer:
      "With Fixamigo’s pickup and delivery service, most screen replacements are completed the same day. If diagnostics are needed, it may take longer — we’ll notify you as soon as we know the exact time.",
  },
  {
    category: "display",
    question:
      "Will my phone’s touch and display quality be the same after repair?",
    answer:
      "Yes. We use high-quality components to ensure your phone works smoothly and feels just like before.",
  },
  {
    category: "display",
    question: "Do you offer warranty on screen replacement?",
    answer:
      "Yes. Some screens come with up to 1 week warranty against part defects (not physical damage). For other screens, we provide a delivery-time check warranty — if it works at delivery, it’s good to go.",
  },

  // Battery repair FAQs
  {
    category: "battery",
    question: "How do I know if my phone battery needs replacement?",
    answer:
      "If your phone drains quickly, shuts down unexpectedly, charges slowly, or the battery is swollen, it’s time to replace it. We can confirm this with a quick free diagnosis.",
  },
  {
    category: "battery",
    question: "How long does a battery replacement take?",
    answer:
      "Most battery replacements are completed the same day after pickup. In rare cases where special parts are needed, we’ll keep you updated.",
  },

  // Charging port repair FAQs
  {
    category: "port",
    question:
      "Why is my phone not charging even when the charger is connected?",
    answer:
      "It could be a damaged charging port, dust inside, or a deeper internal fault. We offer free basic diagnosis to find the exact issue.",
  },
  {
    category: "port",
    question:
      "Can a damaged charging port be repaired or does it need replacement?",
    answer:
      "Many charging ports can be cleaned or repaired. If replacement is needed, we use quality parts and test them at your home during delivery.",
  },

  // Camera repair FAQs
  {
    category: "camera",
    question: "Why is my phone camera showing a black screen?",
    answer:
      "This usually points to a hardware issue or a loose connection. We can repair or replace the faulty part and confirm the fix before handing your phone back.",
  },
  {
    category: "camera",
    question: "Can you fix blurry or foggy camera images?",
    answer:
      "Yes. It may be caused by scratches, dust, or moisture in the lens. We offer cleaning and replacement services based on the diagnosis.",
  },

  // Speaker repair FAQs
  {
    category: "speaker",
    question: "Why is there no sound coming from my phone’s speaker?",
    answer:
      "Dust, water damage, or a faulty speaker component could be the cause. We’ll find the problem and repair or replace the part using quality components.",
  },
  {
    category: "speaker",
    question: "How long does it take to repair a phone speaker?",
    answer:
      "Most speaker repairs are completed within the same day, depending on parts availability.",
  },

  // Service & process FAQs
  {
    category: "general",
    question: "Do you provide pickup and delivery?",
    answer:
      "Yes. We offer pickup and delivery across Malappuram. Selected locations have free pickup/delivery, while same-day delivery may have an extra charge depending on demand.",
  },
  {
    category: "general",
    question: "Will my data be safe during repair?",
    answer:
      "Yes. You can keep your phone locked — all testing is done in front of you at delivery. We also have a data safety statement on our privacy page.",
  },
  {
    category: "general",
    question: "Which brands do you support?",
    answer:
      "We repair most major brands including Apple, Samsung, Xiaomi, OnePlus, Realme, Vivo, Oppo, Motorola, Nokia, and more.",
  },

  // Added Fixamigo-specific FAQs
  {
    category: "general",
    question: "How will I know the repair status?",
    answer:
      "We’ll update you via call or message at each step — pickup, diagnosis (if needed), repair completion, and delivery scheduling.",
  },
  {
    category: "general",
    question: "Do you charge for diagnosis?",
    answer:
      "Most basic diagnostics are free. If a complex diagnosis is required, we’ll inform you before starting.",
  },
  {
    category: "general",
    question: "Do you offer urgent repairs?",
    answer:
      "Yes, we offer same-day urgent repairs when possible. Charges vary depending on location and demand.",
  },
  {
    category: "general",
    question: "Are there any hidden charges?",
    answer:
      "No. We provide clear pricing before starting any work, and you only pay for approved repairs.",
  },
  {
    category: "general",
    question: "Do you plan to offer on-site repairs?",
    answer:
      "Yes. On-site repairs — where our technician fixes your phone at your location — will be available in the future.",
  },
];
