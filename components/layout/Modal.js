import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import XRegExp from "xregexp";

import { ggElo } from "../../constants/ggConstants";
import { regions } from "../../constants/lolConstants";
import { fetchChamp, selectRole } from "../../actions/ggActions";
import { fetchSummoner } from "../../actions/lolActions";

import Select from "../common/Select";
import ChampsAutoComplete from "../common/ChampsAutoComplete";

class Modal extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    selectedRegion: PropTypes.string.isRequired,
    isModalActive: PropTypes.bool.isRequired,
    handleOpenModal: PropTypes.func.isRequired
  };

  state = {
    champQuery: "",
    champQueryError: "",
    prefRegion: this.props.selectedRegion,
    prefElo: this.props.selectedElo,
    prefSummoner: "",
    prefChamp: {},
    isFetching: false,
    success: "",
    error: ""
  };

  handleChampInputChange = e => {
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
    this.setState({
      prefChamp: champion
    });
    this.setState({
      champQuery: ""
    });
  };

  handleSummonerInputChange = e => {
    this.setState({
      prefSummoner: e.target.value
    });
  };

  handleSelectRegion = e => {
    this.setState({
      prefRegion: e.target.value
    });
  };

  handleSelectElo = e => {
    this.setState({
      prefElo: e.target.value
    });
  };

  handleBack = () => {
    this.setState({ error: "" }, () => {
      this.SelectRegion.select.focus();
    });
  };

  handleCloseError = () => {
    this.props.handleOpenModal();
    this.setState({
      error: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { prefRegion, prefSummoner, prefElo, prefChamp } = this.state;
    prefSummoner = prefSummoner
      .toLowerCase()
      .replace(new XRegExp("([^0-9_.\\p{L}]+)", "giu"), "");

    this.setState({
      isFetching: true
    });
    window.localStorage.setItem(
      "pref",
      JSON.stringify({
        prefRegion,
        prefSummoner,
        prefElo,
        prefChamp
      })
    );
    if (prefChamp.gameName) {
      const { fetchChamp, selectRole } = this.props;
      const champName = prefChamp.gameName
        .replace(/([^a-z]+)/gi, "")
        .toLowerCase();
      fetchChamp(prefElo, champName, prefChamp.id);
      selectRole(prefElo, champName, prefChamp.roles[0].role);
    }
    if (prefSummoner) {
      const { fetchSummoner } = this.props;
      fetchSummoner(prefRegion, prefSummoner);
    }

    axios
      .post("/pref", {
        prefRegion,
        prefElo
      })
      .then(res => {
        this.setState(
          {
            success: "Preferences set successfully."
          },
          () => {
            setTimeout(() => {
              this.setState({
                success: ""
              });
              this.props.handleOpenModal();
            }, 1000);
          }
        );
      })
      .catch(err => {
        this.setState(
          {
            error: "Something went wrong, please try again."
          },
          () => {
            this.backButton.focus();
          }
        );
      });
  };

  handleReset = () => {
    this.setState({
      champQuery: "",
      champQueryError: "",
      prefRegion: this.props.selectedRegion,
      prefElo: this.props.selectedElo,
      prefSummoner: "",
      prefChamp: {},
      isFetching: false,
      success: "",
      error: ""
    });
  };

  handleModalKeyDown = e => {
    const { firstTabStop, lastTabStop, backButton } = this;
    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          if (lastTabStop) {
            lastTabStop.focus();
          } else if (backButton) {
            backButton.focus();
          }
        }

        // TAB
      } else {
        if (
          document.activeElement === lastTabStop ||
          document.activeElement === backButton
        ) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      this.props.handleOpenModal();
      if (this.state.error) {
        this.setState({
          error: ""
        });
      }
    }
  };

  render() {
    const { isModalActive, handleOpenModal } = this.props;
    const {
      champQuery,
      champQueryError,
      prefRegion,
      prefSummoner,
      prefElo,
      prefChamp,
      isFetching,
      success,
      error
    } = this.state;
    const {
      handleChampInputChange,
      handleChampSelect,
      handleSummonerInputChange,
      handleSelectRegion,
      handleSelectElo,
      handleSubmit,
      handleReset,
      handleBack,
      handleCloseError,
      handleModalKeyDown
    } = this;
    return (
      <div
        className={classNames("modal", isModalActive && "is-active")}
        onKeyDown={handleModalKeyDown}
      >
        <div className="modal-background" onClick={handleOpenModal} />
        {success ? (
          <div className="modal-card">
            <div className="modal-card-body has-text-centered">
              <p className="mgb-2">
                <strong className="has-text-primary">{success}</strong>
              </p>
              <span className="icon is-large">
                <i className="material-icons md-48 is-circle has-text-dark has-background-primary">
                  check_circle
                </i>
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-weight-bold">
                Preferences
              </p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={handleCloseError}
                ref={node => (this.firstTabStop = node)}
              />
            </header>
            <div className="modal-card-body has-text-centered">
              <p className="mgb-2">
                <strong className="has-text-danger">{error}</strong>
              </p>
              <button
                type="button"
                className="button is-danger is-medium is-circle"
                aria-label="go back"
                onClick={handleBack}
                ref={node => (this.backButton = node)}
              >
                <span className="icon">
                  <i className="material-icons md-48">arrow_back</i>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <form className="modal-card" onSubmit={handleSubmit}>
            <header className="modal-card-head">
              <p className="modal-card-title has-text-weight-bold">
                Preferences
              </p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={handleOpenModal}
                ref={node => (this.firstTabStop = node)}
              />
            </header>
            <section className="modal-card-body">
              <p className="title is-6">Choose your preferences:</p>
              <div className="field is-grouped">
                <div className="control">
                  <div className="select is-small-mobile">
                    <Select
                      options={Object.keys(regions)}
                      value={prefRegion}
                      ariaLabel="select region"
                      onChange={handleSelectRegion}
                      ref={node => (this.SelectRegion = node)}
                    />
                  </div>
                </div>
                <div className="control is-expanded">
                  <input
                    value={prefSummoner}
                    className="input is-fullwidth is-small-mobile"
                    type="text"
                    name="search summoner"
                    placeholder="Summoner Name"
                    aria-label="summoner name"
                    onChange={handleSummonerInputChange}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <div className="select is-small-mobile">
                    <Select
                      options={ggElo}
                      value={prefElo}
                      ariaLabel="select elo"
                      onChange={handleSelectElo}
                    />
                  </div>
                </div>
                <div className="control is-expanded">
                  <ChampsAutoComplete
                    handleInputChange={handleChampInputChange}
                    handleChampSelect={handleChampSelect}
                    champQuery={champQuery}
                    champQueryError={champQueryError}
                    menuMaxHeight="31%"
                  />
                </div>
              </div>

              <div className="is-capitalized">
                {prefRegion && (
                  <p>
                    Region:{" "}
                    <strong className="has-text-primary">{prefRegion}</strong>
                  </p>
                )}
                {prefSummoner && (
                  <p>
                    Summoner:{" "}
                    <strong className="has-text-primary">{prefSummoner}</strong>
                  </p>
                )}
                {prefElo && (
                  <p>
                    Elo: <strong className="has-text-primary">{prefElo}</strong>
                  </p>
                )}
                {prefChamp.gameName && (
                  <p>
                    Champ:{" "}
                    <strong className="has-text-primary">
                      {prefChamp.gameName}
                    </strong>
                  </p>
                )}
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className={classNames(
                  "button is-primary",
                  isFetching && "loading"
                )}
                type="submit"
              >
                Save changes
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="button is-danger"
                ref={node => (this.lastTabStop = node)}
              >
                Reset
              </button>
            </footer>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedRegion, selectedElo } = state;
  return {
    selectedElo,
    selectedRegion
  };
};

const mapDispatchToProps = {
  fetchSummoner,
  fetchChamp,
  selectRole
};

// arguments: mapStateToProps, mapDispatchToProps, mergProps, options
// options is an object, withRef allow us to get the wrapped Instance ref using getWrappedInstance()
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(Modal);
