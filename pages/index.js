import React, { Component } from "react";
import Head from "next/head";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>
            Lol statistics, builds, runes, skill orders, counters, summoner
            match history - lolmania.com
          </title>
          <meta
            name="description"
            content="Lolmania.com provides League of Legends champion statistics, guides, builds, items, spells, runes, skill orders, counters, matchups - summoner match history, match details and stats."
          />
          <meta
            property="og:title"
            content="Lol statistics, analytics, builds, runes, skill orders, counters, summoner match history - lolmania.com"
          />
          <meta
            property="og:description"
            content="lolmania.com provides League of Legends champion statistics, analytics, guides, builds, runes, skill orders and counters - summoner match history, match details and stats."
          />
          <meta
            property="og:image"
            content="https://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/Olaf.png"
          />
        </Head>
        <h1 className="title is-3 is-size-4-mobile has-text-warning">
          First Time User ?
        </h1>
        <p className="mgx-2 is-size-7-mobile">
          This App Works Offline (Any Page or Data You Browsed Before You Can
          Browse Again Without Internet Connection But They Won't be Up To Date)
        </p>
        <div className="columns is-centered is-multiline is-marginless">
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/1280x960.png"
                    alt="summoner page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">Match History</h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Summoner Match History, Ranks, Statistics and Details
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/1280x960.png"
                    alt="summoner page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">
                  Champion Analytics
                </h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Win Rate, Best Build, Best Runes, Matchups And More!
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/1280x960.png"
                    alt="summoner page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">
                  Champions Statistics
                </h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Sortable And Filterable Data Table Comparing All Champs Stats
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/1280x960.png"
                    alt="summoner page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">Champions List</h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Champs List With Their Currently Played Roles For Each Elo
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/1280x960.png"
                    alt="summoner page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">Set Preferences</h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Set Your Prefered: Region, Summoner, Champ And Elo
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/1280x960.png"
                    alt="summoner page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">
                  Data Saving And Speed
                </h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Any Searched Summoners Or Champs Are Stored In Tabs
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
