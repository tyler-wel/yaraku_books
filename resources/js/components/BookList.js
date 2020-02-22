import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html - examples
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
// Autocomplete courtesy of Mosh Hamedani https://programmingwithmosh.com/react/simple-react-autocomplete-component/
import AutoComplete from './AutoComplete'

const CancelToken = axios.CancelToken;
const Source = CancelToken.source();


class BookList extends Component {
  constructor() {
    super()
    this.state = {
      // Dummy data books until API is linked, TODO: link api
      books: [
        {
          id: 1,
          title: "Book 1",
          description: "Description 1",
          published: "02/22/2020",
          genre: "Fantasy",
          author: {
            id: 1,
            fullName: "Mall Op"
          }
        },
        {
          id: 2,
          title: "Book 2",
          description: "Description 2",
          published: "02/22/2020",
          genre: "Fantasy",
          author: {
            id: 2,
            fullName: "Paul Ron"
          }
        }
      ],
      // authors for suggestion system
      authors: [{fullName: "Mall Op"}, {fullName: "Paul Ron"}],
      // selected book and id for routing
      toBook: false,
      selectedBook: null,
      // form control variables
      title: '',
      genre: '',
      published: '',
    }
    this._isMounted = false;

    this.handleCreateNewBook = this.handleCreateNewBook.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;
    // if component mounted, call api for list of books
    axios.get('/api/books').then(response => {
      if(this._isMounted) {
        console.log(response)
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // handle book creation
  handleCreateNewBook(event) {

  }

  // handle input field changes
  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { books } = this.state
    // BootstrapTable search bar
    const { SearchBar } = Search;

    // Columns for BootstrapTable
    const columns = [
    {
      dataField: 'title',
      text: 'Title',
      sort: true,
      events: {
        // When title row is clicked, redirect to book
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(column)
          console.log(row)
          this.setState({
            selectedBook: row.id,
            toBook: true
          })
        }
      },
      style: {
        color: 'rgb(0, 132, 255)',
        cursor: 'pointer',
      }
    }, {
      dataField: 'author.fullName',
      text: 'Author',
      sort: true,
      events : {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(row)
        }
      },
      style: {

      }
    }, {
      dataField: 'genre',
      text: 'Genre'
    }, {
      dataField: 'published',
      text: 'Published'
    }]

    // Pagination options for BootstrapTable
    const pageOptions = {
      paginationSize: 4,
      pageStartIndex: 0,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      showTotal: false,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: books.length
      }]
    }

    // Component for redirecting to selected book using react-router-dom
    if (this.state.toBook && this.state.selectedBook !== null) {
      return <Redirect
                to={{
                  pathname: `/books/${this.state.selectedBook}`,
                  state: { id: this.state.selectedBook }
                }}
              />
    }

    // checkbox for row selection
    const selectRow = {
      mode: 'checkbox'
    };

    return (
      // see https://getbootstrap.com/docs/4.0/layout/grid/ for more info on setting up grids
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center card-title">
                  Create New Book
                </div>
                <form onSubmit={this.handleCreateNewBook}>
                  <div className="row">
                    <div className='form-group col-md-6'>
                        <label htmlFor="title" className="input-label">Title</label>
                        <input
                        id='title'
                        className='form-control'
                        type='text'
                        name='title'
                        value={this.state.title}
                        onChange={this.handleFieldChange}
                        autoComplete="off"
                        placeholder="Enter Title"
                        required
                        />
                    </div>
                    <div className='form-group col-md-6'>
                        <label htmlFor="author" className="input-label">Author</label>
                        <AutoComplete
                        suggestions={this.state.authors}
                        />
                    </div>
                  </div>
                  <div className="row">
                    <div className='form-group  col-md-6'>
                      <label htmlFor="genre" className="input-label">Genre</label>
                      <input
                        id='genre'
                        className='form-control'
                        type='text'
                        name='genre'
                        value={this.state.genre}
                        onChange={this.handleFieldChange}
                        placeholder="Enter Genre"
                      />
                    </div>
                    <div className='form-group  col-md-6'>
                      <label htmlFor="published" className="input-label">Published</label>
                      <input
                        id='published'
                        className='form-control'
                        type='date'
                        name='published'
                        value={this.state.published}
                        onChange={this.handleFieldChange}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <button className='btn btn-primary col-md-1 form-button'>Create</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center card-title">
                  All Books
                </div>
              </div>
              <div className="card-body">
                <ToolkitProvider
                  keyField='id'
                  data={ books }
                  columns={ columns }
                  bootstrap4
                  search
                >
                  {
                    props => (
                      <div>
                        <SearchBar className="col-md-3 search-bar" { ...props.searchProps } />
                        <BootstrapTable
                          { ...props.baseProps }
                          pagination={ paginationFactory(pageOptions) }
                          selectRow={ selectRow }
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookList
