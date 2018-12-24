export const getItemImage = (id, version) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${id}.png`;

export const getSummonerSpellImage = (spell, version) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png`;

export const getProfileIconImage = (id, version) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${id}.png`;

export const getRuneImage = url =>
  `https://ddragon.leagueoflegends.com/cdn/img/${url}`;

export const getChampionImage = (champ, version) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`;

export const getSkillImage = (skill, version) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${skill}.png`;

export const getPassiveImage = (name, version) =>
  `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${name}`;
