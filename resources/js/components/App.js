// resources/assets/js/components/App.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          {/* <Route exact path='/' component={ProjectsList} /> */}
          Hello!!!!
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))