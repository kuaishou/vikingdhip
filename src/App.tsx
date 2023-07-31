import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} className='menu-vertical' onSelect={(inde)=>{console.log(inde)}}>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1}>
            cool link 2
          </MenuItem>
          <MenuItem index={2}>
            cool link 3
          </MenuItem>
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
