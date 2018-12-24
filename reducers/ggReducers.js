import {
  SELECT_ELO,
  SELECT_CHAMP,
  GENERAL_REQUEST,
  GENERAL_RECEIVE,
  GENERAL_ERROR,
  OVERALL_REQUEST,
  OVERALL_RECEIVE,
  OVERALL_ERROR,
  CHAMPSLIST_REQUEST,
  CHAMPSLIST_RECEIVE,
  CHAMPSLIST_ERROR,
  CHAMPSDATA_REQUEST,
  CHAMPSDATA_RECEIVE,
  CHAMPSDATA_ERROR,
  CHAMP_REQUEST,
  CHAMP_RECEIVE,
  CHAMP_ERROR,
  MATCHUP_REQUEST,
  MATCHUP_RECEIVE,
  MATCHUP_ERROR,
  SELECT_ROLE,
  SET_ROLES_FILTER,
  SHOW_ALL,
  SET_TEXT_FILTER,
  SORT_BY,
  TOGGLE_ORDER
} from "../actions/ggActions";

export const selectedElo = (state = "platplus", action) => {
  switch (action.type) {
    case SELECT_ELO:
      return action.elo;
    default:
      return state;
  }
};

const matchupDetails = (
  state = {
    isFetchingMatchup: false,
    matchupError: "",
    matchupData: {}
  },
  action
) => {
  switch (action.type) {
    case MATCHUP_REQUEST:
      return {
        ...state,
        isFetchingMatchup: true,
        matchupError: ""
      };
    case MATCHUP_RECEIVE:
      return {
        ...state,
        isFetchingMatchup: false,
        matchupData: action.matchupData
      };
    case MATCHUP_ERROR:
      return {
        ...state,
        isFetchingMatchup: false,
        matchupError: action.matchupError
      };
  }
};

const matchupDetailsByEnemy = (state = {}, action) => {
  switch (action.type) {
    case MATCHUP_REQUEST:
    case MATCHUP_RECEIVE:
    case MATCHUP_ERROR:
      return {
        ...state,
        [action.enemyName]: matchupDetails(state[action.enemyName], action)
      };
    default:
      return state;
  }
};

const champDetails = (
  state = {
    id: "",
    isFetchingChamp: false,
    champError: "",
    champData: [],
    selectedRole: "",
    matchups: {}
  },
  action
) => {
  switch (action.type) {
    case CHAMP_REQUEST:
      return {
        ...state,
        isFetchingChamp: true,
        champError: "",
        id: action.id
      };
    case CHAMP_RECEIVE:
      return {
        ...state,
        isFetchingChamp: false,
        champData: action.champData
      };
    case CHAMP_ERROR:
      return {
        ...state,
        isFetchingChamp: false,
        champError: action.champError
      };
    case SELECT_ROLE:
      return {
        ...state,
        selectedRole: action.selectedRole
      };
    case MATCHUP_REQUEST:
    case MATCHUP_RECEIVE:
    case MATCHUP_ERROR:
      return {
        ...state,
        matchups: matchupDetailsByEnemy(state.matchups, action)
      };
    default:
      return state;
  }
};

const champDetailsByChamp = (state = {}, action) => {
  switch (action.type) {
    case CHAMP_REQUEST:
    case CHAMP_RECEIVE:
    case CHAMP_ERROR:
    case SELECT_ROLE:
    case MATCHUP_REQUEST:
    case MATCHUP_RECEIVE:
    case MATCHUP_ERROR:
      return {
        ...state,
        [action.champName]: champDetails(state[action.champName], action)
      };
    default:
      return state;
  }
};

export const initialEloState = {
  champsList: [],
  isFetchingChampsList: false,
  champsListError: "",
  general: {},
  isFetchingGeneral: false,
  generalError: "",
  overall: {},
  isFetchingOverall: false,
  overallError: "",
  champsData: [],
  isFetchingChampsData: false,
  champsDataError: "",
  selectedChamp: "",
  champions: {},
  sortProp: "winRate",
  reverseOrder: true,
  rolesFilter: SHOW_ALL,
  textFilter: ""
};

