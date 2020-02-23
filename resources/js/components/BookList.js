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

/**
 *
 */
class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      // authors for search suggestion
      authors: [],
      // selected book and id for routing
      toBook: false,
      selectedBook: null,
      // form control variables
      title: '',
      author: '',
      genre: '',
      published: '',
      // prop for whether creating is allowed
      allowCreation: this.props.allowCreation
    }
    this._isMounted = false;

    this.handleCreateNewBook = this.handleCreateNewBook.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  /**
   *
   */
  componentDidMount() {
    this._isMounted = true;
    // if component mounted, call api for list of books
    axios.get('/api/books').then(response => {
      if(this._isMounted) {
        this.setState({
          books: response.data
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
    console.log(this.refs)
  }

  /**
   *
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   *
   * @param {*} event
   */
  handleCreateNewBook(event) {
    event.preventDefault()
    console.log(this.state.title)
    console.log(this.state.author)
    console.log(this.state.genre)
    console.log(this.state.published)
    console.log('attempting to create')
  }

  /**
   *
   * @param {*} event
   */
  handleDelete(event) {
    event.preventDefault()
    console.log('attempting to delete')
  }

  /**
   *
   * @param {*} event
   */
  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   *
   */
  render() {
    const { books } = this.state

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
      dataField: 'author.abr',
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
      text: 'Published',
      sort: true
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
        text: '20', value: 20
      }, {
        text: '50', value: 50
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

    /**
     *
     * @param {*} props
     */
    const CustomSearch = (props) => {
      let input;
      const handleClick = () => {
        props.onSearch(input.value)
      };
      return (
        <div className="row search-row">
          <div className="col-md-6">
            <input
              className='form-control'
              ref={ n => input = n}
              type='text'
              placeholder="Search"
            />
          </div>
          <div className="col-md-4">
            <button className='btn btn-primary' onClick={ handleClick }>Search</button>
          </div>
          <div className="btn trash-btn col-md-2" onClick={ this.handleDelete }>
            <i class="fa fa-trash"></i>
          </div>
        </div>
      )
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
            { this.state.allowCreation &&
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
                          id='author'
                          onChange={this.handleFieldChange}
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
            }
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
                        <CustomSearch className="search-bar" { ...props.searchProps } />
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
