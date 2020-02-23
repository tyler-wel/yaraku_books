import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import BookList from './BookList'
import Book from './Book'
import AuthorList from './AuthorList'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' render={ (props) => <BookList {...props} allowCreation={true}/> }/>
          <Route path='/books/:id' component={Book}/>
          <Route path='/authors' component={AuthorList}/>
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
