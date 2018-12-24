import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";

import { getModifiedChampsList } from "../../selectors/ggSelectors";
import { ggRoles } from "../../constants/ggConstants";

import ChampsAutoComplete from "../common/ChampsAutoComplete";

class SearchChamp extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    champsList: PropTypes.array.isRequired,
    champsListError: PropTypes.string.isRequired
  };

  state = { champQuery: "", champQueryError: "" };

  handleInputChange = e => {
    this.setState({
      champQuery: e.target.value
    });
    const { champQueryError } = this.state;
    if (champQueryError && e.target.value) {
      this.setState({
        champQueryError: ""
      });
    }
  };

  handleChampSelect = (champName, champion) => {
    const { selectedElo } = this.props;
    const role = ggRoles[champion.roles[0].role];
    champName = champName.replace(/([^a-z]+)/gi, "").toLowerCase();
    this.setState({
      champQuery: ""
    });
    Router.push(
      `/champion?elo=${selectedElo}&champName=${champName}&role=${role}`,
      `/champion/${selectedElo}/${champName}/${role}`
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    const { selectedElo, champsList, champsListError } = this.props;
    if (champsListError) {
      return;
    }
    const champQuery = this.state.champQuery
      .replace(/([^a-z]+)/gi, "")
      .toLowerCase();
    if (!champQuery) {
      return this.setState({
        champQueryError: "Please, enter a champion name."
      });
    }

    const champion = champsList.find(
      champ =>
        champ.gameName.replace(/([^a-z]+)/gi, "").toLowerCase() === champQuery
    );

    if (!champion) {
      return this.setState({
        champQueryError: "Champion doesn't exist"
      });
    }

    const role = ggRoles[champion.roles[0].role];

    this.setState({
      champQuery: ""
    });
    Router.push(
      `/champion?elo=${selectedElo}&champName=${champQuery}&role=${role}`,
      `/champion/${selectedElo}/${champQuery}/${role}`
    );
  };

  render() {
    const { handleInputChange, handleSubmit, handleChampSelect } = this;
    const { champQuery, champQueryError } = this.state;
    return (
      <form className="field" onSubmit={handleSubmit}>
        <ChampsAutoComplete
          handleChampSelect={handleChampSelect}
          handleInputChange={handleInputChange}
          champQuery={champQuery}
          champQueryError={champQueryError}
          menuMaxHeight="51%"
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo } = state;
  const { champsListError } = state.eloDetailsByElo[selectedElo] || {
    champsListError: ""
  };
  const champsList = getModifiedChampsList(state);
  return {
    selectedElo,
    champsListError,
    champsList
  };
};

export default connect(mapStateToProps)(SearchChamp);
