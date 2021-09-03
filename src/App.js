import NavBar from './components/nav-bar/nav-bar.component';
import NavItem from './components/nav-bar/nav-item.component';
import { ReactComponent as CaretIcon } from './assets/icon-buttons/caret.svg';
import { ReactComponent as ChevronIcon } from './assets/icon-buttons/chevron.svg';
import { ReactComponent as BoltIcon } from './assets/icon-buttons/bolt.svg';
import { ReactComponent as ThemeIcon } from './assets/icon-buttons/theme.svg';
import { ReactComponent as LightIcon } from './assets/icon-buttons/light.svg';
import DropdownMenu from './components/nav-bar/dropdown-menu.component';
import SearchBar from './components/search-bar/search-bar.component';
import React, { useState } from 'react';

const initialItems = [
    {
        id: 'themes',
        leftIcon: <ThemeIcon />,
        title: 'Themes',
        goToMenu: 'themes',
        rightIcon: <ChevronIcon />,
        secondaryItems: [
            {
                id: 'dark',
                leftIcon: <BoltIcon />,
                title: 'Dark',
                active: true,
            },
            {
                id: 'light',
                leftIcon: <LightIcon />,
                title: 'Light',
            },
        ],
    },
];

export const DropdownItemContext = React.createContext();

function App() {
    const [items, setItemActive] = useState(initialItems);
    const handleClickedItem = (itemClicked) => {
        if (itemClicked === 'light') {
            document.getElementsByTagName('html')[0].classList.add('light');
            document.getElementsByTagName('html')[0].classList.remove('dark');
        } else if (itemClicked === 'dark') {
            document.getElementsByTagName('html')[0].classList.add('dark');
            document.getElementsByTagName('html')[0].classList.remove('light');
        }
    };
    return (
        <DropdownItemContext.Provider
            value={{ setItemActive, handleClickedItem }}
        >
            <div className='App'>
                <NavBar>
                    <SearchBar />
                    <NavItem
                        icon={<CaretIcon />}
                        render={(dropdownRef) => (
                            <DropdownMenu
                                items={items}
                                setItemActive={setItemActive}
                                clickedItem={(itemClicked) => {
                                    handleClickedItem(itemClicked);
                                }}
                                ref={dropdownRef}
                            />
                        )}
                    ></NavItem>
                </NavBar>
            </div>
        </DropdownItemContext.Provider>
    );
}

export default App;
