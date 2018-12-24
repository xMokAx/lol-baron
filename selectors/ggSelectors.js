import { createSelector } from "reselect";
import sortBy from "sort-by";

import { ggRoles } from "../constants/ggConstants";

const getChamps = state => state.champs;

const getChampsList = state => {
  const { selectedElo, eloDetailsByElo } = state;
  const champsList = eloDetailsByElo[selectedElo]
    ? eloDetailsByElo[selectedElo].champsList
    : [];
  return champsList;
};

export const getModifiedChampsList = createSelector(
  getChampsList,
  getChamps,
  (champsList, champs) =>
    champsList
      .map(champ => {
        const id = champ.championId;
        const champion = champs[id];
        return {
          id,
          name: champion.name,
          gameName: champion.gameName,
          roles: champ.roles.sort(sortBy("-games"))
        };
      })
      .sort(sortBy("gameName"))
);

const getChampsData = state => {
  const { selectedElo, eloDetailsByElo } = state;
  const champsData = eloDetailsByElo[selectedElo].champsData || [];
  return champsData;
};

const getModifiedChampsData = createSelector(
  getChampsData,
  getChamps,
  (champsData, champs) =>
    champsData.map(champ => ({
      gameName: champs[champ.championId].gameName,
      name: champs[champ.championId].name,
      ...champ
    }))
);

const getRolesFilter = state =>
  state.eloDetailsByElo[state.selectedElo].rolesFilter;

const getChampsDataFilteredByRole = createSelector(
  getModifiedChampsData,
  getRolesFilter,
  (champsData, rolesFilter) => {
    if (rolesFilter === "SHOW_ALL") {
      return champsData;
    } else {
      return champsData.filter(champ => champ.role === rolesFilter);
    }
  }
);

const getSortProp = state => state.eloDetailsByElo[state.selectedElo].sortProp;

const getReverseOrder = state =>
  state.eloDetailsByElo[state.selectedElo].reverseOrder;

export const getSortedChampsDataFilteredByRole = createSelector(
  getChampsDataFilteredByRole,
  getSortProp,
  getReverseOrder,
  (champsData, sortProp, reverseOrder) => {
    const secondSortProp = sortProp === "winRate" ? "gameName" : "-winRate";
    sortProp = reverseOrder ? `-${sortProp}` : sortProp;
    return [...champsData].sort(sortBy(sortProp, secondSortProp));
  }
);

const getTextFilter = state =>
  state.eloDetailsByElo[state.selectedElo].textFilter;

export const getSortedChampsDataFilteredByRoleAndText = createSelector(
  getSortedChampsDataFilteredByRole,
  getTextFilter,
  (champsData, textFilter) => {
    const data = champsData.filter(
      champ =>
        champ.gameName.toLowerCase().slice(0, textFilter.length) ===
        textFilter.toLowerCase()
    );
    return data;
  }
);

export const getChampData = state => {
  const { selectedElo, eloDetailsByElo } = state;
  const selectedChamp = eloDetailsByElo[selectedElo].selectedChamp || "";
  const champData = selectedChamp
    ? eloDetailsByElo[selectedElo].champions[selectedChamp].champData
    : [];
  return champData.sort(sortBy("-gamesPlayed"));
};

export const getSelectedRole = state => {
  const { selectedElo, eloDetailsByElo } = state;
  const selectedChamp = eloDetailsByElo[selectedElo].selectedChamp || "";
  const selectedRole =
    state.eloDetailsByElo[selectedElo] &&
    state.eloDetailsByElo[selectedElo].champions[selectedChamp]
      ? state.eloDetailsByElo[selectedElo].champions[selectedChamp].selectedRole
      : "";
  return selectedRole;
};

export const getSelectedRoleData = createSelector(
  getChampData,
  getSelectedRole,
  (champData, selectedRole) => {
    const selectedRoleData = champData.find(
      champRole => champRole.role === selectedRole
    );
    return selectedRoleData;
  }
);

const getOverall = state => {
  const { selectedElo, eloDetailsByElo } = state;
  const overall = eloDetailsByElo[selectedElo].overall || {};
  return overall;
};

export const getOverviewTableData = createSelector(
  getOverall,
  (_state, dataProp) => dataProp,
  (overall, dataProp) => {
    const roles = Object.keys(ggRoles);
    let data = [];
    if (overall.elo) {
      switch (dataProp) {
        case "winrate":
          data = roles.map(role => overall.positions[role][dataProp]);
          break;
        case "performanceScore":
          data = roles.map(role => overall.positions[role][dataProp]);
          break;
        case "performanceDelta":
          data = roles.map(role => overall.positions[role][dataProp]);
          break;
      }
    }

    return { roles, data };
  }
);
