import React, { Component } from "react";
import PropTypes from "prop-types";

import MatchupListItem from "./MatchupListItem";
import TitleMain from "./TitleMain";

export default class MatchupsList extends Component {
  static propTypes = {
    matchups: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    champName: PropTypes.string.isRequired,
    children: PropTypes.object,
    className: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    matchupsCount: 5
  };

  showMoreMatchups = e => {
    const { matchups } = this.props;
    const { matchupsCount } = this.state;
    e.preventDefault();
    if (matchupsCount < matchups.length) {
      this.setState({
        matchupsCount: matchupsCount + 5
      });
    }
  };

  render() {
    const {
      matchups,
      title,
      champName,
      children,
      className = "",
      type
    } = this.props;
    const { matchupsCount } = this.state;
    const { showMoreMatchups } = this;
    const shownMatchups = matchups.filter((_matchup, i) => i < matchupsCount);
    const isAllShown = shownMatchups.length === matchups.length;
    return (
      <div
        className={`column is-12-mobile is-6-tablet is-6-desktop ${className}`}
      >
        <TitleMain title={title} />
        {children}
        {matchups.length ? (
          <table className="table skill-order is-striped is-borderless-y is-fullwidth is-narrow-x is-size-6-7 is-size-7-mobile is-size-6-desktop has-text-weight-semibold">
            <thead>
              <tr className="has-background-dark">
                <td>Enemy</td>
                <td>Performance Rate</td>
                <td>{champName} Win Rate</td>
              </tr>
            </thead>
            <tbody>
              {shownMatchups.map((matchup, i) => (
                <MatchupListItem key={i} matchup={matchup} type={type} />
              ))}
              {!isAllShown && (
                <tr>
                  <td colSpan="3" className="is-paddingless">
                    <button
                      className="button fullwidth is-primary has-text-weight-semibold"
                      onClick={showMoreMatchups}
                    >
                      <span className="icon">
                        <i className="material-icons" aria-hidden="true">
                          expand_more
                        </i>
                      </span>
                      <span>Show More Matchups</span>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="notification is-danger">
            <strong>No {title.replace(" That", "")}</strong>
          </div>
        )}
      </div>
    );
  }
}
