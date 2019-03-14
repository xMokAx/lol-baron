// action types
export const SELECT_ELO = "SELECT_ELO";
export const SELECT_CHAMP = "SELECT_CHAMP";
export const CHAMP_QUERY = "CHAMP_QUERY";
export const CHAMP_QUERY_ERROR = "CHAMP_QUERY_ERROR";
export const SELECT_ROLE = "SELECT_ROLE";
export const GENERAL_REQUEST = "GENERAL_REQUEST";
export const GENERAL_RECEIVE = "GENERAL_RECEIVE";
export const GENERAL_ERROR = "GENERAL_ERROR";
export const OVERALL_REQUEST = "OVERALL_REQUEST";
export const OVERALL_RECEIVE = "OVERALL_RECEIVE";
export const OVERALL_ERROR = "OVERALL_ERROR";
export const CHAMPSLIST_REQUEST = "CHAMPSLIST_REQUEST";
export const CHAMPSLIST_RECEIVE = "CHAMPSLIST_RECEIVE";
export const CHAMPSLIST_ERROR = "CHAMPSLIST_ERROR";
export const CHAMPSDATA_REQUEST = "CHAMPSDATA_REQUEST";
export const CHAMPSDATA_RECEIVE = "CHAMPSDATA_RECEIVE";
export const CHAMPSDATA_ERROR = "CHAMPSDATA_ERROR";
export const CHAMP_REQUEST = "CHAMP_REQUEST";
export const CHAMP_RECEIVE = "CHAMP_RECEIVE";
export const CHAMP_ERROR = "CHAMP_ERROR";
export const MATCHUP_REQUEST = "MATCHUP_REQUEST";
export const MATCHUP_RECEIVE = "MATCHUP_RECEIVE";
export const MATCHUP_ERROR = "MATCHUP_ERROR";
export const SET_ROLES_FILTER = "SET_ROLES_FILTER";
export const SET_TEXT_FILTER = "SET_TEXT_FILTER";
export const SORT_BY = "SORT_BY";
export const TOGGLE_ORDER = "TOGGLE_ORDER";

// default rolesFilter
export const SHOW_ALL = "SHOW_ALL";

export const sortBy = (sortProp, reverseOrder) => (dispatch, getState) => {
  const { selectedElo } = getState();
  if (getState().eloDetailsByElo[selectedElo].sortProp === sortProp) {
    return;
  }
  dispatch({
    type: SORT_BY,
    elo: selectedElo,
    sortProp,
    reverseOrder
  });
};

export const toggleOrder = () => (dispatch, getState) => {
  const elo = getState().selectedElo;
  dispatch({
    type: TOGGLE_ORDER,
    elo
  });
};

export const setRolesFilter = rolesFilter => (dispatch, getState) => {
  const { selectedElo } = getState();
  if (getState().eloDetailsByElo[selectedElo].rolesFilter === rolesFilter) {
    return;
  }
  dispatch({
    type: SET_ROLES_FILTER,
    elo: selectedElo,
    rolesFilter
  });
};

export const setTextFilter = textFilter => (dispatch, getState) => {
  const { selectedElo } = getState();
  if (getState().eloDetailsByElo[selectedElo].textFilter === textFilter) {
    return;
  }
  dispatch({
    type: SET_TEXT_FILTER,
    elo: selectedElo,
    textFilter
  });
};

export const selectElo = elo => (dispatch, getState) => {
  if (getState().selectedElo === elo) {
    return;
  }
  dispatch({
    type: SELECT_ELO,
    elo
  });
};

export const selectChamp = (elo, champName) => (dispatch, getState) => {
  const { selectedElo } = getState();
  if (getState().eloDetailsByElo[selectedElo].selectedChamp === champName) {
    return;
  }
  dispatch({
    type: SELECT_CHAMP,
    elo,
    selectedChamp: champName
  });
};

