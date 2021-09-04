import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import './nav-bar.css';

const NavBar = (props) => {
    return (
        <nav className='navbar'>
            <h3 className='location'>
                <FontAwesomeIcon className='location-icon' icon={faMapMarkerAlt} /> {props.location}
            </h3>
            <ul className='navbar-nav'>{props.children}</ul>
        </nav>
    );
};

export default NavBar;
