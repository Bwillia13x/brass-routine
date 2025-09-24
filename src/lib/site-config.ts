export const siteConfig = {
  name: "Andreas & Co.",
  tagline: "Grooming Lounge",
  siteUrl: "https://andreas-co.lovable.app",
  address: {
    line1: "245 10 Ave SW",
    line2: "Suite 210",
    city: "Calgary",
    region: "AB",
    postalCode: "T2R 0A5",
    country: "CA",
  },
  contact: {
    phone: "+14035550199",
    formattedPhone: "+1 (403) 555-0199",
    email: "concierge@andreasandco.ca",
  },
  hours: [
    { days: "Tuesday – Friday", time: "9:00 AM – 7:00 PM" },
    { days: "Saturday", time: "9:00 AM – 5:00 PM" },
    { days: "Sunday – Monday", time: "By appointment only" },
  ],
  social: {
    instagram: "https://instagram.com/andreasandco",
  },
  mapLink: "https://maps.google.com/?q=245+10+Ave+SW,+Calgary,+AB+T2R+0A5",
};

export type SiteConfig = typeof siteConfig;
