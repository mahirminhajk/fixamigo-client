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
      "Zara ഇപ്പേൾ tension free 👀 Fixamigo വന്നു വീട്ടിൽ നിന്ന് free pickup, turbo repair, പിന്നെ phone fresh ആയി back to hand!",
  },
  {
    cname: "the-guy",
    title: "Everyone’s Talking About Her 📣",
    description:
      "അവളെ കുറിച്ച് ടൗൺ മുഴുവൻ buzz ആണ് 📱 Fixamigo വരും വീട്ടിൽ നിന്ന് free pickup, കിടിലൻ repair, പിന്നെ fresh look കൊണ്ട് phone തിരികെ delivery!",
  },
  {
    cname: "phone-wants-you",
    title: "Your Phone Wants You ❤️",
    description:
      "Phone crying for you da ❤️ Fixamigo ഉണ്ടെങ്കിൽ tension off – free home pickup, കിടിലൻ repair, വീട്ടിലേയ്ക്ക് delivery ready!",
  },
  {
    cname: "ammu-right",
    title: "അമ്മു ശരിയായിരുന്നു 📱",
    description:
      "അമ്മു പറഞ്ഞതൊക്കെ ശരിയാണ്! ഫോൺ കേടായപ്പോൾ Fixamigo വീട്ടിൽ വന്ന് ഫ്രീയായി പിക്കപ്പ് ചെയ്തു, പിന്നെ കിടിലനായി റിപ്പയർ ചെയ്ത് വീട്ടിലേക്ക് തന്നെ ഫ്രീ ഡെലിവറി ചെയ്തു തന്നു.",
  },
  {
    cname: "need-company",
    title: "കൂട്ടുകാരെ വേണോ? 🤝",
    description:
      "കൂട്ടുകാരെ വേണോ? Fixamigo ഉണ്ടല്ലോ! ഫോൺ പൊട്ടിയാലും വീട്ടിൽ തന്നെ ഫ്രീ പിക്കപ്പ്, കിടിലൻ റിപയർ, പിന്നെ വീട്ടിലേയ്ക്ക് തന്നെ ഡെലിവറി 😎✨",
  },
];

export function getCampaignByName(cname: string): Campaign | undefined {
  return campaigns.find((c) => c.cname.toLowerCase() === cname.toLowerCase());
}

export function getAllCampaignNames(): string[] {
  return campaigns.map((c) => c.cname);
}
