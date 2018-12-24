export const ggElo = ["platplus", "platinum", "gold", "silver", "bronze"];

export const ggRoles = {
  TOP: "top",
  MIDDLE: "middle",
  JUNGLE: "jungle",
  DUO_CARRY: "ADC",
  DUO_SUPPORT: "support"
};

export const tableHeadings = {
  Champion: "gameName",
  Role: "role",
  "Win Percent": "winRate",
  "Play Percent": "playRate",
  "Ban Rate": "banRate",
  "Playerbase Avg. Games": "averageGames",
  Kills: "kills",
  Deaths: "deaths",
  Assists: "assists",
  "Largest Killing Spree": "largestKillingSpree",
  "Damage Dealt": "damageComposition.total",
  "Damage Taken": "totalDamageTaken",
  "Total Healing": "totalHeal",
  "Minions Killed": "minionsKilled",
  "Enemy Jungle CS": "neutralMinionsKilledEnemyJungle",
  "Team Jungle CS": "neutralMinionsKilledTeamJungle",
  "Gold Earned": "goldEarned",
  "Role Position": "positions.overallPerformanceScore",
  "Position Change": "positions.overallPerformanceScoreDelta"
};

export const paths = {
  8000: {
    id: 8000,
    description: "Become a legend<br>Improved attacks and sustained damage",
    color: "#c8aa6e",
    secColor: "#aea789",
    name: "precision"
  },
  8100: {
    id: 8100,
    description: "Hunt and eliminate prey<br>Burst damage and target access",
    color: "#d44242",
    secColor: "#dc4747",
    name: "domination"
  },
  8200: {
    id: 8200,
    description:
      "Unleash destruction<br>Empowered abilities and resource manipulation",
    color: "#9faafc",
    secColor: "#6c75f5",
    name: "sorcery"
  },
  8300: {
    id: 8300,
    description: "Outwit more mortals<br>Creative tools and rule pending",
    color: "#49aab9",
    secColor: "#48b4be",
    name: "inspiration"
  },
  8400: {
    id: 8400,
    description: "Live forever<br>Durability and crowd control",
    color: "#a1d586",
    secColor: "#a4d08d",
    name: "resolve"
  }
};

export const statMods = {
  "5008": {
    id: "5008",
    name: "StatModsAdaptiveForceIcon",
    icon: "/static/images/stat-mods/StatModsAdaptiveForceIcon.png",
    shortDesc: "+10 Adapative Force"
  },
  "5005": {
    id: "5005",
    name: "StatModsAttackSpeedIcon",
    icon: "/static/images/stat-mods/StatModsAttackSpeedIcon.png",
    shortDesc: "+9% Attack Speed"
  },
  "5007": {
    id: "5007",
    name: "StatModsCDRScalingIcon",
    icon: "/static/images/stat-mods/StatModsCDRScalingIcon.png",
    shortDesc: "+1-10% CDR (based on level)"
  },
  "5002": {
    id: "5002",
    name: "StatModsArmorIcon",
    icon: "/static/images/stat-mods/StatModsArmorIcon.png",
    shortDesc: "+5 Armor"
  },
  "5003": {
    id: "5003",
    name: "StatModsMagicResIcon",
    icon: "/static/images/stat-mods/StatModsMagicResIcon.png",
    shortDesc: "+6 Magic Resist"
  },
  "5001": {
    id: "5001",
    name: "StatModsHealthScalingIcon",
    icon: "/static/images/stat-mods/StatModsHealthScalingIcon.png",
    shortDesc: "+15-90 Health (based on level)"
  }
};
