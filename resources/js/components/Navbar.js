import React from 'react'
import { Link } from 'react-router-dom'

// See getbootstrap.com/docs/4.0 for navbar stuff
// Link replaces the anchor tags

const Navbar = () => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-dark navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>
        Yaraku Books
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarLinks" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarLinks">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to='/'>
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/authors'>
              Authors
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Navbar
