import React, { Component } from 'react';
import fuzzysort from 'fuzzysort'
import PropTypes from 'prop-types'

/**
 * Custom auto-completion component
 *
 * @param origInput original input (when editing existing text)
 * @param id id of the parent prop to affect
 * @param suggestions list of auto-complete suggestions
 * @param onChange callback function to parent
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

  /** @inheritdoc */
  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('click', this.handleDocClick)
  }

  /**
   * Custom document event handler for clicking outside of
   *  the auto-complete box
   * Thanks to:
   * https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-react-component-5604830beb7f
   * @param event
   */
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

  /** @inheritdoc */
  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener('click', this.handleDocClick);
  }

  /**
   * Event handler for when text is changed
   *
   * @param event
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

  /** @inheritdoc */
  render() {
    const { isFocused } = this.state;
    let suggestionComponent;
    // if input exists and we should be displaying
    if (this.state.showSuggestions && this.state.userInput && isFocused) {
      if (this.state.filteredSuggestions.length) {
        // return a component with a list of suggestions
        suggestionComponent = (
          <ul className="suggestions">
            {this.state.filteredSuggestions.map((suggestion) => {
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

AutoComplete.propTypes = {
  origInput: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  suggestions: PropTypes.array.isRequired
}

export default AutoComplete;
