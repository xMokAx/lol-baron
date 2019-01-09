import React from "react";
import PropTypes from "prop-types";
import HTTPStatus from "http-status";
import Head from "next/head";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    const title =
      statusCode === 404
        ? "This page could not be found"
        : HTTPStatus[statusCode] || "An unexpected error has occurred";

    return (
      <div>
        <Head>
          <title>
            {statusCode}: {title}
          </title>
        </Head>
        <div className="is-flex flex-vertical flex-align-center">
          <figure className="image is-128x128 mgb-1">
            <img
              src="/static/images/error-baron.png"
              alt="baron icon"
              className="is-rounded"
            />
          </figure>
          <div className="notification is-danger is-flex flex-align-center flex-justify-center fullwidth">
            {statusCode ? (
              <h1
                className="title is-4 has-border-right pd-2"
                style={{ paddingLeft: "0" }}
              >
                {statusCode}
              </h1>
            ) : null}
            <h2 className="subtitle is-6 pd-2" style={{ paddingRight: "0" }}>
              {title}.
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Error.propTypes = {
    statusCode: PropTypes.number
  };
}
