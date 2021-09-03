import React, {useContext} from 'react';
import { ReactComponent as TickIcon } from '../../assets/icon-buttons/tick.svg';
import { ItemActiveContext } from '../../App';
import './dropdown-item.css';

const DropdownItem = ({
    clickedItem,
    setActiveMenu,
    ...props
}) => {

    const setItemActive =  useContext(ItemActiveContext);
    
    return (
        <div
            className={`${props.active && 'active'} menu-item`}
            onClick={() => {
                clickedItem && clickedItem(props.id);
                if (props.goToMenu) {
                    setActiveMenu(props.goToMenu);
                } else {
                    setItemActive((prevItems) => {
                        return prevItems.map((item) => {
                            if (props.activeMenu === item.goToMenu) {
                                if (item.secondaryItems) {
                                    let newSecondaryItems =
                                        item.secondaryItems.map((item) => {
                                            if (item.title === props.children) {
                                                return {
                                                    ...item,
                                                    active: true,
                                                };
                                            }
                                            return { ...item, active: false };
                                        });
                                    return {
                                        ...item,
                                        secondaryItems: newSecondaryItems,
                                    };
                                }
                            }
                            return item;
                        });
                    });
                }
            }}
        >
            {props.leftIcon ? (
                <span className='icon-button'>{props.leftIcon}</span>
            ) : null}
            {props.tick && <TickIcon className='icon' />}
            {props.children}
            {props.rightIcon ? (
                <span className='icon-button icon-right'>
                    {props.rightIcon}
                </span>
            ) : null}
        </div>
    );
};

export default DropdownItem;
