import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string
  };
  render() {
    const {
      options,
      ariaLabel,
      value,
      defaultValue,
      onChange,
      className
    } = this.props;
    return (
      <select
        className={`is-capitalized ${className}`}
        value={value}
        defaultValue={defaultValue}
        aria-label={ariaLabel}
        onChange={onChange}
        ref={node => (this.select = node)}
      >
        {options.map(option => (
          <option className="is-capitalized" value={option} key={option}>
            {option === "platplus" ? "Platinum+" : option}
          </option>
        ))}
      </select>
    );
  }
}
