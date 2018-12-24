import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <a href="/">
            <strong>Lolmania.com</strong>
          </a>{" "}
          created by <a href="https://github.com/xMokAx">Ahmed Mokhtar</a>.
        </p>
        <p>
          Powered by <a href="https://champion.gg">Champion.gg</a>{" "}
          <a href="http://api.champion.gg/" className="has-text-white">
            API
          </a>
        </p>
        <p className="is-size-7 has-text-grey-light">
          <a href="">
            <strong>Lolmania.com</strong>
          </a>{" "}
          isn't endorsed by Riot Games and doesn't reflect the views or opinions
          of Riot Games or anyone officially involved in producing or managing
          League of Legends. League of Legends and Riot Games are trademarks or
          registered trademarks of Riot Games, Inc. League of Legends © Riot
          Games, Inc.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
