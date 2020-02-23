import axios from 'axios'
import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

class AuthorList extends Component {
  constructor() {
    super()
    this.state = {
      authors: [],
    }
    this._isMounted = false;
  }

  /** @inheritdoc */
  componentDidMount() {
    this._isMounted = true;
    // if component mounted, call api for list of books
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
    this._isMounted = false;
  }

  /** @inheritdoc */
  render() {
    const { authors } = this.state

    // Columns for BootstrapTable
    const columns = [
    {
      dataField: 'firstName',
      text: 'First Name',
      sort: true,
    }, {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true,
    }, {
      dataField: 'abr',
      text: 'Abbreviation',
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
        text: 'All', value: authors.length
      }]
    }

    /**
     * Custom search bar component for react-bootstrap-table
     *
     * @param props
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
              style={ {} }
              ref={ n => input = n}
              type='text'
              placeholder="Search"
            />
          </div>
          <div className="col-md-4">
            <button className='btn btn-primary' onClick={ handleClick }>Search</button>
          </div>
        </div>
      )
    }

    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center card-title">
                  All Authors
                </div>
              </div>
              <div className="card-body">
                <ToolkitProvider
                  keyField='id'
                  data={ authors }
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

export default AuthorList
