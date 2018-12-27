import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <a href="/">
            <strong>lolbaron.com</strong>
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
            <strong>lolbaron.com</strong>
          </a>{" "}
          was created under Riot Games' "Legal Jibber Jabber" policy using
          assets owned by Riot Games. Riot Games does not endorse or sponsor
          this project.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
