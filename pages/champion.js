import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Head from "next/head";

import { ggRoles } from "../constants/ggConstants";

import { getKeyByValue, getValueByProp } from "../utils/utils";
import {
  fetchChamp,
  selectElo,
  selectRole,
  selectChamp
} from "../actions/ggActions";

import Loading from "../components/common/Loading";
import ChampProfile from "../components/championPage/ChampProfile";
import ChampStats from "../components/championPage/ChampStats";
import ChampCharts from "../components/championPage/ChampCharts";
import ChampBuild from "../components/championPage/ChampBuild";
import ChampMatchups from "../components/championPage/ChampMatchups";

class champion extends Component {
  static propTypes = {
    selectedElo: PropTypes.string.isRequired,
    isFetchingChamp: PropTypes.bool.isRequired,
    champError: PropTypes.string.isRequired,
    champion: PropTypes.object.isRequired,
    fetchChamp: PropTypes.func.isRequired
  };

  static async getInitialProps({ reduxStore, req, query }) {
    const isServer = !!req;

    let { elo, champName, role } = query;
    const { getState, dispatch } = reduxStore;
    const champs = getState().champs;
    const champion = await getValueByProp(
      champs,
      "gameName",
      champName.toLowerCase()
    );
    role = role.toLowerCase() === "adc" ? "ADC" : role.toLowerCase();
    role = await getKeyByValue(ggRoles, role);

    if (!champion || !role) {
      return {
        statusCode: 404
      };
    }

    const id = champion.id;
    const champsList = getState().eloDetailsByElo[elo]
      ? getState().eloDetailsByElo[elo].champsList
      : [];
    if (champsList.length) {
      const hasRole = champsList
        .find(champ => id == champ.championId)
        .roles.find(r => role === r.role);

      if (!hasRole) {
        return {
          statusCode: 404
        };
      }
    }

    dispatch(selectElo(elo));
    dispatch(selectChamp(elo, champName));

    if (isServer) {
      await dispatch(fetchChamp(elo, champName, champion.id));
    } else {
      dispatch(fetchChamp(elo, champName, champion.id));
    }
    dispatch(selectRole(elo, champName, role));

    return { champion, role };
  }

  handleChampRetry = () => {
    const { fetchChamp, champion, selectedElo } = this.props;
    const { id, gameName } = champion;
    const champName = gameName.replace(/([^a-z]+)/gi, "").toLowerCase();
    fetchChamp(selectedElo, champName, id);
  };

  render() {
    const { isFetchingChamp, champError, champion, role } = this.props;
    const { gameName, id } = champion;
    const champRole = ggRoles[role];
    return (
      <React.Fragment>
        <Head>
          <title>
            {gameName} {champRole} stats, guides, buildes, runes, counters,
            matchups - lolmania.com
          </title>
          <meta
            name="description"
            content={`LoL statistics, guides, builds, items, spells, runes, skill orders, counters and matchups for ${gameName} when played ${champRole}. Statistics include ${gameName}'s win rate, play rate, ban rate, KDA and much more. Counters include who ${gameName} ${champRole} is Strong or Weak Against.`}
          />
          <meta
            property="og:title"
            content={`${gameName} ${champRole} stats, guides, buildes, runes, counters, matchups - lolmania.com`}
          />
          <meta
            property="og:description"
            content={`LoL statistics, guides, builds, runes, skill orders, counters and matchups for ${gameName} when played ${champRole}. Statistics include ${gameName}'s win rate, play rate, ban rate, KDA and much more. Matchups include who ${gameName} ${champRole} is Strong or Weak Against.`}
          />
          <meta
            property="og:image"
            content={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${gameName}_0.jpg`}
          />
        </Head>
        {isFetchingChamp ? (
          <div className="is-flex flex-justify-center flex-align-center page-loader-height">
            <Loading className="loader-lg loader-color-light" />
          </div>
        ) : champError ? (
          <React.Fragment>
            <div className="notification is-danger">
              <strong>{champError}</strong>
            </div>
            <button
              className="button is-primary"
              onClick={this.handleChampRetry}
            >
              Try Again
            </button>
          </React.Fragment>
        ) : (
          <div className="columns is-marginless is-multiline is-mobile">
            <ChampProfile champName={gameName} champId={id} />
            <ChampStats champName={gameName} />
            <ChampCharts champName={gameName} />
            <ChampBuild champ={champion} />
            <ChampMatchups champName={gameName} champId={id} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { selectedElo } = state;
  const { selectedChamp } = state.eloDetailsByElo[selectedElo] || "";
  const { isFetchingChamp, champError } =
    state.eloDetailsByElo[selectedElo] &&
    state.eloDetailsByElo[selectedElo].champions[selectedChamp]
      ? state.eloDetailsByElo[selectedElo].champions[selectedChamp]
      : {
          isFetchingChamp: true,
          champError: ""
        };

  return {
    selectedElo,
    isFetchingChamp,
    champError
  };
};

const mapDispatchToProps = {
  fetchChamp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(champion);
