import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";

import { ggElo, ggRoles } from "../../constants/ggConstants";
import { selectElo, SHOW_ALL } from "../../actions/ggActions";

import Select from "../common/Select";

class SelectElo extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    selectElo: PropTypes.func.isRequired
  };

  handleChange = e => {
    const { selectElo, eloDetailsByElo, selectedElo } = this.props;
    const elo = e.target.value;
    selectElo(elo);

    if (Router.pathname === "/champions") {
      Router.push(`/champions?elo=${elo}`, `/champions/${elo}`);
    } else if (Router.pathname === "/overview") {
      Router.push(`/overview?elo=${elo}`, `/overview/${elo}`);
    } else if (Router.pathname === "/statistics") {
      const {
        sortProp,
        reverseOrder,
        rolesFilter,
        textFilter
      } = eloDetailsByElo[elo]
        ? eloDetailsByElo[elo]
        : {
            sortProp: "winRate",
            reverseOrder: true,
            rolesFilter: SHOW_ALL,
            textFilter: ""
          };
      const txtFilter = textFilter ? `&search=${textFilter}` : "";
      const order = reverseOrder ? "descend" : "ascend";
      const filterRole =
        rolesFilter === SHOW_ALL ? "all" : ggRoles[rolesFilter];
      Router.push(
        `/statistics?elo=${elo}&sortBy=${sortProp}&order=${order}&roleFilter=${filterRole}${txtFilter}`,
        `/statistics/${elo}?sortBy=${sortProp}&order=${order}&roleFilter=${filterRole}${txtFilter}`
      );
    } else if (Router.pathname === "/champion") {
      const { selectedChamp, selectedRole } = this.props;
      const role = ggRoles[selectedRole];
      Router.push(
        `/champion?elo=${elo}&champName=${selectedChamp}&role=${role}`,
        `/champion/${elo}/${selectedChamp}/${role}`
      );
    }
  };

  render() {
    const { selectedElo } = this.props;
    const { handleChange } = this;
    return (
      <div className="select is-size-6">
        <Select
          options={ggElo}
          onChange={handleChange}
          value={selectedElo}
          ariaLabel="select elo"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo, eloDetailsByElo } = state;
  const {
    sortProp,
    reverseOrder,
    rolesFilter,
    textFilter,
    selectedChamp
  } = state.eloDetailsByElo[selectedElo]
    ? state.eloDetailsByElo[selectedElo]
    : {
        sortProp: "winRate",
        reverseOrder: true,
        rolesFilter: SHOW_ALL,
        textFilter: "",
        selectedChamp: ""
      };
  const selectedRole =
    state.eloDetailsByElo[selectedElo] &&
    state.eloDetailsByElo[selectedElo].champions[selectedChamp]
      ? state.eloDetailsByElo[selectedElo].champions[selectedChamp].selectedRole
      : "";
  return {
    eloDetailsByElo,
    selectedElo,
    sortProp,
    reverseOrder,
    rolesFilter,
    textFilter,
    selectedChamp,
    selectedRole
  };
};

const mapDispatchToProps = { selectElo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectElo);
