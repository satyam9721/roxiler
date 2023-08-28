import React from 'react'
import { Link } from "react-router-dom";
const Header = () => {
  return (
 <div className='mb-5'>


  <header>
  {/* Navbar */}
  <nav className="navbar navbar-expand-lg navbar-light" style={{background:"#e9e9ae"}}>
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars" />
      </button>
      <div className="collapse navbar-collapse" id="navbarExample01">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item active">
          <Link to="/" className="nav-link">Satyam Gupta</Link>
          </li>
          <li className="nav-item">
          <Link to="/" className="nav-link">Transaction Table</Link>
          </li>
          <li className="nav-item">
          
          <Link to="/statics" className="nav-link">Transctions Statistics</Link>
          </li>
          <li className="nav-item">
          <Link to="/chart" className="nav-link">TransactionsBarChart</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  {/* Navbar */}
  {/* Jumbotron */}

  {/* Jumbotron */}
</header >

</div>

  )
}


export default Header