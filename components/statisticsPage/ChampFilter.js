import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";

import { setTextFilter } from "../../actions/ggActions";

export class ChampFilter extends Component {
  static propTypes = {
    textFilter: PropTypes.string.isRequired,
    setTextFilter: PropTypes.func.isRequired
  };

  handleChange = e => {
    const search = e.target.value;
    this.props.setTextFilter(search);

    const { pathname, query } = Router;
    const { elo } = query;
    const asQuery = { ...query };
    delete asQuery.elo;
    Router.replace(
      {
        pathname,
        query: {
          ...query,
          search
        }
      },
      {
        pathname: `${pathname}/${elo}`,
        query: {
          ...asQuery,
          search
        }
      }
    );
  };

  render() {
    return (
      <input
        className="input has-background-black-ter"
        type="text"
        placeholder="Filter By Name"
        onChange={this.handleChange}
        value={this.props.textFilter}
      />
    );
  }
}

const mapStateToProps = state => ({
  textFilter: state.eloDetailsByElo[state.selectedElo].textFilter
});

const mapDispatchToProps = {
  setTextFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChampFilter);
