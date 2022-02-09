import React from "react"
import { Route, Link, Routes } from "react-router-dom"
import { useDispatch ,useSelector } from "react-redux"
import { useAlert } from "react-alert"
import Search from "./Search"

import '../../App.css'
const Header = () => {
  const alter = useAlert()
  const dispatch = useDispatch()

const { user, loading } = useSelector(state => state.auth)

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to='/'>
              <img src="/images/logo.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          {/* <Routes>
        <Route render= { ({history}) => <Search history={history} />} />
        </Routes> */}
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to='/cart' style={{ textDecoration: 'none' }} >
          <span id="cart" className="ml-3">Cart</span>
          <span className="ml-1" id="cart_count">2</span>
          </Link>

          <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>


        </div>
      </nav>
    </>


  )
}

export default Header
