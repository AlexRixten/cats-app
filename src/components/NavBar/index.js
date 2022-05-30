import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <nav>
            <div className='container'>
                <div className='nav__block'>
                    <div>
                        <NavLink className='navbar__item' to='/cats'>Все котики</NavLink>
                    </div>
                    <div>
                        <NavLink className='navbar__item' to='/lovely'>Любимые котики</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;