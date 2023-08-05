import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition';
library.add(fas);
function App() {
  const [show, setShow] = React.useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <Button size={ButtonSize.Large} onClick={() => { setShow(!show) }}>toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-bottom'
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition

          in={show}
          timeout={300}
          animation='zoom-in-left'
          wrapper
        >
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>A Large Button</Button>
        </Transition>

        <Icon icon='arrow-down' theme='primary' size='10x' />
        <FontAwesomeIcon icon={faCoffee} size='10x' />
        <Menu defaultIndex='0' onSelect={(inde) => { console.log(inde) }} >
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem >
              dropdown1
            </MenuItem>
            <MenuItem >
              dropdown2
            </MenuItem>
          </SubMenu>
        </Menu>

        <Menu defaultIndex='0' mode='vertical' defaultOpenSubMenus={['3']} onSelect={(inde) => { console.log(inde) }}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem >
              dropdown1
            </MenuItem>
            <MenuItem >
              dropdown2
            </MenuItem>
          </SubMenu>
        </Menu>



        <Button className='xing' onClick={(e) => { console.log(11) }} >hello</Button>
        <Button disabled>disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary</Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' target='_blank'>Link</Button>
        <Button btnType={ButtonType.Link} disabled href='http://www.baidu.com'>Link disabled</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger</Button>
        <Button btnType={ButtonType.Default}>Default</Button>
        {/* <Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button> */}
      </header>
    </div>
  );
}

export default App;
