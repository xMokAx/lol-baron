import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import classNames from "classnames";

import { sortBy, toggleOrder } from "../../actions/ggActions";

class TableHeading extends Component {
  static propTypes = {
    sortByProp: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    sortProp: PropTypes.string.isRequired,
    reverseOrder: PropTypes.bool.isRequired,
    rolesFilter: PropTypes.string.isRequired,
    sortBy: PropTypes.func.isRequired,
    toggleOrder: PropTypes.func.isRequired
  };

  defaultReverseOrder =
    this.props.sortByProp === "gameName" ||
    this.props.sortByProp === "role" ||
    this.props.sortByProp === "positions.overallPerformanceScore" ||
    this.props.sortByProp === "deaths"
      ? false
      : true;

  componentWillReceiveProps(nextProps) {
    const { sortByProp, selectedElo, sortProp, reverseOrder } = this.props;
    if (
      selectedElo === nextProps.selectedElo &&
      sortByProp === nextProps.sortProp
    ) {
      if (
        sortProp !== nextProps.sortProp ||
        reverseOrder !== nextProps.reverseOrder
      ) {
        const order = nextProps.reverseOrder ? "descend" : "ascend";
        const { pathname, query } = Router;
        const { elo } = query;
        const asQuery = { ...query };
        delete asQuery.elo;
        Router.replace(
          {
            pathname,
            query: {
              ...query,
              sortBy: sortByProp,
              order
            }
          },
          {
            pathname: `${pathname}/${elo}`,
            query: {
              ...asQuery,
              sortBy: sortByProp,
              order
            }
          }
        );
      }
    }
  }

  handleClick = () => {
    const { sortBy, toggleOrder, sortByProp, sortProp } = this.props;
    if (sortProp === sortByProp) {
      toggleOrder();
    } else {
      sortBy(sortByProp, this.defaultReverseOrder);
    }
  };

  render() {
    const {
      sortByProp,
      sortProp,
      reverseOrder,
      rolesFilter,
      children
    } = this.props;
    const isSelected = sortProp === sortByProp;
    const shouldDisableRole =
      sortByProp === "role" && rolesFilter !== "SHOW_ALL";
    return (
      <th className="is-paddingless sticky-heading">
        <button
          className={classNames(
            "is-flex flex-vertical button pd-s is-radiusless fullwidth is-size-6-7 has-text-weight-bold table-button",
            isSelected && "is-selected has-text-warning"
          )}
          disabled={shouldDisableRole}
          onClick={this.handleClick}
        >
          {children}
          {isSelected && (
            <i className="material-icons">
              {this.defaultReverseOrder
                ? reverseOrder
                  ? "arrow_drop_down"
                  : "arrow_drop_up"
                : reverseOrder
                  ? "arrow_drop_up"
                  : "arrow_drop_down"}
            </i>
          )}
        </button>
      </th>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo } = state;
  const { sortProp, reverseOrder, rolesFilter } = state.eloDetailsByElo[
    selectedElo
  ];
  return {
    selectedElo,
    sortProp,
    reverseOrder,
    rolesFilter
  };
};

const mapDispatchToProps = {
  sortBy,
  toggleOrder
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeading);
