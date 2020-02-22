const fuzzysort = require('fuzzysort')
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: this.props.origInput ? this.props.origInput.fullName : '',
      suggestions: this.props.suggestions
    }
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    const input = event.target.value
    const suggestions = this.state.suggestions
    const filtered = fuzzysort.go(input, suggestions, {limit: 6, allowTypo: false, key: 'fullName'})

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: filtered,
      showSuggestions: true,
      userInput: input,
      suggestions: this.state.suggestions
    })
  }

  onClick(event) {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.target.innerText,
      suggestions: this.state.suggestions
    })
  }

  render() {
    let suggestionComponent;
    if (this.state.showSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        suggestionComponent = (
          <ul className="suggestions">
            {this.state.filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion.target} onClick={this.onClick}>
                  {suggestion.target}
                </li>
              );
            })}
          </ul>
        )
      } else {
        suggestionComponent = (
          <div className="no-suggestion">
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.userInput}
          className='form-control'
          placeholder='Enter Author'
          required
        />
        {suggestionComponent}
      </React.Fragment>
    )
  }
}

export default AutoComplete;
