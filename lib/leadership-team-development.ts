export const leadershipTeamMeta = {
  title: "Leadership Team Development",
  question:
    "What must become possible between these leaders for the organisation to perform?",
  summary:
    "Strong executives do not automatically make a strong leadership team.",
} as const;

export const leadershipTeamProblem = {
  headline: "Teams in name. Functions in practice.",
  body: "Too often the top remains a meeting of senior people — not a team that leads the organisation.",
  close:
    "Until those shift, the CEO stays the integrator — and the organisation stays limited by the top.",
  pressures: [
    {
      title: "Fragmented priorities",
      cost: "Functional agendas override enterprise priorities. Collective ownership never forms.",
    },
    {
      title: "Soft conflict",
      cost: "Trust stays polite or thin. Challenge is avoided, personalised or unresolved.",
    },
    {
      title: "Ambiguous decision rights",
      cost: "Roles and mandates overlap. Decisions slow, get revisited, or escalate to the CEO.",
    },
  ],
} as const;

export const leadershipTeamPortfolio = {
  title: "What we work on",
  intro:
    "From groups of senior leaders to collective organisational leadership.",
  flagships: [
    {
      title: "Senior Leadership Team Accelerator",
      tagline:
        "A sustained diagnostic and development journey for trust, alignment, accountability and collective ownership.",
      href: "mailto:info@obijames.com?subject=Senior%20Leadership%20Team%20Accelerator",
      tone: "accent" as const,
    },
    {
      title: "Executive Team Diagnostic",
      tagline:
        "A rigorous read of purpose, relationships, decision-making, governance and organisational impact — before you prescribe.",
      href: "mailto:info@obijames.com?subject=Executive%20Team%20Diagnostic",
      tone: "navy" as const,
    },
  ],
} as const;

export const leadershipTeamOutcomes = {
  title: "What you get",
  items: [
    {
      title: "Collective ownership",
      body: "Shared accountability — not just vertical.",
    },
    {
      title: "Trust and challenge",
      body: "Faster decisions. Less CEO dependency.",
    },
    {
      title: "Strategic execution",
      body: "Alignment that actually follows through.",
    },
    {
      title: "Organisational leadership",
      body: "A team that leads the whole — not only its functions.",
    },
  ],
} as const;