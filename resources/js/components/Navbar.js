// resources/assets/js/components/Header.js

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Books</Link>
    </div>
  </nav>
)

export default Navbar