const eloDetails = (state = initialEloState, action) => {
  switch (action.type) {
    case CHAMPSLIST_REQUEST:
      return {
        ...state,
        isFetchingChampsList: true,
        champsListError: ""
      };
    case CHAMPSLIST_RECEIVE:
      return {
        ...state,
        isFetchingChampsList: false,
        champsList: action.champsList
      };
    case CHAMPSLIST_ERROR:
      return {
        ...state,
        isFetchingChampsList: false,
        champsListError: action.champsListError
      };
    case GENERAL_REQUEST:
      return {
        ...state,
        isFetchingGeneral: true,
        generalError: ""
      };
    case GENERAL_RECEIVE:
      return {
        ...state,
        isFetchingGeneral: false,
        general: action.general
      };
    case GENERAL_ERROR:
      return {
        ...state,
        isFetchingGeneral: false,
        generalError: action.generalError
      };
    case OVERALL_REQUEST:
      return {
        ...state,
        isFetchingOverall: true,
        overallError: ""
      };
    case OVERALL_RECEIVE:
      return {
        ...state,
        isFetchingOverall: false,
        overall: action.overall
      };
    case OVERALL_ERROR:
      return {
        ...state,
        isFetchingOverall: false,
        overallError: action.overallError
      };

    case CHAMPSDATA_REQUEST:
      return {
        ...state,
        isFetchingChampsData: true,
        champsDataError: ""
      };
    case CHAMPSDATA_RECEIVE:
      return {
        ...state,
        isFetchingChampsData: false,
        champsData: action.champsData
      };
    case CHAMPSDATA_ERROR:
      return {
        ...state,
        isFetchingChampsData: false,
        champsDataError: action.champsDataError
      };
    case SORT_BY:
      // let reverseOrder =
      //   state.sortProp === action.sortProp
      //     ? !state.reverseOrder
      //     : action.reverseOrder;
      return {
        ...state,
        sortProp: action.sortProp,
        reverseOrder: action.reverseOrder
      };
    case SET_ROLES_FILTER:
      return {
        ...state,
        rolesFilter: action.rolesFilter
      };
    case TOGGLE_ORDER:
      return {
        ...state,
        reverseOrder: !state.reverseOrder
      };
    case SET_TEXT_FILTER:
      return {
        ...state,
        textFilter: action.textFilter
      };
    case CHAMP_REQUEST:
    case CHAMP_RECEIVE:
    case CHAMP_ERROR:
    case SELECT_ROLE:
    case MATCHUP_REQUEST:
    case MATCHUP_RECEIVE:
    case MATCHUP_ERROR:
      return {
        ...state,
        champions: champDetailsByChamp(state.champions, action)
      };
    case SELECT_CHAMP:
      return {
        ...state,
        selectedChamp: action.selectedChamp
      };
    default:
      return state;
  }
};

export const eloDetailsByElo = (state = {}, action) => {
  switch (action.type) {
    case SELECT_ELO:
      if (!state[action.elo]) {
        return {
          ...state,
          [action.elo]: initialEloState
        };
      }
    case CHAMPSLIST_REQUEST:
    case CHAMPSLIST_RECEIVE:
    case CHAMPSLIST_ERROR:
    case GENERAL_REQUEST:
    case GENERAL_RECEIVE:
    case GENERAL_ERROR:
    case OVERALL_REQUEST:
    case OVERALL_RECEIVE:
    case OVERALL_ERROR:
    case SELECT_CHAMP:
    case CHAMPSDATA_REQUEST:
    case CHAMPSDATA_RECEIVE:
    case CHAMPSDATA_ERROR:
    case SORT_BY:
    case TOGGLE_ORDER:
    case SET_ROLES_FILTER:
    case SET_TEXT_FILTER:
    case CHAMP_REQUEST:
    case CHAMP_RECEIVE:
    case CHAMP_ERROR:
    case SELECT_ROLE:
    case MATCHUP_REQUEST:
    case MATCHUP_RECEIVE:
    case MATCHUP_ERROR:
      return {
        ...state,
        [action.elo]: eloDetails(state[action.elo], action)
      };
    default:
      return state;
  }
};
