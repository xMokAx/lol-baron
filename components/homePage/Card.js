import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

function Card({ href, as, src, title, subTitle }) {
  return (
    <div className="column is-half-tablet is-one-third-desktop">
      {href ? (
        <Link href={href} as={as} scroll={false}>
          <a>
            <div className="card border-radius-6 transition-up">
              <div className="card-image">
                <figure className="image is-2by1">
                  <img
                    className="border-radius-6"
                    src={`/static/images/home-page/${src}.png`}
                    alt="summoner history page"
                  />
                </figure>
              </div>
              <div className="card-content pd-12">
                <h3 className="title is-4 is-size-5-mobile has-text-primary">
                  {title}
                </h3>
                <p className="subtitle is-6 is-size-7-mobile">{subTitle}</p>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <div className="card border-radius-6 transition-up">
          <div className="card-image">
            <figure className="image is-2by1">
              <img
                className="border-radius-6"
                src={`/static/images/home-page/${src}.png`}
                alt="summoner history page"
              />
            </figure>
          </div>
          <div className="card-content pd-12">
            <h3 className="title is-4 is-size-5-mobile has-text-primary">
              {title}
            </h3>
            <p className="subtitle is-6 is-size-7-mobile">{subTitle}</p>
          </div>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {};

export default Card;
