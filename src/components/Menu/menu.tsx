import classNames from "classnames";
import { createContext, useState } from "react";

type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onSelect?: (selectedIndex: number) => void;
}

interface IMenuContext {
    index: number;
    onSelect?: (selectedIndex: number) => void;
}
export const MenuContext = createContext<IMenuContext>({ index: 0 });
const Menu = (props: MenuProps) => {
    const { defaultIndex, className, mode, style, onSelect, children } = props;
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }


    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>

        </ul>
    )

}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal',
}

export default Menu;



