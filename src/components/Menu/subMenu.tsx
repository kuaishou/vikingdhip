import classNames from "classnames";
import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import { title } from "process";

export interface SubMenuProps {
    title: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    index?: string;
    children?: React.ReactNode;
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { index, className, disabled, title, children } = props;

    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpened);
    const classes = classNames('menu-item submenu-item', className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {};
    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen,
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${i}` });
            } else {

                console.error('Warning: SubMenu has a child which is not a MenuItem component');
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" onClick={handleClick} {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )

}

SubMenu.displayName = 'SubMenu';
export default SubMenu;



