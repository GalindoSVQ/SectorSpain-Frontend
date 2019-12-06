import React, { Component } from "react";
import PropTypes from "prop-types";
import "./provinces.scss";

export class Autocomplete extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
  };

  state = {
    activeOption: 0,
    filteredOptions: [],
    showOptions: false,
    userInput: ""
  };

  onChange = e => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      optionName =>
        optionName
          .toLowerCase()
          .normalize("NFD")
          .replace(
            /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
            "$1"
          )
          .indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });

    window.location.href =
      "crags/" +
      e.currentTarget.innerText
        .toLowerCase()
        .normalize("NFD")
        .replace(
          /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
          "$1"
        );
  };

  onKeyDown = e => {
    const { activeOption, filteredOptions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption]
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((optionName, index) => {
              let className;
              if (index === activeOption) {
                className = "option-active";
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName.toUpperCase()}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = <div className="no-options">No Province Found</div>;
      }
    }
    return (
      <React.Fragment>
        <div className="fieldProvince">
          <input
            type="text"
            className="lookingProvinces"
            name="province"
            id="province"
            placeholder=" "
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            autoComplete="off"
          />
          <label htmlFor="province">Search by Province</label>
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

export default Autocomplete;
