import React from 'react';
import NavBar from './components/nav-bar/nav-bar.component';
import NavItem from './components/nav-bar/nav-item.component';
import { ReactComponent as CaretIcon } from './assets/icon-buttons/caret.svg';
import { ReactComponent as ChevronIcon } from './assets/icon-buttons/chevron.svg';
import { ReactComponent as BoltIcon } from './assets/icon-buttons/bolt.svg';
import { ReactComponent as ThemeIcon } from './assets/icon-buttons/theme.svg';
import { ReactComponent as LightIcon } from './assets/icon-buttons/light.svg';
import DropdownMenu from './components/nav-bar/dropdown-menu.component';
import SearchBar from './components/search-bar/search-bar.component';
import CurrentWeather from './components/current-weather/current-weather.component';
import * as Api from './api/weatherAPI';
import axios from 'axios';

const FARENHEIT = 'farehnheit';
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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Mumbai',
            metric: FARENHEIT,
            hourlyForecast: [],
            current: '',
            items: initialItems,
        };
    }

    findMyState = () => {
        const success = (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            axios.get(geoApiUrl).then((res) => {
                this.handleLocationChange(res.data.city);
            });
        };
        const error = () => {
            console.log('Access Denied');
        };
        navigator.geolocation.getCurrentPosition(success, error);
    };

    componentDidMount() {
        this.findMyState();
        this.updateTemperature();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.location !== this.state.location)
            this.updateTemperature();
    }

    handleLocationChange = (location) => {
        this.setState({ location });
    };

    updateTemperature = async () => {
        const weatherRes = await Api.getWeatherBasedOnLocation(
            this.state.location
        );
        const forecastRes = await Api.getForecast(
            weatherRes.coord.lat,
            weatherRes.coord.lon
        );

        this.setState({
            current: forecastRes.current,
            metric: FARENHEIT,
            hourlyForecast: forecastRes.hourly,
        });
    };

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
        const { location, current, items } = this.state;

        return (
            <DropdownItemContext.Provider
                value={{
                    setItemActive: this.setItemActive,
                    handleClickedItem: this.handleClickedItem,
                }}
            >
                <div className='App'>
                    <NavBar>
                        <SearchBar
                            searchValue={location}
                            onSearchChange={this.handleLocationChange}
                            onFormSubmit={this.updateTemperature}
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
                    {current && <CurrentWeather current={current} />}
                </div>
            </DropdownItemContext.Provider>
        );
    }
}

export default App;
