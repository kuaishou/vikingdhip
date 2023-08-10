
import { useEffect, useState } from 'react';
import axios from "axios"
import Upload from './components/Upload/upload';
import Form from './components/Form/form';
import Input from './components/Input';
import FormItem from './components/Form/formItem';
import Button from './components/Button/button';
// import Form from './components/IFormnput';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
// library.add(fas);
function App() {
  const [title, setTitle] = useState('你好邢浩东');

  return (
    <div className="App">
      {title}
      <Form name='viking-form' onSubmit={(e) => { e.preventDefault(); console.log('submit') }}>
        <FormItem label='用户名' name='name'>
          <Input />
        </FormItem>
        <FormItem label='密码' name='password'>
          <Input type="password" />
        </FormItem>
        <div className='viking-form-submit-area'>
          <Button type="submit" btnType='primary'>登陆</Button>
        </div>
      </Form>
    </div>
  );
}

export default App;
