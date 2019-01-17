import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <a href="https://lolbaron.com">
            <strong>lolbaron.com</strong>
          </a>{" "}
          created by <a href="https://github.com/xMokAx">Ahmed Mokhtar</a>.
        </p>
        <p>
          Powered By <a href="http://api.champion.gg/">Champion.gg API</a> and{" "}
          <a href="https://developer.riotgames.com/">
            League Of Legends Official API
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
