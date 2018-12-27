import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import { withRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

import { SHOW_ALL } from "../../actions/ggActions";
import { ggRoles } from "../../constants/ggConstants";

import SearchSummoner from "./SearchSummoner";
import SearchChamp from "./SearchChamp";
import GeneralInfo from "./GeneralInfo";
import SummonersStored from "./SummonersStored";
import ChampsStored from "./ChampsStored";

class Header extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
    sortProp: PropTypes.string.isRequired,
    reverseOrder: PropTypes.bool.isRequired,
    rolesFilter: PropTypes.string.isRequired,
    textFilter: PropTypes.string.isRequired
  };

  state = {
    isMenuOpened: false
  };

  componentDidMount() {
    Router.events.on("routeChangeComplete", this.handleRouteChange);
  }

  componentWillUnmount() {
    Router.events.off("routeChangeComplete", this.handleRouteChange);
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuOpened: !prevState.isMenuOpened
    }));
  };

  handleRouteChange = url => {
    console.log("App is changing to: ", url);
    if (this.state.isMenuOpened) {
      this.toggleMenu();
    }
  };

  render() {
    const {
      router,
      selectedElo,
      sortProp,
      reverseOrder,
      rolesFilter,
      textFilter
    } = this.props;
    const order = reverseOrder ? "descend" : "ascend";
    const filterRole =
      rolesFilter === "SHOW_ALL" ? "all" : ggRoles[rolesFilter];
    const { isMenuOpened } = this.state;
    return (
      <header className="hero-head">
        <nav
          id="navbar"
          className="navbar has-shadow"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link href="/">
              <a tabIndex="1" className="navbar-item">
                <figure className="image is-32x32 mgr-s">
                  <img
                    src="/static/favicon/favicon-32x32.png"
                    alt="lolbaron logo"
                  />
                </figure>
                <strong>LOLBaron</strong>
              </a>
            </Link>

            <button
              className={classNames("button primary is-hidden-desktop", {
                "is-active": isMenuOpened
              })}
              style={{ height: "3.25rem", marginLeft: "auto" }}
              onClick={this.toggleMenu}
              aria-label="toggle menu"
              tabIndex="1"
            >
              <i className="material-icons">
                {isMenuOpened ? "close" : "menu"}
              </i>
            </button>
          </div>

          <div
            id="navbar-menu"
            className={classNames("navbar-menu", {
              "is-active": isMenuOpened
            })}
            tabIndex="1"
          >
            <hr className="dropdown-divider" />
            <Link href="/">
              <a
                tabIndex="1"
                className={classNames(
                  "navbar-item",
                  router.pathname === "/" && "is-active"
                )}
              >
                Home
              </a>
            </Link>
            <hr className="dropdown-divider" />
            <Link
              href={`/champions?elo=${selectedElo}`}
              as={`/champions/${selectedElo}`}
            >
              <a
                tabIndex="1"
                className={classNames(
                  "navbar-item",
                  router.pathname === `/champions` && "is-active"
                )}
              >
                Champions
              </a>
            </Link>
            <hr className="dropdown-divider" />
            <Link
              href={`/overview?elo=${selectedElo}`}
              as={`/overview/${selectedElo}`}
            >
              <a
                tabIndex="1"
                className={classNames(
                  "navbar-item",
                  router.pathname === "/overview" && "is-active"
                )}
              >
                Overview
              </a>
            </Link>
            <hr className="dropdown-divider" />
            <Link
              href={`/statistics?elo=${selectedElo}&sortBy=${sortProp}&order=${order}&roleFilter=${filterRole}${textFilter &&
                `&search=${textFilter}`}`}
              as={`/statistics/${selectedElo}?sortBy=${sortProp}&order=${order}&roleFilter=${filterRole}${textFilter &&
                `&search=${textFilter}`}`}
            >
              <a
                tabIndex="1"
                className={classNames(
                  "navbar-item",
                  router.pathname === "/statistics" && "is-active"
                )}
              >
                Statistics
              </a>
            </Link>
          </div>
        </nav>

        <div
          className="columns is-marginless is-mobile is-multiline is-centered has-background-black-ter is-size-6-7 is-size-7-mobile is-size-6-tablet flex-align-center has-text-centered"
          style={{ paddingTop: "12px" }}
        >
          <div className="column is-offset-2-mobile is-10-mobile is-5-tablet">
            <SearchSummoner />
          </div>

          <div className="column is-2-mobile is-paddingless app-logo">
            <figure className="image logo-image mgx-auto">
              <img
                src="/static/favicon/android-chrome-256x256.png"
                alt="lolbaron logo"
              />
            </figure>
          </div>

          <div className="column is-offset-2-mobile is-10-mobile is-5-tablet">
            <SearchChamp />
          </div>

          <GeneralInfo />
          <div className="column is-paddingless is-12 has-border-top has-border-bottom">
            <SummonersStored />
          </div>
          <div className="column is-paddingless is-12 has-border-bottom">
            <ChampsStored />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo } = state;
  const { sortProp, reverseOrder, rolesFilter, textFilter } = state
    .eloDetailsByElo[selectedElo]
    ? state.eloDetailsByElo[selectedElo]
    : {
        sortProp: "winRate",
        reverseOrder: true,
        rolesFilter: SHOW_ALL,
        textFilter: ""
      };
  return {
    selectedElo,
    sortProp,
    reverseOrder,
    rolesFilter,
    textFilter
  };
};

export default withRouter(connect(mapStateToProps)(Header));
