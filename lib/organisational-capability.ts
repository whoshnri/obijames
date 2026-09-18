export const organisationalCapabilityMeta = {
  title: "Organisational Capability",
  eyebrow: "Pillar 03",
  question:
    "What must change in the organisation so that effective leadership is possible and sustainable?",
  summary:
    "Build the conditions that let people take ownership - and let leaders share power without losing accountability.",
} as const;

export const organisationalCapabilityProblem = {
  title: "Where organisations get stuck",
  intro:
    "The organisation often pulls leaders back into the behaviours it says it wants them to leave behind.",
  challenges: [
    {
      index: "01",
      title: "Growth outpaces structure",
      body: "Founders or CEOs stay at the centre of every decision. Critical knowledge and relationships sit with too few people.",
    },
    {
      index: "02",
      title: "Governance lags scale",
      body: "Roles and decision rights stay unclear. Succession is informal - or dependent on personal sponsorship.",
    },
    {
      index: "03",
      title: "Systems disconnect",
      body: "Leadership programmes sit apart from strategy. Performance systems reward compliance over ownership.",
    },
    {
      index: "04",
      title: "Talent stays exposed",
      body: "People are asked to step up without the information, authority or support required to succeed.",
    },
  ],
} as const;

export const organisationalCapabilityPortfolio = {
  title: "Where we start",
  intro: "Two entry points into a whole-system way of working.",
  flagships: [
    {
      title: "Capability Diagnostic",
      tagline:
        "Twelve lenses. One clear view of what the organisation needs next.",
      href: "mailto:info@obijames.com?subject=Organisational%20Capability%20Diagnostic",
      tone: "navy" as const,
    },
    {
      title: "Leadership Architecture",
      tagline:
        "Design leadership as a system - expectations, pipeline, succession and measurement.",
      href: "mailto:info@obijames.com?subject=Leadership%20Architecture",
      tone: "accent" as const,
    },
  ],
} as const;

export const organisationalCapabilityLenses = {
  title: "The Diagnostic looks at the whole system",
  intro:
    "Not a survey. A structured read across twelve interconnected lenses - from strategy to key-person dependency.",
  items: [
    "Strategy & ambition",
    "Executive leadership",
    "Leadership team",
    "Governance",
    "Structure",
    "Decision rights",
    "Management capability",
    "Talent & succession",
    "Accountability",
    "Culture & relationships",
    "Operating rhythms",
    "Key-person risk",
  ],
} as const;

export const organisationalCapabilityOutcomes = {
  title: "What shifts",
  items: [
    {
      title: "Authority can move",
      body: "Decision rights are clear enough to distribute power safely.",
    },
    {
      title: "Leadership is designed",
      body: "Capability sits in a system - not a string of disconnected programmes.",
    },
    {
      title: "Succession is real",
      body: "Internal pipelines reduce dependency on a handful of people.",
    },
    {
      title: "Ownership sticks",
      body: "People have the information, mandate and support to lead.",
    },
  ],
} as const;
