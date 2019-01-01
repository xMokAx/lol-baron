import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>
            Lol statistics, builds, runes, skill orders, counters, summoner
            match history - lolbaron.com
          </title>
          <meta
            name="description"
            content="lolbaron.com provides League of Legends champion statistics, guides, builds, items, spells, runes, skill orders, counters, matchups - summoner match history, match details and stats."
          />
          <meta
            property="og:title"
            content="Lol statistics, analytics, builds, runes, skill orders, counters, summoner match history - lolbaron.com"
          />
          <meta
            property="og:description"
            content="lolbaron.com provides League of Legends champion statistics, analytics, guides, builds, runes, skill orders and counters - summoner match history, match details and stats."
          />
          <meta
            property="og:image"
            content="/static/favicon/og-wide-image.png"
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
            <Link
              href={"/summoner?region=kr&summonerName=hideonbush"}
              as={"/summoner/kr/hideonbush"}
              scroll={false}
            >
              <a>
                <div className="card border-radius-6 transition-up">
                  <div className="card-image">
                    <figure className="image is-2by1">
                      <img
                        className="border-radius-6"
                        src="/static/images/home-page/summoner-page.png"
                        alt="summoner history page"
                      />
                    </figure>
                  </div>
                  <div className="card-content pd-12">
                    <h2 className="title is-4 is-size-5-mobile has-text-primary">
                      Match History
                    </h2>
                    <p className="subtitle is-6 is-size-7-mobile">
                      Summoner Match History, Ranks, Statistics and Details.
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <Link
              href={"/champions?elo=platplus"}
              as={"/champions/platplus"}
              scroll={false}
            >
              <a>
                <div className="card border-radius-6 transition-up">
                  <div className="card-image">
                    <figure className="image is-2by1">
                      <img
                        className="border-radius-6"
                        src="/static/images/home-page/champs-page.png"
                        alt="chams list page"
                      />
                    </figure>
                  </div>
                  <div className="card-content pd-12">
                    <h2 className="title is-4 is-size-5-mobile has-text-primary">
                      Champions List
                    </h2>
                    <p className="subtitle is-6 is-size-7-mobile">
                      Champs List With Their Currently Played Roles For Each
                      Elo.
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <Link
              href={"/champion?elo=platplus&champName=zed&role=middle"}
              as={"/champions/platplus/zed/middle"}
              scroll={false}
            >
              <a>
                <div className="card border-radius-6 transition-up">
                  <div className="card-image">
                    <figure className="image is-2by1">
                      <img
                        className="border-radius-6"
                        src="/static/images/home-page/champ-page.png"
                        alt="champs analytics page"
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
              </a>
            </Link>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <Link
              href={
                "/statistics?elo=platplus&sortBy=winRate&order=descend&roleFilter=all"
              }
              as={
                "/statistics/platplus?sortBy=winRate&order=descend&roleFilter=all"
              }
              scroll={false}
            >
              <a>
                <div className="card border-radius-6 transition-up">
                  <div className="card-image">
                    <figure className="image is-2by1">
                      <img
                        className="border-radius-6"
                        src="/static/images/home-page/stats-page.png"
                        alt="statistics page"
                      />
                    </figure>
                  </div>
                  <div className="card-content pd-12">
                    <h2 className="title is-4 is-size-5-mobile has-text-primary">
                      Champions Statistics
                    </h2>
                    <p className="subtitle is-6 is-size-7-mobile">
                      Sortable And Filterable Data Table Comparing All Champs
                      Stats.
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="column is-half-tablet is-one-third-desktop">
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src="/static/images/home-page/pref.png"
                    alt="preferences modal"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">
                  Set Preferences
                </h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Set Your Prefered: Region, Summoner, Champ And Elo.
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
                    src="/static/images/home-page/data-saving.png"
                    alt="stored tabs"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h2 className="title is-4 is-size-5-mobile has-text-primary">
                  Data Saving And Speed
                </h2>
                <p className="subtitle is-6 is-size-7-mobile">
                  Any Searched Summoners Or Champs Are Stored For Future Visits.
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