export const selectRole = (elo, champName, role) => (dispatch, getState) => {
  const state = getState();
  const { selectedChamp, champions } = state.eloDetailsByElo[state.selectedElo];
  if (
    champions[selectedChamp] &&
    champions[selectedChamp].selectedRole === role
  ) {
    return;
  }
  dispatch({
    type: SELECT_ROLE,
    elo,
    champName,
    selectedRole: role
  });
};

const requestGeneral = elo => ({
  type: GENERAL_REQUEST,
  elo
});

const receiveGeneral = (elo, response) => ({
  type: GENERAL_RECEIVE,
  elo,
  general: response.data
});

const errorGeneral = (elo, error) => ({
  type: GENERAL_ERROR,
  elo,
  generalError: error
});

const requestOverall = elo => ({
  type: OVERALL_REQUEST,
  elo
});

const receiveOverall = (elo, response) => ({
  type: OVERALL_RECEIVE,
  elo,
  overall: response.data
});

const errorOverall = (elo, error) => ({
  type: OVERALL_ERROR,
  elo,
  overallError: error
});

const requestChampsList = elo => ({
  type: CHAMPSLIST_REQUEST,
  elo
});

const receiveChampsList = (elo, response) => ({
  type: CHAMPSLIST_RECEIVE,
  elo,
  champsList: response.data
});

const errorChampsList = (elo, error) => ({
  type: CHAMPSLIST_ERROR,
  elo,
  champsListError: error
});

const requestChampsData = elo => ({
  type: CHAMPSDATA_REQUEST,
  elo
});

const receiveChampsData = (elo, response) => ({
  type: CHAMPSDATA_RECEIVE,
  elo,
  champsData: response.data
});

const errorChampsData = (elo, error) => ({
  type: CHAMPSDATA_ERROR,
  elo,
  champsDataError: error
});

const requestChamp = (elo, champName, id) => ({
  type: CHAMP_REQUEST,
  elo,
  champName,
  id
});

const receiveChamp = (elo, champName, response) => ({
  type: CHAMP_RECEIVE,
  elo,
  champName,
  champData: response.data
});

const errorChamp = (elo, champName, error) => ({
  type: CHAMP_ERROR,
  elo,
  champName,
  champError: error
});

const requestMatchup = (elo, champName, enemyName) => ({
  type: MATCHUP_REQUEST,
  elo,
  champName,
  enemyName
});

const receiveMatchup = (elo, champName, enemyName, response) => ({
  type: MATCHUP_RECEIVE,
  elo,
  champName,
  enemyName,
  matchupData: response.data
});

const errorMatchup = (elo, champName, enemyName, error) => ({
  type: MATCHUP_ERROR,
  elo,
  champName,
  enemyName,
  matchupError: error
});

export const fetchGeneral = () => (dispatch, getState, { axiosGg }) => {
  const elo = getState().selectedElo;
  if (getState().eloDetailsByElo[elo]) {
    if (getState().eloDetailsByElo[elo].general.elo) {
      return;
    }
  }
  dispatch(requestGeneral(elo));
  return axiosGg(`/general/${elo.toUpperCase()}`)
    .then(response => {
      dispatch(receiveGeneral(elo, response));
    })
    .catch(error => {
      // return a promise so getInitialProps await for it if we are on server
      if (error.response && error.response.status === 500) {
        return Promise.resolve(
          dispatch(
            errorGeneral(
              elo,
              "Sorry, We Have A Problem Fetching General Data, Try Again Later."
            )
          )
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorGeneral(
              elo,
              "Can't Fetch General Site Info, Please Check Your Connection"
            )
          )
        );
      }
    });
};

export const fetchOverall = () => (dispatch, getState, { axiosGg }) => {
  const elo = getState().selectedElo;
  if (getState().eloDetailsByElo[elo]) {
    if (getState().eloDetailsByElo[elo].overall.elo) {
      return;
    }
  }
  dispatch(requestOverall(elo));
  return axiosGg(`/overall/${elo.toUpperCase()}`)
    .then(response => {
      dispatch(receiveOverall(elo, response));
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        return Promise.resolve(
          dispatch(
            errorOverall(
              elo,
              "Sorry, We Have A Problem Fetching Champions Overall Performance Data, Try Again Later."
            )
          )
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorOverall(
              elo,
              "Can't Fetch Champions Overall Performance Data, Please Check Your Connection."
            )
          )
        );
      }
    });
};

