import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { ggRoles } from "../../constants/ggConstants";
import { getOverviewTableData } from "../../selectors/ggSelectors";

import OverviewTableRaw from "./OverviewTableRaw";

const OverviewTable = ({
  selectedElo,
  headers,
  roles,
  title,
  data,
  sortBy,
  order
}) => {
  return (
    <div className="column is-half-desktop is-10-tablet is-12-mobile pd-1">
      <h1 className="has-text-warning title is-5">{title}</h1>
      <table className="table is-fullwidth is-bordered is-borderless-y is-striped has-text-weight-semibold">
        <thead>
          <tr className="has-background-dark">
            <th>Role</th>
            <th className="has-text-info">{headers[0]}</th>
            <th className="has-text-danger">{headers[1]}</th>
          </tr>
        </thead>
        <tbody className="is-size-7-mobile is-size-6-7 text-vsm">
          {data.length
            ? roles.map((role, i) => {
                const { best, worst } = data[i];
                role = ggRoles[role];
                return (
                  <OverviewTableRaw
                    key={role}
                    bestData={best}
                    worstData={worst}
                    role={role}
                    title={title}
                    sortBy={sortBy}
                    order={order}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

OverviewTable.propTypes = {
  selectedElo: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  dataProp: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { selectedElo } = state;
  const { roles = [], data = [] } = getOverviewTableData(
    state,
    ownProps.dataProp
  );
  return {
    selectedElo,
    roles,
    data
  };
};

export default connect(mapStateToProps)(OverviewTable);
