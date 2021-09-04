import React from 'react';
import NavBar from '../nav-bar/nav-bar.component';
import NavItem from '../nav-bar/nav-item.component';
import DropdownMenu from '../nav-bar/dropdown-menu.component';

import { ReactComponent as CaretIcon } from '../../assets/icon-buttons/caret.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icon-buttons/chevron.svg';
import { ReactComponent as BoltIcon } from '../../assets/icon-buttons/bolt.svg';
import { ReactComponent as ThemeIcon } from '../../assets/icon-buttons/theme.svg';
import { ReactComponent as LightIcon } from '../../assets/icon-buttons/light.svg';
import SearchBar from '../search-bar/search-bar.component';

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
class NavbarContainer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            items: initialItems
        }
    }
    
    handleClickedItem = (itemClicked) => {
        if (itemClicked === 'light') {
            document.getElementsByTagName('html')[0].classList.add('light');
            document.getElementsByTagName('html')[0].classList.remove('dark');
        } else if (itemClicked === 'dark') {
            document.getElementsByTagName('html')[0].classList.add('dark');
            document.getElementsByTagName('html')[0].classList.remove('light');
        }
    };

    setItemActive = (callback) => {
        this.setState((prevState) => ({
            items: callback(prevState.items),
        }));
    };

    render() {
        const {items} = this.state;
        const {updatedLocation, location, handleLocationChange, updateTemperature} = this.props;
        return (
            <div>
                <DropdownItemContext.Provider
                    value={{
                        setItemActive: this.setItemActive,
                        handleClickedItem: this.handleClickedItem,
                    }}
                >
                    <NavBar location={updatedLocation}>
                        <SearchBar
                            searchValue={location}
                            onSearchChange={handleLocationChange}
                            onFormSubmit={updateTemperature}
                        />
                        <NavItem
                            icon={<CaretIcon />}
                            render={(dropdownRef) => (
                                <DropdownMenu
                                    items={items}
                                    setItemActive={this.setItemActive}
                                    clickedItem={(itemClicked) => {
                                        this.handleClickedItem(itemClicked);
                                    }}
                                    ref={dropdownRef}
                                />
                            )}
                        ></NavItem>
                    </NavBar>
                </DropdownItemContext.Provider>
            </div>
        );
    }
}

export default NavbarContainer;
