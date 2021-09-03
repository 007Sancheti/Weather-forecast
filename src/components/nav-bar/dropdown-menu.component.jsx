import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import DropdownItem from './dropdown-item.component';
import { ReactComponent as ArrowIcon } from '../../assets/icon-buttons/arrow.svg';
import './dropdown-menu.css';

const DropdownMenu = ({items, ...props}) => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    };
    return (
        <div className='dropdown' style={{ height: menuHeight }}>
            <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
            >
                <div className='menu'>
                    {items.map((item) => (
                        <DropdownItem
                            key={item.id}
                            id={item.id}
                            leftIcon={item.leftIcon}
                            rightIcon={item.rightIcon}
                            goToMenu={item.goToMenu}
                            setActiveMenu={setActiveMenu}
                            clickedItem={(itemClicked) => {
                                props.clickedItem(itemClicked);
                            }}
                        >
                            {item.title}
                        </DropdownItem>
                    ))}
                </div>
            </CSSTransition>
            {items.map((item, index) => (
                <CSSTransition
                    key={index}
                    in={activeMenu === item.goToMenu}
                    unmountOnExit
                    timeout={500}
                    classNames='menu-secondary'
                    onEnter={calcHeight}
                >
                    <div className='menu'>
                        <DropdownItem
                            leftIcon={<ArrowIcon />}
                            goToMenu='main'
                            setActiveMenu={setActiveMenu}
                        />
                        {item.secondaryItems.map((item) => (
                            <DropdownItem
                                key={item.id}
                                activeMenu={activeMenu}
                                {...item}
                                clickedItem={(itemClicked) => {
                                    props.clickedItem(itemClicked);
                                }}
                            >
                                {item.title}
                            </DropdownItem>
                        ))}
                    </div>
                </CSSTransition>
            ))}
        </div>
    );
};

export default DropdownMenu;
