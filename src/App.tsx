import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className='xing' onClick={(e) => { console.log(11) }} >hello</Button>
        <Button disabled>disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary</Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com' target='_blank'>Link</Button>
        <Button btnType={ButtonType.Link} disabled href='www.baidu.com'>Link disabled</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger</Button>
        <Button btnType={ButtonType.Default}>Default</Button>

      </header>
    </div>
  );
}

export default App;
