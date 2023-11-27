import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <div className="logo">
        <Link className='link' to="/">
          <h1>NJOHN BLOG</h1>
        </Link>
      </div>
    </footer>
  )
}

export default Footer