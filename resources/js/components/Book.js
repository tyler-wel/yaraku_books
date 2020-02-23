import axios from 'axios'
import React, { Component } from 'react'
import AutoComplete from './AutoComplete'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {
        title: "",
        author: {fullName: ""},
        description: "",
        genre: "",
        published: ""
      },
      authors: [],
      titleInput: "",
      authorInput: "",
      descriptionInput: "",
      genreInput: "",
      publishedInput: "",
      isEditing: false
    }
    this._isMounted = false

    this.saveBook = this.saveBook.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.switchToEdit = this.switchToEdit.bind(this)
  }

  /** @inheritdoc */
  componentDidMount() {
    this._isMounted = true
    axios.get(`/api/books/${this.props.match.params.id}`).then(response => {
    // if component mounted, update state
      if(this._isMounted) {
        console.log(response.data)
        this.setState({
          book: response.data,
          titleInput: response.data.title,
          authorInput: response.data.author.fullName,
          descriptionInput: response.data.description,
          genreInput: response.data.genre,
          publishedInput: response.data.published
        })
      }
    })
    axios.get('/api/authors').then(response => {
      if(this._isMounted) {
        this.setState({
          authors: response.data
        })
      }
    })
  }

  /** @inheritdoc */
  componentWillUnmount() {
    this._isMounted = false
  }

  /**
   * Switch to editing mode
   */
  switchToEdit() {
    this.setState({
      isEditing: true
    })
  }

  /**
   * Event handler for input changes
   *
   * @param event
   */
  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * Save the book with the given information
   */
  saveBook(event) {
    event.preventDefault()
    const author = this.state.authors.find( author => {
      return this.state.book.author.fullName == author.fullName
    })
    let authorId = author.id
    // If the new inputed name doesn't equal original name,
    //  pass null ID to create a new author (author editing isn't implemented)
    if (author.fullName !== this.state.authorInput) {
      authorId = null
    }
    const book = {
      title: this.state.titleInput,
      author_id: authorId,
      author_name: this.state.authorInput,
      genre: this.state.genreInput,
      description: this.state.descriptionInput,
      published: this.state.publishedInput
    }
    axios.put(`/api/books/${this.props.match.params.id}`, book).then(() => {
      Swal.fire("Book Updated!", "", "success").then(() => {
        window.location.reload()
      })
    }).catch (error => {
      console.error(error)
      Swal.fire("An error has occured :(", "The book couldn't be updated", "error").then(() => {
        window.location.reload()
      })
    })
  }

  /** @inheritdoc */
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
                          name='titleInput'
                          value={ this.state.titleInput }
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
                          id='authorInput'
                          suggestions={this.state.authors}
                          origInput={ book.author }
                          onChange={this.handleFieldChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <label htmlFor="description" className="info-label">Description</label>
                        <textarea
                          id='description'
                          className='form-control'
                          name='descriptionInput'
                          value={ this.state.descriptionInput }
                          onChange={this.handleFieldChange}
                          autoComplete="off"
                          placeholder="Enter Description"
                          rows="3"
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
                          name='genreInput'
                          value={ this.state.genreInput }
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
                            name='publishedInput'
                            value={ this.state.publishedInput }
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
                    { book.author.fullName }
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-10">
                      <label htmlFor="description" className="info-label">Description</label>
                      <textarea
                        id='description'
                        className='form-control-plaintext info-desc'
                        name='description'
                        value={ book.description }
                        rows="3"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-5">
                    <label htmlFor="genre" className="info-label">Genre</label>
                      <input
                        id='genre'
                        className='form-control-plaintext'
                        type='text'
                        name='genre'
                        value={ book.genre }
                        disabled
                      />
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="published" className="info-label">Published</label>
                        <input
                          id='published'
                          className='form-control-plaintext'
                          type='date'
                          name='published'
                          value={ book.published }
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

Book.propTypes = {

}

export default Book
