// Campaign definitions for QR landing pages
// Each campaign entry maps to route /c/[cname]
export interface Campaign {
  cname: string; // route segment
  title: string; // unique page title
  description: string; // unique page description (used in metadata)
}

export const campaigns: Campaign[] = [
  {
    cname: "zaras-secret",
    title: "Meet Zara’s Secret 👀",
    description:
      "Zara already found the fix — it’s Fixamigo. Scan, book, and save your phone.",
  },
  {
    cname: "the-guy",
    title: "Yes, This Is The Guy 😎",
    description:
      "The guy who saves phones. Fixamigo is ready to repair yours today.",
  },
  {
    cname: "phone-wants-you",
    title: "Your Phone Wants You ❤️",
    description:
      "It’s crying for care — Fixamigo is the answer. Quick, reliable repairs.",
  },
  {
    cname: "ammu-right",
    title: "അമ്മു ശരിയായിരുന്നു 📱",
    description:
      "അമ്മു പറഞ്ഞത് കേട്ടല്ലോ? സ്കാൻ ചെയ്‌താൽ ഫോൺ മിനുക്കി കിട്ടും. Fixamigo ഉണ്ടല്ലോ, ആശങ്ക വേണ്ട!",
  },
  {
    cname: "need-company",
    title: "കൂട്ടുകാരെ വേണോ? 🤝",
    description:
      "കമ്പനി വേണോ? Fixamigo ഉണ്ടല്ലോ! ഒന്ന് സ്കാൻ ചെയ്‌താൽ ഫോൺ കിടിലൻ ആയി തിരികെ കിട്ടും 😎✨",
  },
];

export function getCampaignByName(cname: string): Campaign | undefined {
  return campaigns.find((c) => c.cname.toLowerCase() === cname.toLowerCase());
}

export function getAllCampaignNames(): string[] {
  return campaigns.map((c) => c.cname);
}
