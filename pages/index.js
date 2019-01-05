import React, { Component } from "react";
import Head from "next/head";

import Card from "../components/homePage/Card";

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
            content="https://lolbaron.com/static/favicon/og-wide-image.png"
          />
        </Head>
        <h1 className="title is-size-4-mobile has-text-warning">
          First Time User ?
        </h1>
        <section className="section has-text-left">
          <h2 className="is-size-4 is-size-5-mobile has-text-primary">
            This Website Is A{" "}
            <strong className="has-text-primary">
              SP (Single Page) PWA (Progressive Web App)
            </strong>{" "}
            So:
          </h2>
          <ul className="list pdx-2">
            <li className="list-item">
              <p>
                - It's Very Fast And Becomes Faster With Subsequent Visits And
                Uses Much Less Data.
              </p>
            </li>
            <li className="list-item">
              <p>
                - It Works Offline (Any Page You Visited You Can Visit Again
                While Offline But The Data May Not Be Up To Date)
              </p>
            </li>
            <li className="list-item">
              <p>
                - It Can Be Added To Home Screen To Work As A Native Mobile App.
              </p>
            </li>
          </ul>
        </section>
        <div className="columns is-centered is-multiline is-marginless">
          <Card
            href="/summoner?region=kr&summonerName=hideonbush"
            as="/summoner/kr/hideonbush"
            src="summoner-page"
            title="Match History"
            subTitle="Summoner Match History, Ranks, Statistics and Details."
          />
          <Card
            href="/champions?elo=platplus"
            as="/champions/platplus"
            src="champs-page"
            title="Champions List"
            subTitle=" Champs List With Their Currently Played Roles For Each Elo."
          />
          <Card
            href="/champion?elo=platplus&champName=zed&role=middle"
            as="/champions/platplus/zed/middle"
            src="champ-page"
            title="Champion Analytics"
            subTitle="Win Rate, Best Build, Best Runes, Matchups And More!"
          />
          <Card
            href="/statistics?elo=platplus&sortBy=winRate&order=descend&roleFilter=all"
            as="/statistics/platplus?sortBy=winRate&order=descend&roleFilter=all"
            src="stats-page"
            title="Champions Statistics"
            subTitle="Sortable And Filterable Data Table Comparing All Champs Stats."
          />
          <Card
            src="pref"
            title="Set Preferences"
            subTitle="Set Your Prefered: Region, Summoner, Champ And Elo."
          />
          <Card
            src="data-saving"
            title="Data Saving And Speed"
            subTitle="Any Searched Summoners Or Champs Are Stored For Future Visits."
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
