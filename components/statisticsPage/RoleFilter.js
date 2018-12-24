import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";

import { setRolesFilter, SHOW_ALL } from "../../actions/ggActions";
import { ggRoles } from "../../constants/ggConstants";

export class RoleFilter extends Component {
  static propTypes = {
    rolesFilter: PropTypes.string.isRequired,
    setRolesFilter: PropTypes.func.isRequired
  };

  handleChange = e => {
    const { setRolesFilter } = this.props;
    const val = e.target.value;
    setRolesFilter(val);

    const roleFilter = val === SHOW_ALL ? "all" : ggRoles[val];
    const { pathname, query } = Router;
    const { elo } = query;
    const asQuery = { ...query };
    delete asQuery.elo;
    Router.replace(
      {
        pathname,
        query: {
          ...query,
          roleFilter
        }
      },
      {
        pathname: `${pathname}/${elo}`,
        query: {
          ...asQuery,
          roleFilter
        }
      }
    );
  };

  render() {
    return (
      <div className="select">
        <select
          className="has-background-black-ter is-capitalized"
          value={this.props.rolesFilter}
          aria-label="select elo"
          onChange={this.handleChange}
        >
          <option value={SHOW_ALL} key={SHOW_ALL}>
            Show All
          </option>
          {Object.keys(ggRoles).map(role => (
            <option value={role} key={role}>
              {ggRoles[role] === "adc" ? "ADC" : ggRoles[role]}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { rolesFilter } = state.eloDetailsByElo[state.selectedElo];
  return {
    rolesFilter
  };
};

const mapDispatchToProps = {
  setRolesFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleFilter);
