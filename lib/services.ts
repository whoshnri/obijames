export type ServiceOffering = {
  value: string;
  href: string;
};

/** The three service pillars offered on the site, plus the "not sure yet" option. */
export const serviceOfferings: ServiceOffering[] = [
  { value: "Executive Development", href: "/executive-development" },
  { value: "Leadership Team Development", href: "/leadership-team-development" },
  { value: "Organisational Capability", href: "/organisational-capability" },
];

export const SERVICE_NOT_SURE = "Not sure yet";

export const serviceOptions = [
  ...serviceOfferings.map((service) => service.value),
  SERVICE_NOT_SURE,
];
