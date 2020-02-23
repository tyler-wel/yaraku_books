// TODO comment on fuzzysort
const fuzzysort = require('fuzzysort')
import React, { Component } from 'react';

/**
 *
 */
export class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: this.props.origInput ? this.props.origInput.fullName : '',
      // is focused on autocomplete element
      isFocused: false
    }
    this._isMounted = false;
    this.onChange = this.onChange.bind(this);
    this.handleDocClick = this.handleDocClick.bind(this)
  }

  /**
   *
   */
  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('click', this.handleDocClick)
  }

  handleDocClick(event) {
    if (document.getElementById('autocomplete-input').contains(event.target)) {
      const selected = event.target.innerText
      if (this._isMounted) {
        this.setState({ isFocused: true })
        if(selected) {
          this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: selected,
          })
          // simulate event for parent's handleFieldChange
          this.props.onChange({ target: { name: this.props.id, value: selected } })
        }
      }
    } else {
      if (this._isMounted) {
        this.setState({ isFocused: false })
      }
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener('click', this.handleDocClick);
  }

  /**
   *
   * @param {*} event
   */
  onChange(event) {
    const input = event.target.value
    const suggestions = this.props.suggestions
    const filtered = fuzzysort.go(input, suggestions, {limit: 6, allowTypo: false, key: 'fullName'})
    if(this._isMounted) {
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: filtered,
        showSuggestions: true,
        userInput: input,
      })
    }
    // simulate event for parent's handleFieldChange
    this.props.onChange({ target: { name: this.props.id, value: input } })
  }


  /**
   *
   * TODO: courtesy of:
   */
  render() {
    const { isFocused } = this.state;
    let suggestionComponent;
    // if input exists and we should be displaying
    if (this.state.showSuggestions && this.state.userInput && isFocused) {
      if (this.state.filteredSuggestions.length) {
        // return a component with a list of suggestions
        suggestionComponent = (
          <ul className="suggestions">
            {this.state.filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion.target} >
                  {suggestion.target}
                </li>
              );
            })}
          </ul>
        )
      } else {
        // no suggestions, empty component
        suggestionComponent = (
          <div className="no-suggestion">
          </div>
        );
      }
    }

    // tracking click outside help https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
    return (
      <React.Fragment>
        <div id="autocomplete-input">
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.userInput}
            className='form-control'
            placeholder='Enter Author'
            required
          />
          {suggestionComponent}
        </div>
      </React.Fragment>
    )
  }
}

export default AutoComplete;
