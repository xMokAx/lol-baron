import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import Autocomplete from "react-autocomplete";

import { fetchChampsList } from "../../actions/ggActions";
import { getModifiedChampsList } from "../../selectors/ggSelectors";

import ChampImage from "../common/ChampImage";

class ChampsAutoComplete extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    champsList: PropTypes.array.isRequired,
    champsListError: PropTypes.string.isRequired,
    isFetchingChampsList: PropTypes.bool.isRequired,
    champQuery: PropTypes.string.isRequired,
    champQueryError: PropTypes.string.isRequired,
    fetchChampsList: PropTypes.func.isRequired,
    handleChampSelect: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    menuMaxHeight: PropTypes.string.isRequired
  };

  render() {
    const {
      champsList,
      champsListError,
      isFetchingChampsList,
      fetchChampsList,
      champQuery,
      champQueryError,
      handleChampSelect,
      handleInputChange,
      menuMaxHeight
    } = this.props;
    const hasError = champQueryError || champsListError;
    const isModal = menuMaxHeight === "31%" ? true : false;
    return (
      <Fragment>
        <div
          className={classNames(
            "field",
            isModal ? "is-expanded" : "has-addons"
          )}
        >
          <Autocomplete
            wrapperProps={{
              className: classNames(
                "control is-expanded is-block",
                isFetchingChampsList && "is-loading"
              )
            }}
            inputProps={{
              placeholder: "Champion Name",
              "aria-label": isModal ? "champion name" : "search champion",
              className: classNames(
                "input is-fullwidth",
                hasError && "is-danger",
                isModal && "is-small-mobile"
              )
            }}
            menuStyle={{
              width: "min-content",
              zIndex: "100",
              borderRadius: "3px",
              background: "rgba(0, 0, 0, 0.9)",
              position: "fixed",
              overflow: "auto",
              maxHeight: menuMaxHeight // TODO: don't cheat, let it flow to the bottom
            }}
            open={!!champQuery}
            autoHighlight={true}
            value={champQuery}
            onChange={handleInputChange}
            onSelect={handleChampSelect}
            shouldItemRender={(champ, champName) =>
              champ.gameName.toLowerCase().slice(0, champName.length) ===
              champName.toLowerCase()
            }
            getItemValue={champ => champ.gameName}
            items={champsList}
            renderItem={(champ, isHighlighted) => (
              <div
                key={champ.id}
                className={classNames(
                  "is-flex pd-1 flex-align-center cursor-pointer",
                  isHighlighted && "has-background-primary has-text-black"
                )}
              >
                <ChampImage
                  champ={champ}
                  className="image is-48x48 mgr-1"
                  tooltip={false}
                />
                <span className="is-size-5-tablet has-text-weight-bold">
                  {champ.gameName}
                </span>
              </div>
            )}
          />
          {!isFetchingChampsList && !isModal && (
            <div className="control">
              <button
                aria-label="search summoner"
                type="submit"
                className={classNames(
                  "button has-text-dark",
                  hasError ? "is-danger" : "is-primary"
                )}
              >
                <i className="material-icons">search</i>
              </button>
            </div>
          )}
        </div>
        {champQueryError && <p className="help is-danger">{champQueryError}</p>}
        {champsListError && (
          <div className="help is-danger">
            <span className="mgr-s">
              Please check your connection and retry to fetch champions list to
              allow champions search
            </span>
            <button
              className="button is-danger is-small"
              onClick={fetchChampsList}
            >
              Retry
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo } = state;
  const { champsListError, isFetchingChampsList } = state.eloDetailsByElo[
    selectedElo
  ] || {
    champsListError: "",
    isFetchingChampsList: true
  };
  const champsList = getModifiedChampsList(state);
  return {
    selectedElo,
    champsListError,
    isFetchingChampsList,
    champsList
  };
};

const mapDispatchToProps = {
  fetchChampsList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChampsAutoComplete);
