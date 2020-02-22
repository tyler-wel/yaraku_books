import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AutoComplete from './AutoComplete'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Dummy data books until API is linked
      book: { author: {abr: ""}},
      authors: [],
      isEditing: false
    }
    this._isMounted = false;

    this.reloadBook = this.reloadBook.bind(this)
    this.saveBook = this.saveBook.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.switchToEdit = this.switchToEdit.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;
    // if component mounted, call api for list of books
    axios.get(`/api/books/${this.props.match.params.id}`).then(response => {
      if(this._isMounted) {
        console.log(response)
        this.setState({
          book: response.data
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  switchToEdit() {
    this.setState({
      isEditing: true
    })
  }

  reloadBook() {

  }

    // handle input field changes
  handleFieldChange(event) {
    this.setState({
      [`this.book.${event.target.name}`]: event.target.value
    })
  }

  saveBook() {
    console.log('saving book')
  }

  render() {
    const { book } = this.state
    if (this.state.isEditing) {
      return (
        // see https://getbootstrap.com/docs/4.0/layout/grid/ for more info on setting up grids
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card book-info">
                <div className="card-header book-title">
                  Edit
                </div>
                <div className="card-body">
                  <form onSubmit={this.saveBook}>
                    <div className="row">
                      <div className="col-md-10">
                        <label htmlFor="title" className="info-label">Title</label>
                        <input
                          id='title'
                          className='form-control'
                          type='text'
                          name='title'
                          value={this.state.book.title}
                          onChange={this.handleFieldChange}
                          autoComplete="off"
                          placeholder="Enter Title"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <label htmlFor="author" className="info-label">Author</label>
                        <AutoComplete
                          suggestions={this.state.authors}
                          origInput={this.state.book.author}
                          ref="auto-complete"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <label htmlFor="description" className="info-label">Description</label>
                        <input
                          id='description'
                          className='form-control'
                          type='text'
                          name='description'
                          value={this.state.book.description}
                          onChange={this.handleFieldChange}
                          autoComplete="off"
                          placeholder="Enter Description"
                        />
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-5">
                      <label htmlFor="genre" className="info-label">Genre</label>
                        <input
                          id='genre'
                          className='form-control'
                          type='text'
                          name='genre'
                          value={this.state.book.genre}
                          onChange={this.handleFieldChange}
                          placeholder="Enter a Genre"
                        />
                      </div>
                      <div className="col-md-5">
                        <label htmlFor="published" className="info-label">Published</label>
                          <input
                            id='published'
                            className='form-control'
                            type='date'
                            name='published'
                            value={this.state.book.published}
                            onChange={this.handleFieldChange}
                          />
                      </div>
                    </div>
                    <div className='row'>
                      <button className='btn btn-primary col-md-1 form-button'>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        // see https://getbootstrap.com/docs/4.0/layout/grid/ for more info on setting up grids
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card book-info">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center book-title">
                    { book.title }
                    <span className="edit-btn">
                      <button className='btn btn-primary' onClick={this.switchToEdit}>Edit</button>
                    </span>
                  </div>
                  <div className="col-md-12 book-author">
                    { book.author.abr }
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-10">
                      <label htmlFor="description" className="info-label">Description</label>
                      <input
                        id='description'
                        className='form-control info-desc'
                        type='text'
                        name='description'
                        value={this.state.book.description}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-5">
                    <label htmlFor="genre" className="info-label">Genre</label>
                      <input
                        id='genre'
                        className='form-control'
                        type='text'
                        name='genre'
                        value={this.state.book.genre}
                        disabled
                      />
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="published" className="info-label">Published</label>
                        <input
                          id='published'
                          className='form-control'
                          type='date'
                          name='published'
                          value={this.state.book.published}
                          disabled
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Book
