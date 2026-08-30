export type Certification = {
  name: string;
  image: string;
  detail: string;
};

export type ClientLogo = {
  name: string;
  image: string;
};

export const certifications: Certification[] = [
  {
    name: "CPCC",
    image: "/certification/1.png",
    detail: "Certified Professional Co-Active Coach",
  },
  {
    name: "PCC",
    image: "/certification/2-1.png",
    detail: "Professional Certified Coach, International Coach Federation",
  },
  {
    name: "The Coaching Academy",
    image: "/certification/3.png",
    detail: "Industry-recognised coaching qualifications",
  },
  {
    name: "TTI Success Insights",
    image: "/certification/4-1.png",
    detail: "United Kingdom partner",
  },
  {
    name: "ORSC",
    image: "/certification/5-1.png",
    detail: "Organisation & Relationship Systems Certified",
  },
  {
    name: "Co-Active Training Institute",
    image: "/certification/6-1.png",
    detail: "Co-Active coaching methodology",
  },
  {
    name: "Team Coaching International",
    image: "/certification/7.png",
    detail: "Authorised Facilitator",
  },
  {
    name: "CTPC",
    image: "/certification/8.png",
    detail: "Certified Team Performance Coach",
  },
];

export const clientLogos: ClientLogo[] = [
  { name: "Microsoft", image: "/clients/Microsoft-3.jpg" },
  { name: "Bloomberg", image: "/clients/Bloomberg.jpg" },
  { name: "National Grid", image: "/clients/National-Grid.jpg" },
  { name: "NHS", image: "/clients/NHS.jpg" },
  { name: "Toyota", image: "/clients/Toyota-3.jpg" },
  { name: "TSB", image: "/clients/TSB-3.jpg" },
  { name: "Thames Water", image: "/clients/Thames-Water.jpg" },
  { name: "Munich Re", image: "/clients/Munich-re.jpg" },
  { name: "Northern Trust", image: "/clients/Northern-Trus.jpg" },
  { name: "Farfetch", image: "/clients/Farfetch.jpg" },
  { name: "Mayor of London", image: "/clients/mayor-Of-London.jpg" },
  { name: "Save the Children", image: "/clients/Save-the-Children.jpg" },
  { name: "Sentebale", image: "/clients/Sentebale-3.jpg" },
  { name: "Royal African Society", image: "/clients/Royal-African-Society.jpg" },
  { name: "Starlight", image: "/clients/Starlight.jpg" },
  { name: "Young Women's Trust", image: "/clients/YWT-3.jpg" },
  { name: "Women in Banking & Finance", image: "/clients/Women-in-banking-Fin.jpg" },
  { name: "Oliver", image: "/clients/Oliver-3.jpg" },
  { name: "EQUIP", image: "/clients/EQUIP.jpg" },
  { name: "OAF", image: "/clients/OAF.jpg" },
  { name: "RAS", image: "/clients/RAS.jpg" },
  { name: "WCCF", image: "/clients/WCCF.jpg" },
  { name: "WIBF", image: "/clients/WIBF.jpg" },
];
