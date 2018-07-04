import React from 'react'
import { Link } from 'react-router-dom'
import Sun from '../assets/images/sunny-mate.png'

const Header = () => (
    <div className="header">
            <p className="header--title"> Weather dude </p>
            <p><img className="header--sun" src={Sun}/></p>

            <Link to="/recents"> View Recents </Link>
            <Link to="/"> Home </Link>

    </div>
)

export default Header