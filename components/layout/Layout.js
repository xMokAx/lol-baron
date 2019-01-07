import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchChamp, selectRole } from "../../actions/ggActions";
import { fetchSummoner } from "../../actions/lolActions";

import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  state = {
    isModalActive: false,
    showConnectionStatus: false,
    online: undefined
  };

  componentDidMount() {
    if (!document.documentElement.classList.contains("wf-active")) {
      import("webfontloader").then(WebFont =>
        WebFont.load({
          google: {
            families: ["Lato:400", "Sura:700", "Material Icons"]
          }
        })
      );
    }
    if (window.localStorage.getItem("pref")) {
      const { prefChamp, prefSummoner, prefElo, prefRegion } = JSON.parse(
        window.localStorage.getItem("pref")
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
    }

    // to show the offline message when the website is in offline mode
    if (window.navigator.onLine === false) {
      this.setState({
        online: false,
        showConnectionStatus: true
      });
    } else {
      this.setState({
        online: true
      });
    }

    // to show the offline message when the user loses connection
    window.addEventListener("offline", e => {
      this.setState({
        online: false,
        showConnectionStatus: true
      });
    });

    // to show the online message when the user is back online
    window.addEventListener("online", e => {
      this.setState(
        {
          online: true,
          showConnectionStatus: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              showConnectionStatus: false
            });
          }, 1500);
        }
      );
    });
  }

  handleOpenModal = () => {
    const { isModalActive } = this.state;

    if (!isModalActive) {
      this.activeElement = document.activeElement;

      this.setState(
        {
          isModalActive: true
        },
        () => {
          this.Modal.SelectRegion.select.focus();
        }
      );
    } else {
      this.setState(
        {
          isModalActive: false
        },
        () => {
          this.activeElement.focus({ preventScroll: true });
        }
      );
    }
  };

  render() {
    const { children } = this.props;
    const { isModalActive, online, showConnectionStatus } = this.state;
    const { handleOpenModal } = this;

    return (
      <div className="hero is-fullheight container has-background-dark">
        <Header />

        <main className="hero-body pdx-0 pdy-2">
          <div className="container fullwidth has-text-centered">
            {children}
          </div>
        </main>
        <Footer />
        <button
          className="button is-primary pref-button is-rounded"
          onClick={handleOpenModal}
          aria-label="preferences"
          tabIndex="1"
        >
          <span className="icon">
            <i className="material-icons">settings</i>
          </span>
        </button>
        <Modal
          handleOpenModal={handleOpenModal}
          isModalActive={isModalActive}
          ref={connectedModal => {
            if (connectedModal) {
              return (this.Modal = connectedModal.getWrappedInstance());
            }
          }}
        />
        {showConnectionStatus && (
          <div
            className="connection-notification"
            style={{ backgroundColor: online ? "green" : "red" }}
          >
            <p>{online ? "Back Online" : "No Internet Connection"}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchSummoner,
  fetchChamp,
  selectRole
};

export default connect(
  null,
  mapDispatchToProps
)(Layout);
