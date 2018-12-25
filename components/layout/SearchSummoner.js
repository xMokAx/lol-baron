import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import classNames from "classnames";
import XRegExp from "xregexp";

import { regions } from "../../constants/lolConstants";

import Select from "../common/Select";

class SearchSummoner extends Component {
  static propTypes = {
    selectedRegion: PropTypes.string.isRequired,
    selectedSummoner: PropTypes.string.isRequired
  };

  state = {
    summonerQuery: "",
    summonerQueryError: ""
  };

  handleInputChange = e => {
    this.setState({
      summonerQuery: e.target.value
    });
    if (this.state.summonerQueryError && e.target.value) {
      this.setState({
        summonerQueryError: ""
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let region = this.Select.select.value;
    let summonerQuery = this.state.summonerQuery
      .toLowerCase()
      .replace(new XRegExp("([^0-9_.\\p{L}]+)", "giu"), "");

    if (!summonerQuery) {
      this.setState({
        summonerQueryError: "Please, enter a summoner name."
      });
      return;
    }

    this.setState({
      summonerQuery: ""
    });

    Router.push(
      `/summoner?region=${region}&summonerName=${summonerQuery}`,
      `/summoner/${region}/${summonerQuery}`
    );
  };

  render() {
    const { selectedRegion } = this.props;
    const { handleInputChange, handleSubmit } = this;
    const { summonerQuery, summonerQueryError } = this.state;
    return (
      <form className="field" onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control">
            <div
              className={classNames(
                "select",
                summonerQueryError && "is-danger"
              )}
            >
              <Select
                options={Object.keys(regions)}
                defaultValue={selectedRegion}
                ariaLabel="select region"
                ref={node => (this.Select = node)}
              />
            </div>
          </div>
          <div className="control is-expanded">
            <input
              aria-label="search summoner"
              value={summonerQuery}
              className={classNames(
                "input is-fullwidth ",
                summonerQueryError && "is-danger"
              )}
              type="text"
              name="search summoner"
              placeholder="Summoner Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="control">
            <button
              aria-label="search summoner"
              type="submit"
              className={classNames(
                "button has-text-dark",
                summonerQueryError ? "is-danger" : "is-primary"
              )}
            >
              <i className="material-icons">search</i>
            </button>
          </div>
        </div>

        {summonerQueryError && (
          <p className="help is-danger">{summonerQueryError}</p>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { selectedRegion, selectedSummoner } = state;
  return {
    selectedRegion,
    selectedSummoner
  };
};

export default connect(mapStateToProps)(SearchSummoner);
