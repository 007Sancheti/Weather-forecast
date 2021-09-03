import React, { useState, useRef, useEffect } from 'react';
import './nav-item.css';

const NavItem = (props) => {
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) && open 
                ) {
                setOpen(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [open]);

    return (
        <li className='nav-item'>
            <div className='icon-button' onClick={() => setOpen(!open)}>
                {props.icon}
            </div>
            {open && props.render(dropdownRef)}
        </li>
    );
};

export default NavItem;