export const fetchChampsList = () => (dispatch, getState, { axiosGg }) => {
  const elo = getState().selectedElo;
  if (getState().eloDetailsByElo[elo]) {
    if (getState().eloDetailsByElo[elo].champsList.length) {
      return;
    }
  }
  dispatch(requestChampsList(elo));
  return axiosGg(`/champsList/${elo.toUpperCase()}`)
    .then(response => {
      dispatch(receiveChampsList(elo, response));
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        return Promise.resolve(
          dispatch(
            errorChampsList(
              elo,
              "Sorry, We Have A Problem Fetching Champions List, Try Again Later."
            )
          )
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorChampsList(
              elo,
              "Can't Fetch Champions List, Please Check Your Connection."
            )
          )
        );
      }
    });
};

export const fetchChampsData = () => (dispatch, getState, { axiosGg }) => {
  const elo = getState().selectedElo;
  if (getState().eloDetailsByElo[elo]) {
    if (getState().eloDetailsByElo[elo].champsData.length) {
      return;
    }
  }
  dispatch(requestChampsData(elo));
  return axiosGg(`/champsData/${elo.toUpperCase()}`)
    .then(response => {
      dispatch(receiveChampsData(elo, response));
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        return Promise.resolve(
          dispatch(
            errorChampsData(
              elo,
              "Sorry, We Can't Fetch Champions Data, Try Again Later."
            )
          )
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorChampsData(
              elo,
              "Can't Fetch Champions Data, Please Check Your Connection."
            )
          )
        );
      }
    });
};

export const fetchChamp = (elo, champName, id) => (
  dispatch,
  getState,
  { axiosGg }
) => {
  if (
    getState().eloDetailsByElo[elo] &&
    getState().eloDetailsByElo[elo].champions[champName]
  ) {
    if (getState().eloDetailsByElo[elo].champions[champName].champData.length) {
      return;
    }
  }
  dispatch(requestChamp(elo, champName, id));
  return axiosGg(`/champData/${elo.toUpperCase()}/${id}`)
    .then(response => {
      dispatch(receiveChamp(elo, champName, response));
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        return Promise.resolve(
          dispatch(
            errorChamp(
              elo,
              champName,
              "Sorry, We Have A Problem Fetching Champion Data, Try Again Later."
            )
          )
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorChamp(
              elo,
              champName,
              "Can't Fetch Champion Data, Please Check Your Connection."
            )
          )
        );
      }
    });
};

export const fetchMatchup = (champName, enemyName, champId, enemyId, role) => (
  dispatch,
  getState,
  { axiosGg }
) => {
  const elo = getState().selectedElo;
  if (
    getState().eloDetailsByElo[elo].champions[champName].matchups[enemyName]
  ) {
    if (
      getState().eloDetailsByElo[elo].champions[champName].matchups[enemyName]
        .matchupData.gamesPlayed
    ) {
      return;
    }
  }
  dispatch(requestMatchup(elo, champName, enemyName));
  return axiosGg(`/matchup/${elo.toUpperCase()}/${champId}/${enemyId}/${role}`)
    .then(response => {
      dispatch(receiveMatchup(elo, champName, enemyName, response));
    })
    .catch(error => {
      if (error.response && error.response.status === 500) {
        return Promise.resolve(
          dispatch(
            errorMatchup(
              elo,
              champName,
              enemyName,
              "Sorry, We Have A Problem Fetching Matchup Data, Try Again Later."
            )
          )
        );
      } else {
        return Promise.resolve(
          dispatch(
            errorMatchup(
              elo,
              champName,
              enemyName,
              "Can't Fetch Matchup Data, Please Check Your Connection."
            )
          )
        );
      }
    });
};
