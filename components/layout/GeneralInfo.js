import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchGeneral } from "../../actions/ggActions";

import EloSelect from "./EloSelect";
import Loading from "../common/Loading";

const GeneralInfo = ({
  fetchGeneral,
  general,
  isFetchingGeneral,
  generalError
}) => {
  if (isFetchingGeneral) {
    return (
      <React.Fragment>
        <div className="column is-narrow">
          <Loading className="loader-lg mgx-auto loader-color-light" />
        </div>
        <div className="column is-narrow is-flex flex-align-center">
          <span className="has-text-grey-light mgr-s">League: </span>
          <EloSelect />
        </div>
      </React.Fragment>
    );
  }

  if (generalError) {
    return (
      <React.Fragment>
        <div className="column is-12-mobile is-7-tablet">
          <div className="notification is-danger is-flex flex-vertical flex-justify-center flex-align-center">
            <strong className="mgb-1">{generalError}</strong>
            <button
              className="button is-dark"
              onClick={() => {
                fetchGeneral();
              }}
            >
              Retry
            </button>
          </div>
        </div>
        <div className="column is-narrow is-flex flex-align-center">
          <span className="has-text-grey-light mgr-s">League: </span>
          <EloSelect />
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className="column is-narrow">
        <span className="has-text-grey-light">Patch: </span>
        <strong>{general.patch}</strong>
      </div>
      <div className="column is-narrow">
        <span className="has-text-grey-light">Champions Analyzed: </span>
        <strong>{general.championCount}</strong>
      </div>
      <div className="column is-narrow is-flex flex-align-center">
        <span className="has-text-grey-light mgr-s">League: </span>
        <EloSelect />
      </div>
    </React.Fragment>
  );
};

GeneralInfo.propTypes = {
  general: PropTypes.object.isRequired,
  isFetchingGeneral: PropTypes.bool.isRequired,
  generalError: PropTypes.string.isRequired,
  fetchGeneral: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { general, isFetchingGeneral, generalError } = state.eloDetailsByElo[
    state.selectedElo
  ]
    ? state.eloDetailsByElo[state.selectedElo]
    : {
        general: {},
        isFetchingGeneral: true,
        generalError: ""
      };

  return {
    general,
    isFetchingGeneral,
    generalError
  };
};

const mapDispatchToProps = {
  fetchGeneral
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralInfo);
