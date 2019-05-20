import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'

const NavbarWrapper = styled.div`
    font-family: 'Anonymous Pro', monospace;
    margin: 2em 0;
    font-size: 1em;

      ul {
          display: flex;
          text-decoration: none;
          justify-content: center;
          align-items: space-evenly;
          align-content: space-evenly;
          width: 100vw;
        }

    a {
          text-decoration: none;
          display: flex;
          justify-content: space-evenly;
          width: 12em;
          color: rgb(187, 200, 147); 
          font-size: 1.5em; 
          font-weight: 700;
    }
    a:hover {
      color: white;
    }
    
`




class Navbar extends Component {
  render() {
    return (
      <NavbarWrapper>
        <ul className="nav justify-content-center">
          <li className="nav-item"><Link as="a" className="nav-link active" to='/discover'>Discover</Link></li>
          <li className="nav-item"><Link as="a" className="nav-link active" to='/myHomeWishlist'>My Hygge Wishlist</Link></li>
          <li className="nav-item"><Link as="a" className="nav-link active" to='/about'>About</Link></li>
          <li className="nav-item"><Link as="a" className="nav-link active" to='/account'>Account</Link></li>
          <li className="nav-item"><Link as="a" className="nav-link active " to='/admin'>Admin</Link></li>
        </ul>
      </NavbarWrapper>
    )
  }
}


{/* <ul class="nav nav-pills nav-fill">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Much longer nav link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li>
</ul> */}

export default Navbar